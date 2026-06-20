import type { IJmsAdministeredObjectBinder } from "../contracts/IJmsAdministeredObjectBinder.js";
import type { IJmsDestination } from "../contracts/IJmsDestination.js";
import type { IJmsConnectionFactory } from "../contracts/IJmsConnectionFactory.js";
import type { IEnterpriseNamingContext } from "../contracts/IEnterpriseNamingContext.js";

export abstract class AbstractBaseJmsAdministeredObjectBinder implements IJmsAdministeredObjectBinder {
  private readonly binderName: string;
  private readonly binderVersion: string;
  protected connectionFactories: Map<string, IJmsConnectionFactory>;
  protected queues: Map<string, IJmsDestination>;
  protected topics: Map<string, IJmsDestination>;
  private initialized: boolean;

  constructor(binderName: string, binderVersion: string) {
    this.binderName = binderName;
    this.binderVersion = binderVersion;
    this.connectionFactories = new Map();
    this.queues = new Map();
    this.topics = new Map();
    this.initialized = false;
  }

  abstract initializeJmsAdministeredObjects(namingContext: IEnterpriseNamingContext): void;

  getBinderName(): string { return this.binderName; }
  getBinderVersion(): string { return this.binderVersion; }

  bindConnectionFactory(jndiName: string, connectionFactory: IJmsConnectionFactory): void {
    this.connectionFactories.set(jndiName, connectionFactory);
  }

  bindQueue(jndiName: string, queue: IJmsDestination): void {
    this.queues.set(jndiName, queue);
  }

  bindTopic(jndiName: string, topic: IJmsDestination): void {
    this.topics.set(jndiName, topic);
  }

  lookupConnectionFactory(jndiName: string): IJmsConnectionFactory | null {
    return this.connectionFactories.get(jndiName) ?? null;
  }

  lookupQueue(jndiName: string): IJmsDestination | null {
    return this.queues.get(jndiName) ?? null;
  }

  lookupTopic(jndiName: string): IJmsDestination | null {
    return this.topics.get(jndiName) ?? null;
  }

  isInitialized(): boolean { return this.initialized; }
  protected setInitialized(initialized: boolean): void { this.initialized = initialized; }
}
