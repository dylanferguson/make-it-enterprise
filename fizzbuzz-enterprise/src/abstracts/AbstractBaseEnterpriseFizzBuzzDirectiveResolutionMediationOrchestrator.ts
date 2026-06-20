import type { IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";
import type { IEnterpriseFizzBuzzResolutionDirectiveFactory } from "../contracts/IEnterpriseFizzBuzzResolutionDirectiveFactory.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator
  implements IEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator
{
  private static readonly ORCHESTRATOR_FRAMEWORK_VERSION = "1.0.0-DIRECTIVE-MEDIATION-ORCHESTRATOR-FRAMEWORK";
  private static readonly DEFAULT_MEDIATION_STRATEGY_NAME = "STANDARD_FORWARDING_MEDIATION_STRATEGY";

  protected readonly directiveFactory: IEnterpriseFizzBuzzResolutionDirectiveFactory;
  protected readonly strategyResolver: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver;
  protected readonly registeredStrategies: Map<string, IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy>;
  protected activeStrategyName: string;

  constructor(
    directiveFactory: IEnterpriseFizzBuzzResolutionDirectiveFactory,
    strategyResolver: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver,
    activeStrategyName: string = AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.DEFAULT_MEDIATION_STRATEGY_NAME,
  ) {
    this.directiveFactory = directiveFactory;
    this.strategyResolver = strategyResolver;
    this.registeredStrategies = new Map();
    this.activeStrategyName = activeStrategyName;
  }

  abstract getMediationOrchestratorName(): string;
  abstract getMediationOrchestratorVersion(): string;

  abstract orchestrateDirectiveResolution(
    value: number,
    innerResolver: (value: number) => string,
  ): string;
  abstract orchestrateRangeDirectiveResolution(
    start: number,
    end: number,
    innerResolver: (value: number) => string,
  ): readonly string[];

  registerMediationStrategy(
    name: string,
    strategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy,
  ): void {
    this.registeredStrategies.set(name, strategy);
    this.strategyResolver.registerStrategy(name, strategy);
  }

  getRegisteredMediationStrategyNames(): readonly string[] {
    return Array.from(this.registeredStrategies.keys());
  }

  getActiveMediationStrategyName(): string {
    return this.activeStrategyName;
  }

  setActiveMediationStrategyName(name: string): void {
    if (!this.registeredStrategies.has(name)) {
      throw new Error(
        `[${this.getMediationOrchestratorName()} v${this.getMediationOrchestratorVersion()}] ` +
        `Mediation strategy not registered: ${name}. Available strategies: ${Array.from(this.registeredStrategies.keys()).join(", ")}`,
      );
    }
    this.activeStrategyName = name;
  }

  protected getActiveMediationStrategy(): IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy | null {
    return this.registeredStrategies.get(this.activeStrategyName) ?? null;
  }

  protected getDefaultMediationStrategyName(): string {
    return AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.DEFAULT_MEDIATION_STRATEGY_NAME;
  }

  protected getOrchestratorFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationOrchestrator.ORCHESTRATOR_FRAMEWORK_VERSION;
  }
}
