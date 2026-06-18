import * as paypal from '@paypal/checkout-server-sdk';
import { query } from '@/lib/db-raw';
import { v4 as uuid } from 'uuid';

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID || '',
  process.env.PAYPAL_CLIENT_SECRET || ''
);
const client = new paypal.core.PayPalHttpClient(environment);

export interface PayPalPaymentIntent {
  id: string;
  status: 'CREATED' | 'APPROVED' | 'FAILED' | 'COMPLETED';
  links: Array<{ rel: string; href: string }>;
}

export const createOrder = async (
  userId: string,
  amount: number,
  currency: string = 'USD',
  description?: string
): Promise<PayPalPaymentIntent> => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description,
          custom_id: userId,
        },
      ],
      payer: {
        email_address: undefined, // Will be filled by user
      },
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/paypal/return`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/paypal/cancel`,
      },
    });

    const response = await client.execute(request);
    const order = response.result as any;

    // Store transaction
    await query(
      `INSERT INTO payments (id, user_id, provider, amount, currency, status, paypal_order_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [uuid(), userId, 'paypal', amount, currency, order.status, order.id, new Date()]
    );

    return {
      id: order.id,
      status: order.status,
      links: order.links || [],
    };
  } catch (error) {
    console.error('Failed to create PayPal order:', error);
    throw error;
  }
};

export const captureOrder = async (
  orderId: string
): Promise<{ status: string; amount: number }> => {
  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const response = await client.execute(request);
    const order = response.result as any;

    const amount = order.purchase_units[0].payments.captures[0].amount.value;

    return {
      status: order.status,
      amount: parseFloat(amount),
    };
  } catch (error) {
    console.error('Failed to capture PayPal order:', error);
    throw error;
  }
};

export const refundCapture = async (
  captureId: string,
  amount?: string
): Promise<{ refundId: string; status: string }> => {
  try {
    const request = new paypal.payments.CapturesRefundRequest(captureId);
    request.requestBody({
      amount: amount ? { value: amount, currency_code: 'USD' } : undefined,
    });

    const response = await client.execute(request);
    const refund = response.result as any;

    return {
      refundId: refund.id,
      status: refund.status,
    };
  } catch (error) {
    console.error('Failed to refund PayPal capture:', error);
    throw error;
  }
};

export const getOrderDetails = async (
  orderId: string
): Promise<{ status: string; amount: number; payer: string }> => {
  try {
    const request = new paypal.orders.OrdersGetRequest(orderId);
    const response = await client.execute(request);
    const order = response.result as any;

    return {
      status: order.status,
      amount: parseFloat(order.purchase_units[0].amount.value),
      payer: order.payer.email_address,
    };
  } catch (error) {
    console.error('Failed to get PayPal order details:', error);
    throw error;
  }
};
