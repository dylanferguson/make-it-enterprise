import { AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.js";
import type { IEnterpriseFizzBuzzResolutionDirectiveFactory } from "../../contracts/IEnterpriseFizzBuzzResolutionDirectiveFactory.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy } from "../../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy.js";

export class DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl
  extends AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator
{
  private static readonly ORCHESTRATOR_NAME = "DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator";
  private static readonly ORCHESTRATOR_VERSION = "2.0.0-DIRECTIVE-MEDIATION-ORCHESTRATOR";
  private static readonly MEDIATION_ORIGIN = "DefaultDirectiveMediationOrchestrator";

  private readonly chainHandlers: IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler[];
  private readonly strategySelectorStrategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy;

  constructor(
    directiveFactory: IEnterpriseFizzBuzzResolutionDirectiveFactory,
    strategyResolver: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver,
    strategySelectorStrategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategy,
    chainHandlers: IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler[] = [],
  ) {
    super(directiveFactory, strategyResolver);
    this.strategySelectorStrategy = strategySelectorStrategy;
    this.chainHandlers = [...chainHandlers];
  }

  getMediationOrchestratorName(): string {
    return DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl.ORCHESTRATOR_NAME;
  }

  getMediationOrchestratorVersion(): string {
    return DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl.ORCHESTRATOR_VERSION;
  }

  override orchestrateDirectiveResolution(
    value: number,
    innerResolver: (value: number) => string,
  ): string {
    this.validateOrchestrationInput(value);

    const directive = this.directiveFactory.createSingleValueDirective(
      value,
      DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl.MEDIATION_ORIGIN,
    );

    const selectedStrategyName = this.strategySelectorStrategy.selectMediationStrategy(
      directive,
      this.strategyResolver,
    );

    const strategy = this.registeredStrategies.get(selectedStrategyName) ?? null;
    if (strategy === null) {
      return this.executeThroughChainHandlers(value, innerResolver);
    }

    return strategy.resolveSingleValueDirective(directive, innerResolver);
  }

  override orchestrateRangeDirectiveResolution(
    start: number,
    end: number,
    innerResolver: (value: number) => string,
  ): readonly string[] {
    this.validateRangeBounds(start, end);

    const directive = this.directiveFactory.createRangeDirective(
      start,
      end,
      DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl.MEDIATION_ORIGIN,
    );

    const selectedStrategyName = this.strategySelectorStrategy.selectMediationStrategy(
      directive,
      this.strategyResolver,
    );

    const strategy = this.registeredStrategies.get(selectedStrategyName) ?? null;
    if (strategy === null) {
      return this.executeRangeThroughChainHandlers(start, end, innerResolver);
    }

    return strategy.resolveRangeDirective(directive, innerResolver, start, end);
  }

  private executeThroughChainHandlers(
    value: number,
    innerResolver: (value: number) => string,
  ): string {
    if (this.chainHandlers.length === 0) {
      return innerResolver(value);
    }

    const sortedHandlers = [...this.chainHandlers].sort(
      (a, b) => b.getHandlerPriority() - a.getHandlerPriority(),
    );

    const head = sortedHandlers[0]!;
    let current = head;
    for (let i = 1; i < sortedHandlers.length; i++) {
      current = current.setNext(sortedHandlers[i]!);
    }

    const directive = this.directiveFactory.createSingleValueDirective(
      value,
      DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl.MEDIATION_ORIGIN,
    );

    return head.handleDirectiveResolution(directive, innerResolver);
  }

  private executeRangeThroughChainHandlers(
    start: number,
    end: number,
    innerResolver: (value: number) => string,
  ): readonly string[] {
    if (this.chainHandlers.length === 0) {
      const results: string[] = [];
      for (let i = start; i <= end; i++) {
        results.push(innerResolver(i));
      }
      return results;
    }

    const sortedHandlers = [...this.chainHandlers].sort(
      (a, b) => b.getHandlerPriority() - a.getHandlerPriority(),
    );

    const head = sortedHandlers[0]!;
    let current = head;
    for (let i = 1; i < sortedHandlers.length; i++) {
      current = current.setNext(sortedHandlers[i]!);
    }

    const directive = this.directiveFactory.createRangeDirective(
      start,
      end,
      DefaultEnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorImpl.MEDIATION_ORIGIN,
    );

    return head.handleRangeDirectiveResolution(directive, innerResolver, start, end);
  }

  private validateOrchestrationInput(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.getMediationOrchestratorName()} v${this.getMediationOrchestratorVersion()}] ` +
        `Invalid orchestration value: ${value}`,
      );
    }
  }

  private validateRangeBounds(start: number, end: number): void {
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      throw new Error(
        `[${this.getMediationOrchestratorName()}] Range bounds must be finite: start=${start}, end=${end}`,
      );
    }
    if (start > end) {
      throw new Error(
        `[${this.getMediationOrchestratorName()}] Range start (${start}) must not exceed end (${end})`,
      );
    }
  }
}
