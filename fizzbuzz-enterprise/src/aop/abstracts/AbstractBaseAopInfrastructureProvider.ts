import type { IAopProxyFactory } from "../contracts/IAopProxyFactory.js";
import type { IAspectWeaver } from "../contracts/IAspectWeaver.js";
import type { IAopInfrastructureProvider } from "../contracts/IAopInfrastructureProvider.js";

export abstract class AbstractBaseAopInfrastructureProvider implements IAopInfrastructureProvider {
  private readonly infrastructureProviderName: string;
  private readonly infrastructureProviderVersion: string;
  protected proxyFactory: IAopProxyFactory | null = null;
  protected weaver: IAspectWeaver | null = null;
  protected infrastructureInitialized: boolean = false;

  constructor(infrastructureProviderName: string, infrastructureProviderVersion: string) {
    this.infrastructureProviderName = infrastructureProviderName;
    this.infrastructureProviderVersion = infrastructureProviderVersion;
  }

  getInfrastructureProviderName(): string {
    return this.infrastructureProviderName;
  }

  getInfrastructureProviderVersion(): string {
    return this.infrastructureProviderVersion;
  }

  getProxyFactory(): IAopProxyFactory {
    if (this.proxyFactory === null) {
      throw new Error(`[${this.infrastructureProviderName}] AOP proxy factory not initialized`);
    }
    return this.proxyFactory;
  }

  getWeaver(): IAspectWeaver {
    if (this.weaver === null) {
      throw new Error(`[${this.infrastructureProviderName}] AOP weaver not initialized`);
    }
    return this.weaver;
  }

  isInfrastructureInitialized(): boolean {
    return this.infrastructureInitialized;
  }

  abstract initializeInfrastructure(): void;
}
