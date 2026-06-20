export interface IConnectionFactory {
  createConnection(): IManagedConnection;
  getConnectionFactoryName(): string;
  getConnectionFactoryVersion(): string;
  validateConnectionFactory(): boolean;
}

export interface IManagedConnection {
  getId(): string;
  isOpen(): boolean;
  open(): void;
  close(): void;
  getManagedConnectionFactoryName(): string;
}

export interface IManagedConnectionFactory {
  createConnectionFactory(): IConnectionFactory;
  getManagedConnectionFactoryName(): string;
  getManagedConnectionFactoryVersion(): string;
  getResourceAdapter(): IResourceAdapter | null;
  setResourceAdapter(adapter: IResourceAdapter): void;
}

export interface IResourceAdapter {
  start(): void;
  stop(): void;
  getResourceAdapterName(): string;
  getResourceAdapterVersion(): string;
  getManagedConnectionFactories(): readonly IManagedConnectionFactory[];
  registerManagedConnectionFactory(factory: IManagedConnectionFactory): void;
}
