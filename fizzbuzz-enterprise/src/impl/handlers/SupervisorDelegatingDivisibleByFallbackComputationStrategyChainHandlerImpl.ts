import { AbstractBaseDivisibleByFallbackComputationStrategyChainHandler } from "../../abstracts/AbstractBaseDivisibleByFallbackComputationStrategyChainHandler.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import { DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory } from "../factories/DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.js";

export class SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandlerImpl
  extends AbstractBaseDivisibleByFallbackComputationStrategyChainHandler
{
  private static readonly HANDLER_NAME = "SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandler";
  private static readonly HANDLER_PRIORITY = 100;

  private supervisor: IRemainderComputationSupervisor | null = null;
  private supervisorResolutionAttempted: boolean = false;

  override handleFallbackComputation(dividend: number, divisor: number, computationContext: string): number {
    this.validateOperands(dividend, divisor);
    const supervisor = this.resolveSupervisor();
    if (supervisor !== null) {
      return supervisor.superviseRemainderComputation(dividend, divisor, computationContext);
    }
    return this.proceedToNext(dividend, divisor, computationContext);
  }

  override getHandlerName(): string {
    return SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandlerImpl.HANDLER_PRIORITY;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }

  private resolveSupervisor(): IRemainderComputationSupervisor | null {
    if (!this.supervisorResolutionAttempted) {
      this.supervisorResolutionAttempted = true;
      try {
        this.supervisor = DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.resolveEnterpriseSupervisor();
      } catch {
        this.supervisor = null;
      }
    }
    return this.supervisor;
  }
}
