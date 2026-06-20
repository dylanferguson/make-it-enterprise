import type { IDivisibilityOperatorProvider } from "../../contracts/IDivisibilityOperatorProvider.js";
import type { IDivisibilityOperatorProviderFactoryBean } from "../../contracts/IDivisibilityOperatorProviderFactoryBean.js";
import { DefaultDivisibilityOperatorProviderImpl } from "../providers/DefaultDivisibilityOperatorProviderImpl.js";

export class DivisibilityOperatorProviderFactoryBeanImpl
  implements IDivisibilityOperatorProviderFactoryBean
{
  private static readonly FACTORY_BEAN_NAME = "DivisibilityOperatorProviderFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-OPERATOR-PROVIDER-FACTORY-BEAN";

  private readonly isSingletonInstance: boolean;
  private provider: IDivisibilityOperatorProvider | null = null;

  constructor(isSingleton: boolean = true) {
    this.isSingletonInstance = isSingleton;
  }

  createProvider(): IDivisibilityOperatorProvider {
    if (this.isSingletonInstance && this.provider !== null) {
      return this.provider;
    }
    const provider = new DefaultDivisibilityOperatorProviderImpl();
    if (this.isSingletonInstance) {
      this.provider = provider;
    }
    return provider;
  }

  destroyProvider(): void {
    this.provider = null;
  }

  getFactoryBeanName(): string {
    return DivisibilityOperatorProviderFactoryBeanImpl.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return DivisibilityOperatorProviderFactoryBeanImpl.FACTORY_BEAN_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }
}
