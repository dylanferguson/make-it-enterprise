import type { IJmsDestination } from "./IJmsDestination.js";
import type { IJmsConnectionFactory } from "./IJmsConnectionFactory.js";
import type { IEnterpriseNamingContext } from "./IEnterpriseNamingContext.js";

export interface IJmsAdministeredObjectBinder {
  getBinderName(): string;
  getBinderVersion(): string;
  bindConnectionFactory(jndiName: string, connectionFactory: IJmsConnectionFactory): void;
  bindQueue(jndiName: string, queue: IJmsDestination): void;
  bindTopic(jndiName: string, topic: IJmsDestination): void;
  lookupConnectionFactory(jndiName: string): IJmsConnectionFactory | null;
  lookupQueue(jndiName: string): IJmsDestination | null;
  lookupTopic(jndiName: string): IJmsDestination | null;
  initializeJmsAdministeredObjects(namingContext: IEnterpriseNamingContext): void;
}
