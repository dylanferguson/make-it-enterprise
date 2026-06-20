import type { IEnterpriseComputationResolutionAdapterChainHandler } from "../contracts/IEnterpriseComputationResolutionAdapterChainHandler.js";
import {
  DefaultComputationResolutionAdapterChainHandlerImpl,
  FallbackComputationResolutionAdapterChainHandlerImpl,
} from "../impl/DefaultComputationResolutionAdapterChainHandlerImpl.js";

export class ComputationResolutionAdapterChainHandlerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationResolutionAdapterChainHandlerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CHAIN-FACTORY";
  private static chainHead: IEnterpriseComputationResolutionAdapterChainHandler | null = null;
  private static chainInitialized = false;

  static createChain(includeFallback: boolean = true): IEnterpriseComputationResolutionAdapterChainHandler {
    if (!this.chainInitialized) {
      const mainHandler = new DefaultComputationResolutionAdapterChainHandlerImpl();
      if (includeFallback) {
        const fallbackHandler = new FallbackComputationResolutionAdapterChainHandlerImpl();
        mainHandler.setNextHandler(fallbackHandler);
      }
      this.chainHead = mainHandler;
      this.chainInitialized = true;
    }
    return this.chainHead!;
  }

  static getChainHead(): IEnterpriseComputationResolutionAdapterChainHandler | null {
    return this.chainHead;
  }

  static isChainInitialized(): boolean {
    return this.chainInitialized;
  }

  static resetChain(): void {
    this.chainHead = null;
    this.chainInitialized = false;
  }

  static getFactoryBeanName(): string {
    return this.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return this.FACTORY_BEAN_VERSION;
  }
}
