// src/services/nitroService.ts
export class NitroService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.NITRO_BASE_URL || "https://api.nitropagamentos.com";
    this.apiKey = process.env.NITRO_API_KEY || "";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    };
  }

  async createPayment(data: { amount: number; description: string; customerId: string }) {
    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      return response.json();
    } catch (error: any) {
      console.error("Erro ao criar pagamento na Nitro:", error.message);
      throw error;
    }
  }

  async getPayment(paymentId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
        method: "GET",
        headers: this.getHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      return response.json();
    } catch (error: any) {
      console.error("Erro ao consultar pagamento na Nitro:", error.message);
      throw error;
    }
  }
}
