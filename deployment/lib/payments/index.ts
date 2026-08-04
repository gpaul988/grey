export { getPaymentConfig } from './config';
export type { PaymentConfig } from './config';

// Types only
export type StripePaymentIntent = {
  id: string;
  clientSecret: string;
  amount: number;
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_action';
};

export type PayPalPaymentIntent = {
  id: string;
  status: 'CREATED' | 'APPROVED' | 'FAILED' | 'COMPLETED';
  links: Array<{ rel: string; href: string }>;
};

// Lazy load gateways to avoid SDK initialization issues
export const getPaymentGateway = async (provider: 'stripe' | 'paypal') => {
  switch (provider) {
    case 'stripe':
      return await import('./stripe');
    case 'paypal':
      return await import('./paypal');
    default:
      throw new Error(`Unknown payment provider: ${provider}`);
  }
};
