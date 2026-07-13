declare module '@paypal/checkout-server-sdk' {
  export namespace core {
    class SandboxEnvironment {
      constructor(clientId: string, clientSecret: string);
    }
    class PayPalHttpClient {
       
      constructor(environment: any);
       
      execute(request: any): Promise<any>;
    }
  }
  export namespace orders {
    class OrdersCreateRequest {
      prefer(value: string): void;
       
      requestBody(body: any): void;
    }
    class OrdersCaptureRequest {
      constructor(orderId: string);
       
      requestBody(body: any): void;
    }
    class OrdersGetRequest {
      constructor(orderId: string);
    }
  }
  export namespace payments {
    class CapturesRefundRequest {
      constructor(captureId: string);
       
      requestBody(body: any): void;
    }
  }
}
