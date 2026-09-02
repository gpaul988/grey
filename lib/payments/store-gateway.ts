type GatewayProvider = 'paystack' | 'flutterwave' | 'bank_transfer' | 'manual' | string;

export interface GatewayVerificationInput {
  provider?: GatewayProvider;
  reference?: string;
  transactionId?: string;
  amount?: number | string;
  currency?: string;
}

export interface GatewayVerificationResult {
  success: boolean;
  status: string;
  provider: string;
  reference?: string;
  transactionId?: string;
  amount?: number;
  currency?: string;
  message?: string;
  raw?: Record<string, any>;
}

function normalizeProvider(provider?: string) {
  const value = String(provider || 'manual').toLowerCase();
  if (value.includes('paystack')) return 'paystack';
  if (value.includes('flutter')) return 'flutterwave';
  if (value.includes('bank')) return 'bank_transfer';
  return value || 'manual';
}

async function verifyPaystack(reference: string, amount?: number, currency?: string): Promise<GatewayVerificationResult> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return { success: !!reference, status: 'demo_verified', provider: 'paystack', reference, amount, currency, message: 'Paystack secret not configured; accepting local reference validation.' };
  }

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
  });
  const payload = await res.json().catch(() => ({}));

  const status = payload?.data?.status;
  const amt = Number(payload?.data?.amount ?? 0) / 100;
  const currencyCode = String(payload?.data?.currency || currency || 'NGN');
  const amountMatches = !amount || amount <= 0 || Math.abs(amt - Number(amount)) < 0.01;

  return {
    success: Boolean(res.ok && status === 'success' && amountMatches),
    status: status === 'success' ? 'completed' : String(status || payload?.message || 'failed'),
    provider: 'paystack',
    reference,
    amount: amt || Number(amount || 0),
    currency: currencyCode,
    message: payload?.message || 'Paystack verification completed.',
    raw: payload,
  };
}

async function verifyFlutterwave(reference: string, amount?: number, currency?: string): Promise<GatewayVerificationResult> {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secret) {
    return { success: !!reference, status: 'demo_verified', provider: 'flutterwave', reference, amount, currency, message: 'Flutterwave secret not configured; accepting local reference validation.' };
  }

  const res = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(reference)}/verify`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
  });
  const payload = await res.json().catch(() => ({}));
  const status = payload?.data?.status;
  const amt = Number(payload?.data?.amount ?? 0);
  const currencyCode = String(payload?.data?.currency || currency || 'NGN');
  const amountMatches = !amount || amount <= 0 || Math.abs(amt - Number(amount)) < 0.01;

  return {
    success: Boolean(res.ok && status === 'successful' && amountMatches),
    status: status === 'successful' ? 'completed' : String(status || payload?.message || 'failed'),
    provider: 'flutterwave',
    reference,
    amount: amt || Number(amount || 0),
    currency: currencyCode,
    message: payload?.message || 'Flutterwave verification completed.',
    raw: payload,
  };
}

export async function verifyGatewayPayment(input: GatewayVerificationInput): Promise<GatewayVerificationResult> {
  const provider = normalizeProvider(input.provider);
  const reference = String(input.reference || input.transactionId || '').trim();
  const transactionId = String(input.transactionId || '').trim();
  const amount = Number(input.amount ?? 0);
  const currency = String(input.currency || 'NGN');

  if (!reference && !transactionId) {
    return { success: false, status: 'failed', provider, amount, currency, message: 'Missing payment reference or transaction ID.' };
  }

  if (provider === 'paystack') {
    return verifyPaystack(reference || transactionId, amount || undefined, currency);
  }

  if (provider === 'flutterwave') {
    return verifyFlutterwave(reference || transactionId, amount || undefined, currency);
  }

  if (provider === 'bank_transfer') {
    return { success: true, status: 'pending', provider, reference, transactionId, amount, currency, message: 'Bank transfer awaiting confirmation.' };
  }

  return {
    success: !!(reference || transactionId),
    status: 'demo_verified',
    provider,
    reference: reference || transactionId,
    transactionId: transactionId || reference,
    amount,
    currency,
    message: 'Demo verification passed; configure a real gateway provider for production.',
  };
}
