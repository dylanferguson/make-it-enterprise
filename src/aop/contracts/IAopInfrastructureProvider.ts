import type { IAopProxyFactory } from "./IAopProxyFactory.js";
import type { IAspectWeaver } from "./IAspectWeaver.js";

export interface IAopInfrastructureProvider {
  getInfrastructureProviderName(): string;
  getInfrastructureProviderVersion(): string;
  getProxyFactory(): IAopProxyFactory;
  getWeaver(): IAspectWeaver;
  isInfrastructureInitialized(): boolean;
  initializeInfrastructure(): void;
}
