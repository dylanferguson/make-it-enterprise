import type { IJmsConnection } from "./IJmsConnection.js";

export interface IJmsConnectionFactory {
  getConnectionFactoryName(): string;
  getConnectionFactoryVersion(): string;
  createConnection(): IJmsConnection;
  createConnectionWithCredentials(userName: string, password: string): IJmsConnection;
  getClientId(): string;
  setClientId(clientId: string): void;
}
