import { AbstractBaseDivisibilityOperatorDelegationChainHandler } from "../../abstracts/AbstractBaseDivisibilityOperatorDelegationChainHandler.js";
import { RemainderComputationStrategyProviderFactoryBeanFactory } from "../factories/RemainderComputationStrategyProviderFactoryBeanFactory.js";
import type { IRemainderComputationStrategyProvider } from "../../contracts/IRemainderComputationStrategyProvider.js";

export class TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl
  extends AbstractBaseDivisibilityOperatorDelegationChainHandler
{
  private static readonly HANDLER_NAME = "TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandler";
  private static readonly HANDLER_VERSION = "1.1.0-REMAINDER-STRATEGY-SELECTOR-ENABLED";
  private static readonly HANDLER_PRIORITY = -1000;

  private static remainderComputationStrategyProvider: IRemainderComputationStrategyProvider | null = null;

  constructor() {
    super(
      TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.HANDLER_NAME,
      TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.HANDLER_VERSION,
      TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.HANDLER_PRIORITY,
    );
  }

  private ensureRemainderProvider(): IRemainderComputationStrategyProvider {
    if (TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.remainderComputationStrategyProvider === null) {
      TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.remainderComputationStrategyProvider =
        RemainderComputationStrategyProviderFactoryBeanFactory.createProvider();
    }
    return TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl.remainderComputationStrategyProvider;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    const provider = this.ensureRemainderProvider();
    return provider.resolveDivisibility(dividend, divisor);
  }
}
