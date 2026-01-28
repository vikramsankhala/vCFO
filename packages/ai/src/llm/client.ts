export interface LlmClientConfig {
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

export class LlmClient {
  constructor(private config: LlmClientConfig) {}

  async complete(prompt: string): Promise<string> {
    void this.config;
    void prompt;
    throw new Error("LlmClient.complete not implemented");
  }
}
