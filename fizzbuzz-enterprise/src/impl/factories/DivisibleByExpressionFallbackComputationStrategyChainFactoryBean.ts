import type { IDivisibleByFallbackComputationStrategyChainHandler } from "../../contracts/IDivisibleByFallbackComputationStrategyChainHandler.js";
import { ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl } from "../handlers/ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl.js";
import { SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandlerImpl } from "../handlers/SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandlerImpl.js";

export class DivisibleByExpressionFallbackComputationStrategyChainFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "DivisibleByExpressionFallbackComputationStrategyChainFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FALLBACK-CHAIN-FACTORY";
  private static instance: IDivisibleByFallbackComputationStrategyChainHandler | null = null;

  static buildFallbackComputationChain(
    withSupervisorDelegation: boolean = true,
  ): IDivisibleByFallbackComputationStrategyChainHandler {
    const terminalHandler = new ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl();
    if (withSupervisorDelegation) {
      const supervisorHandler = new SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandlerImpl();
      supervisorHandler.setNext(terminalHandler);
      return supervisorHandler;
    }
    return terminalHandler;
  }

  static buildSingletonFallbackComputationChain(
    withSupervisorDelegation: boolean = true,
  ): IDivisibleByFallbackComputationStrategyChainHandler {
    if (DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.instance === null) {
      DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.instance =
        DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.buildFallbackComputationChain(
          withSupervisorDelegation,
        );
    }
    return DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.instance;
  }

  static resetChain(): void {
    DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.instance = null;
  }

  static isChainInitialized(): boolean {
    return DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.instance !== null;
  }

  static getFactoryBeanName(): string {
    return DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.FACTORY_BEAN_VERSION;
  }
}
