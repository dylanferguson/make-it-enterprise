import type { IPipelineManagerResolutionStrategySelector } from "../contracts/IPipelineManagerResolutionStrategySelector.js";
import type { IPipelineManagerResolutionStrategy } from "../contracts/IPipelineManagerResolutionStrategy.js";

export abstract class AbstractBasePipelineManagerResolutionStrategySelector
  implements IPipelineManagerResolutionStrategySelector
{
  protected readonly registeredStrategies: Map<string, IPipelineManagerResolutionStrategy> = new Map();

  abstract selectPipelineManagerResolutionStrategy(): IPipelineManagerResolutionStrategy;
  abstract getSelectorName(): string;
  abstract getSelectorVersion(): string;

  registerResolutionStrategy(
    strategyName: string,
    strategy: IPipelineManagerResolutionStrategy,
  ): void {
    this.registeredStrategies.set(strategyName, strategy);
  }

  getRegisteredStrategyNames(): readonly string[] {
    return Array.from(this.registeredStrategies.keys());
  }

  protected resolveStrategyByName(name: string): IPipelineManagerResolutionStrategy {
    const strategy = this.registeredStrategies.get(name);
    if (strategy !== undefined) {
      return strategy;
    }
    throw new Error(
      `[PipelineManagerResolutionStrategySelector] No resolution strategy registered: ` +
      `name=[${name}], registered=[${this.getRegisteredStrategyNames().join(", ")}]`,
    );
  }
}
