declare module '@paypal/checkout-server-sdk' {
  export namespace core {
    class SandboxEnvironment {
      constructor(clientId: string, clientSecret: string);
    }
    class PayPalHttpClient {
       
      constructor(environment: unknown);
       
      execute(request: unknown): Promise<any>;
    }
  }
  export namespace orders {
    class OrdersCreateRequest {
      prefer(value: string): void;
       
      requestBody(body: unknown): void;
    }
    class OrdersCaptureRequest {
      constructor(orderId: string);
       
      requestBody(body: unknown): void;
    }
    class OrdersGetRequest {
      constructor(orderId: string);
    }
  }
  export namespace payments {
    class CapturesRefundRequest {
      constructor(captureId: string);
       
      requestBody(body: unknown): void;
    }
  }
}
