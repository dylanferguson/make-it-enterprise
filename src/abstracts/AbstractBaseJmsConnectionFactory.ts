import type { IJmsConnectionFactory } from "../contracts/IJmsConnectionFactory.js";
import type { IJmsConnection } from "../contracts/IJmsConnection.js";

export abstract class AbstractBaseJmsConnectionFactory implements IJmsConnectionFactory {
  private readonly factoryName: string;
  private readonly factoryVersion: string;
  private clientId: string;

  constructor(factoryName: string, factoryVersion: string) {
    this.factoryName = factoryName;
    this.factoryVersion = factoryVersion;
    this.clientId = "";
  }

  abstract createConnection(): IJmsConnection;
  abstract createConnectionWithCredentials(userName: string, password: string): IJmsConnection;

  getConnectionFactoryName(): string { return this.factoryName; }
  getConnectionFactoryVersion(): string { return this.factoryVersion; }
  getClientId(): string { return this.clientId; }
  setClientId(clientId: string): void { this.clientId = clientId; }
}
