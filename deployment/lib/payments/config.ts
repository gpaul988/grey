export interface PaymentGateway {
  enabled: boolean;
  publicKey?: string;
  secretKey?: string;
  clientId?: string;
  clientSecret?: string;
}

export interface PaymentConfig {
  stripe: PaymentGateway;
  paypal: PaymentGateway;
}

export const getPaymentConfig = (): PaymentConfig => ({
  stripe: {
    enabled: !!process.env.STRIPE_SECRET_KEY,
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
  },
  paypal: {
    enabled: !!process.env.PAYPAL_CLIENT_ID,
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  },
});
