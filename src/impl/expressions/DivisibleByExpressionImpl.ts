import { AbstractBaseFizzBuzzExpression } from "../../abstracts/AbstractBaseFizzBuzzExpression.js";
import type { IFizzBuzzExpressionVisitor } from "../../contracts/IFizzBuzzExpressionVisitor.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import type { IDivisibleByFallbackComputationStrategyChainHandler } from "../../contracts/IDivisibleByFallbackComputationStrategyChainHandler.js";
import { ExpressionEvaluationException } from "../../exceptions/ExpressionEvaluationException.js";
import { DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory } from "../factories/DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.js";
import { DivisibleByExpressionFallbackComputationStrategyChainFactoryBean } from "../factories/DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.js";
import { DivisibilityEvaluationException } from "../../exceptions/DivisibilityEvaluationException.js";

export class DivisibleByExpressionImpl extends AbstractBaseFizzBuzzExpression {
  private static readonly EXPRESSION_TYPE = "DivisibleByExpression";
  private static readonly COMPUTATION_CONTEXT = "DivisibleByExpressionEnterpriseEvaluation";
  private static readonly FALLBACK_COMPUTATION_CONTEXT = "DivisibleByExpressionFallbackEvaluation";
  private readonly divisor: number;
  private remainderSupervisor: IRemainderComputationSupervisor | null = null;
  private supervisorResolutionAttempted = false;
  private fallbackChain: IDivisibleByFallbackComputationStrategyChainHandler | null = null;
  private fallbackChainResolutionAttempted = false;

  constructor(divisor: number) {
    super();
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `DivisibleByExpression divisor must be a positive finite number, received: ${divisor}`,
      );
    }
    this.divisor = Math.trunc(divisor);
  }

  getDivisor(): number {
    return this.divisor;
  }

  setRemainderComputationSupervisor(supervisor: IRemainderComputationSupervisor): void {
    this.remainderSupervisor = supervisor;
    this.supervisorResolutionAttempted = true;
  }

  private resolveRemainderSupervisor(): IRemainderComputationSupervisor | null {
    if (!this.supervisorResolutionAttempted) {
      this.supervisorResolutionAttempted = true;
      try {
        this.remainderSupervisor =
          DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.resolveEnterpriseSupervisor();
      } catch {
        this.remainderSupervisor = null;
      }
    }
    return this.remainderSupervisor;
  }

  private resolveFallbackComputationChain(): IDivisibleByFallbackComputationStrategyChainHandler {
    if (!this.fallbackChainResolutionAttempted) {
      this.fallbackChainResolutionAttempted = true;
      try {
        this.fallbackChain =
          DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.buildSingletonFallbackComputationChain(true);
      } catch {
        this.fallbackChain =
          DivisibleByExpressionFallbackComputationStrategyChainFactoryBean.buildSingletonFallbackComputationChain(false);
      }
    }
    return this.fallbackChain!;
  }

  getFallbackComputationChain(): IDivisibleByFallbackComputationStrategyChainHandler | null {
    return this.fallbackChain;
  }

  override interpret(value: number): boolean {
    this.validateOperand(value);
    try {
      const truncatedValue = Math.trunc(value);
      const supervisor = this.resolveRemainderSupervisor();
      if (supervisor !== null) {
        const remainder = supervisor.superviseRemainderComputation(
          truncatedValue,
          this.divisor,
          DivisibleByExpressionImpl.COMPUTATION_CONTEXT,
        );
        return remainder === 0;
      }
      const fallbackChain = this.resolveFallbackComputationChain();
      const remainder = fallbackChain.handleFallbackComputation(
        truncatedValue,
        this.divisor,
        DivisibleByExpressionImpl.FALLBACK_COMPUTATION_CONTEXT,
      );
      return remainder === 0;
    } catch (error) {
      if (error instanceof DivisibilityEvaluationException) {
        throw error;
      }
      throw new ExpressionEvaluationException(
        error instanceof Error ? error.message : String(error),
        this.getExpressionType(),
        value,
        error instanceof Error ? error : null,
      );
    }
  }

  override getExpressionType(): string {
    return DivisibleByExpressionImpl.EXPRESSION_TYPE;
  }

  override accept(visitor: IFizzBuzzExpressionVisitor): void {
    visitor.visitDivisibleBy(this, this.divisor);
  }

  override getExpressionCanonicalForm(): string {
    return `DivisibleBy(${this.divisor})`;
  }
}

