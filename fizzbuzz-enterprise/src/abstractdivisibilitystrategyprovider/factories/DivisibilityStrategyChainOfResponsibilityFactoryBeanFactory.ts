import type { IDivisibilityStrategyChainOfResponsibilityHandler } from "../contracts/IDivisibilityStrategyChainOfResponsibilityHandler.js";
import { DivisibilityStrategyChainOfResponsibilityHandlerImpl } from "../impl/DivisibilityStrategyChainOfResponsibilityHandlerImpl.js";

export class DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DSCOR-FBF";

  private static chainHead: IDivisibilityStrategyChainOfResponsibilityHandler | null = null;
  private static chainInitialized = false;

  static initializeChain(divisors: readonly number[]): IDivisibilityStrategyChainOfResponsibilityHandler {
    if (DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainInitialized) {
      return DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainHead!;
    }
    let head: IDivisibilityStrategyChainOfResponsibilityHandler | null = null;
    let tail: IDivisibilityStrategyChainOfResponsibilityHandler | null = null;
    for (const divisor of divisors.slice().sort((a, b) => b - a)) {
      const handler = new DivisibilityStrategyChainOfResponsibilityHandlerImpl(
        `ChainHandlerDivisor${divisor}`,
        `1.0.0-CH-${divisor}`,
        divisor,
      );
      if (head === null) {
        head = handler;
        tail = handler;
      } else {
        tail!.setNextHandler(handler);
        tail = handler;
      }
    }
    DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainHead = head;
    DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainInitialized = true;
    return head!;
  }

  static getChainHead(): IDivisibilityStrategyChainOfResponsibilityHandler | null {
    return DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainHead;
  }

  static isChainInitialized(): boolean {
    return DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainInitialized;
  }

  static resetChain(): void {
    DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainHead = null;
    DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.chainInitialized = false;
  }

  static getFactoryBeanName(): string {
    return DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DivisibilityStrategyChainOfResponsibilityFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
