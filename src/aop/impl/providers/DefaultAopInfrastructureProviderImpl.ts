import type { IAopProxyFactory } from "../../contracts/IAopProxyFactory.js";
import type { IAspectWeaver } from "../../contracts/IAspectWeaver.js";
import { JdkDynamicAopProxyFactoryImpl } from "../proxy/JdkDynamicAopProxyFactoryImpl.js";
import { DefaultAspectWeaverImpl } from "../weaver/DefaultAspectWeaverImpl.js";
import { AbstractBaseAopInfrastructureProvider } from "../../abstracts/AbstractBaseAopInfrastructureProvider.js";

export class DefaultAopInfrastructureProviderImpl extends AbstractBaseAopInfrastructureProvider {
  private static readonly PROVIDER_NAME = "DefaultAopInfrastructureProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-AOP-INFRASTRUCTURE-PROVIDER";

  constructor() {
    super(DefaultAopInfrastructureProviderImpl.PROVIDER_NAME, DefaultAopInfrastructureProviderImpl.PROVIDER_VERSION);
  }

  override initializeInfrastructure(): void {
    if (this.infrastructureInitialized) return;
    this.weaver = new DefaultAspectWeaverImpl();
    this.proxyFactory = new JdkDynamicAopProxyFactoryImpl();
    this.infrastructureInitialized = true;
  }
}
