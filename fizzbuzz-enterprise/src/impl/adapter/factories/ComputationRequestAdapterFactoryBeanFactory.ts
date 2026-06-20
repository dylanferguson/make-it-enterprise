import type { IComputationRequestAdapter } from "../../../contracts/IComputationRequestAdapter.js";
import { StandardComputationRequestAdapterImpl } from "../StandardComputationRequestAdapterImpl.js";

export class ComputationRequestAdapterFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationRequestAdapterFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ADAPTER-FACTORY-BEAN";

  private static adapterSingleton: IComputationRequestAdapter | null = null;

  static createAdapter(): IComputationRequestAdapter {
    if (ComputationRequestAdapterFactoryBeanFactory.adapterSingleton === null) {
      ComputationRequestAdapterFactoryBeanFactory.adapterSingleton =
        new StandardComputationRequestAdapterImpl();
    }
    return ComputationRequestAdapterFactoryBeanFactory.adapterSingleton;
  }

  static getAdapter(): IComputationRequestAdapter | null {
    return ComputationRequestAdapterFactoryBeanFactory.adapterSingleton;
  }

  static resetAdapter(): void {
    ComputationRequestAdapterFactoryBeanFactory.adapterSingleton = null;
  }

  static getFactoryBeanName(): string {
    return ComputationRequestAdapterFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationRequestAdapterFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
