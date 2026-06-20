import type { IEnterpriseComputationResolutionMediatorArchitecture } from "../contracts/IEnterpriseComputationResolutionMediatorArchitecture.js";
import type { IEnterpriseComputationResolutionAdapterRegistry } from "../contracts/IEnterpriseComputationResolutionAdapterRegistry.js";
import type { IEnterpriseComputationResolutionAdapterVisitor } from "../contracts/IEnterpriseComputationResolutionAdapterVisitor.js";
import type { IEnterpriseComputationResolutionAdapterChainHandler } from "../contracts/IEnterpriseComputationResolutionAdapterChainHandler.js";
import { DefaultEnterpriseComputationResolutionMediatorArchitectureImpl } from "../impl/DefaultEnterpriseComputationResolutionMediatorArchitectureImpl.js";
import { ComputationResolutionAdapterRegistryFactoryBeanFactory } from "./ComputationResolutionAdapterRegistryFactoryBeanFactory.js";
import { ComputationResolutionAdapterVisitorFactoryBeanFactory } from "./ComputationResolutionAdapterVisitorFactoryBeanFactory.js";
import { ComputationResolutionAdapterChainHandlerFactoryBeanFactory } from "./ComputationResolutionAdapterChainHandlerFactoryBeanFactory.js";

export class EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseComputationResolutionMediatorArchitectureFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ARCHITECTURE-FACTORY";
  private static architecture: IEnterpriseComputationResolutionMediatorArchitecture | null = null;
  private static architectureInitialized = false;

  static initializeArchitecture(
    registry?: IEnterpriseComputationResolutionAdapterRegistry,
    visitor?: IEnterpriseComputationResolutionAdapterVisitor,
    chainHandler?: IEnterpriseComputationResolutionAdapterChainHandler,
  ): IEnterpriseComputationResolutionMediatorArchitecture {
    if (this.architecture === null) {
      const resolvedRegistry = registry ?? ComputationResolutionAdapterRegistryFactoryBeanFactory.createRegistry(true);
      const resolvedVisitor = visitor ?? ComputationResolutionAdapterVisitorFactoryBeanFactory.createVisitor();
      const resolvedChain = chainHandler ?? ComputationResolutionAdapterChainHandlerFactoryBeanFactory.createChain(true);
      this.architecture = new DefaultEnterpriseComputationResolutionMediatorArchitectureImpl(
        resolvedRegistry,
        resolvedVisitor,
        resolvedChain,
      );
      this.architectureInitialized = true;
    }
    return this.architecture;
  }

  static getArchitecture(): IEnterpriseComputationResolutionMediatorArchitecture | null {
    return this.architecture;
  }

  static isArchitectureInitialized(): boolean {
    return this.architectureInitialized;
  }

  static resetArchitecture(): void {
    this.architecture = null;
    this.architectureInitialized = false;
  }

  static getFactoryBeanName(): string {
    return this.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return this.FACTORY_BEAN_VERSION;
  }
}
