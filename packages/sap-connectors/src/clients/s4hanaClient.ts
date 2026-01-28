export interface S4HanaClientConfig {
  baseUrl: string;
  username: string;
  password: string;
}

export class S4HanaClient {
  constructor(private config: S4HanaClientConfig) {}

  async get<T>(path: string): Promise<T> {
    void this.config;
    void path;
    throw new Error("S4HanaClient.get not implemented");
  }
}
