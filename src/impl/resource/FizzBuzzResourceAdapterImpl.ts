import { AbstractBaseResourceAdapter } from "../../abstracts/AbstractBaseResourceAdapter.js";
import type { IManagedConnectionFactory } from "../../contracts/IResourceAdapter.js";
import type { IConnectionFactory } from "../../contracts/IResourceAdapter.js";
import type { IManagedConnection } from "../../contracts/IResourceAdapter.js";
import type { IResourceAdapter } from "../../contracts/IResourceAdapter.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";

export class FizzBuzzResourceAdapterImpl extends AbstractBaseResourceAdapter {
  private static readonly ADAPTER_NAME = "FizzBuzzResourceAdapter";
  private static readonly ADAPTER_VERSION = "1.0.0-JCA";
  private readonly connectionFactories: IManagedConnectionFactory[] = [];
  private started = false;

  constructor() {
    super(FizzBuzzResourceAdapterImpl.ADAPTER_NAME, FizzBuzzResourceAdapterImpl.ADAPTER_VERSION);
  }

  doInitialize(): void {
    console.debug(`[${FizzBuzzResourceAdapterImpl.ADAPTER_NAME}] Initializing resource adapter`);
  }

  doStart(): void {
    console.debug(`[${FizzBuzzResourceAdapterImpl.ADAPTER_NAME}] Starting resource adapter`);
    this.started = true;
  }

  doStop(): void {
    console.debug(`[${FizzBuzzResourceAdapterImpl.ADAPTER_NAME}] Stopping resource adapter`);
    this.started = false;
    for (const factory of this.connectionFactories) {
      const connFactory = factory.createConnectionFactory();
      const conn = connFactory.createConnection();
      if (conn.isOpen()) {
        conn.close();
      }
    }
  }

  doDestroy(): void {
    console.debug(`[${FizzBuzzResourceAdapterImpl.ADAPTER_NAME}] Destroying resource adapter`);
    this.connectionFactories.length = 0;
    this.started = false;
  }

  getResourceAdapterName(): string {
    return FizzBuzzResourceAdapterImpl.ADAPTER_NAME;
  }

  getResourceAdapterVersion(): string {
    return FizzBuzzResourceAdapterImpl.ADAPTER_VERSION;
  }

  getManagedConnectionFactories(): readonly IManagedConnectionFactory[] {
    return [...this.connectionFactories];
  }

  registerManagedConnectionFactory(factory: IManagedConnectionFactory): void {
    factory.setResourceAdapter(this);
    this.connectionFactories.push(factory);
  }

  isStarted(): boolean {
    return this.started;
  }
}

export class FizzBuzzManagedConnectionFactoryImpl implements IManagedConnectionFactory {
  private static readonly FACTORY_NAME = "FizzBuzzManagedConnectionFactory";
  private static readonly FACTORY_VERSION = "1.0.0-MCF";
  private resourceAdapter: IResourceAdapter | null = null;

  createConnectionFactory(): IConnectionFactory {
    return new FizzBuzzConnectionFactoryImpl(
      FizzBuzzManagedConnectionFactoryImpl.FACTORY_NAME,
    );
  }

  getManagedConnectionFactoryName(): string {
    return FizzBuzzManagedConnectionFactoryImpl.FACTORY_NAME;
  }

  getManagedConnectionFactoryVersion(): string {
    return FizzBuzzManagedConnectionFactoryImpl.FACTORY_VERSION;
  }

  getResourceAdapter(): IResourceAdapter | null {
    return this.resourceAdapter;
  }

  setResourceAdapter(adapter: IResourceAdapter): void {
    this.resourceAdapter = adapter;
  }
}

export class FizzBuzzConnectionFactoryImpl implements IConnectionFactory {
  private static readonly CONNECTION_COUNTER = new Map<string, number>();
  private readonly factoryName: string;
  private readonly version = "1.0.0-CF";

  constructor(factoryName: string) {
    this.factoryName = factoryName;
  }

  createConnection(): IManagedConnection {
    const count = (FizzBuzzConnectionFactoryImpl.CONNECTION_COUNTER.get(this.factoryName) ?? 0) + 1;
    FizzBuzzConnectionFactoryImpl.CONNECTION_COUNTER.set(this.factoryName, count);
    return new FizzBuzzManagedConnectionImpl(
      `conn-${this.factoryName}-${count}-${Date.now()}`,
      this.factoryName,
    );
  }

  getConnectionFactoryName(): string {
    return this.factoryName;
  }

  getConnectionFactoryVersion(): string {
    return this.version;
  }

  validateConnectionFactory(): boolean {
    return true;
  }
}

export class FizzBuzzManagedConnectionImpl implements IManagedConnection {
  private readonly id: string;
  private readonly managedConnectionFactoryName: string;
  private connectionOpen = false;

  constructor(id: string, managedConnectionFactoryName: string) {
    this.id = id;
    this.managedConnectionFactoryName = managedConnectionFactoryName;
  }

  getId(): string {
    return this.id;
  }

  isOpen(): boolean {
    return this.connectionOpen;
  }

  open(): void {
    this.connectionOpen = true;
  }

  close(): void {
    this.connectionOpen = false;
  }

  getManagedConnectionFactoryName(): string {
    return this.managedConnectionFactoryName;
  }
}

export class FizzBuzzValueResolverConnectionImpl implements IManagedConnection {
  private readonly id: string;
  private readonly valueResolver: ICompositeValueResolver;
  private connectionActive = false;

  constructor(id: string, valueResolver: ICompositeValueResolver) {
    this.id = id;
    this.valueResolver = valueResolver;
  }

  getId(): string {
    return this.id;
  }

  isOpen(): boolean {
    return this.connectionActive;
  }

  open(): void {
    this.connectionActive = true;
  }

  close(): void {
    this.connectionActive = false;
  }

  getManagedConnectionFactoryName(): string {
    return "FizzBuzzValueResolverConnectionFactory";
  }

  resolve(value: number): string {
    if (!this.connectionActive) {
      throw new Error("Connection is not open");
    }
    return this.valueResolver.resolve(value);
  }
}

export class FizzBuzzValueResolverConnectionFactoryImpl implements IConnectionFactory {
  private static readonly COUNTER = new Map<string, number>();
  private readonly factoryName: string;
  private readonly valueResolver: ICompositeValueResolver;

  constructor(factoryName: string, valueResolver: ICompositeValueResolver) {
    this.factoryName = factoryName;
    this.valueResolver = valueResolver;
  }

  createConnection(): IManagedConnection {
    const count = (FizzBuzzValueResolverConnectionFactoryImpl.COUNTER.get(this.factoryName) ?? 0) + 1;
    FizzBuzzValueResolverConnectionFactoryImpl.COUNTER.set(this.factoryName, count);
    const conn = new FizzBuzzValueResolverConnectionImpl(
      `vres-conn-${this.factoryName}-${count}-${Date.now()}`,
      this.valueResolver,
    );
    conn.open();
    return conn;
  }

  getConnectionFactoryName(): string {
    return this.factoryName;
  }

  getConnectionFactoryVersion(): string {
    return "1.0.0-VRCF";
  }

  validateConnectionFactory(): boolean {
    return true;
  }
}
