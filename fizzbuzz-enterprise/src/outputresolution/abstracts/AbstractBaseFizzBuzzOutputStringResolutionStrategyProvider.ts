import type { IFizzBuzzOutputStringResolutionStrategyProvider, IFizzBuzzOutputStringResolutionResult, IFizzBuzzOutputStringResolutionStrategy } from "../contracts/index.js";
import type { IFizzBuzzOutputStringResolutionChainHandler } from "../contracts/index.js";
import type { IFizzBuzzOutputStringResolutionStrategyRegistry } from "../contracts/index.js";
import type { IFizzBuzzOutputStringResolutionStrategyVisitor } from "../contracts/index.js";
import { AbstractBaseFizzBuzzOutputStringResolutionResult } from "./AbstractBaseFizzBuzzOutputStringResolutionResult.js";

export abstract class AbstractBaseFizzBuzzOutputStringResolutionStrategyProvider
  implements IFizzBuzzOutputStringResolutionStrategyProvider
{
  private readonly providerName: string;
  private readonly providerVersion: string;
  protected readonly registry: IFizzBuzzOutputStringResolutionStrategyRegistry;
  protected readonly chainHandler: IFizzBuzzOutputStringResolutionChainHandler;
  protected readonly visitor: IFizzBuzzOutputStringResolutionStrategyVisitor | null;

  constructor(
    providerName: string,
    providerVersion: string,
    registry: IFizzBuzzOutputStringResolutionStrategyRegistry,
    chainHandler: IFizzBuzzOutputStringResolutionChainHandler,
    visitor: IFizzBuzzOutputStringResolutionStrategyVisitor | null,
  ) {
    this.providerName = providerName;
    this.providerVersion = providerVersion;
    this.registry = registry;
    this.chainHandler = chainHandler;
    this.visitor = visitor;
  }

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }

  abstract resolveOutputString(value: number): IFizzBuzzOutputStringResolutionResult;

  getRegisteredStrategyNames(): readonly string[] {
    return this.registry.getRegisteredStrategies().map((s) => s.getName());
  }

  getActiveResolutionStrategyIdentifier(): string {
    return this.chainHandler.getChainName();
  }

  protected resolveViaChain(value: number): IFizzBuzzOutputStringResolutionResult {
    return this.chainHandler.handleResolution(value);
  }

  protected resolveViaVisitor(value: number): IFizzBuzzOutputStringResolutionResult | null {
    if (this.visitor === null) {
      return null;
    }
    const selected = this.visitor.selectResolvedStrategy(
      this.registry.getRegisteredStrategies(),
      value,
    );
    if (selected === null) {
      return null;
    }
    return this.buildResult(selected.resolve(value), selected);
  }

  protected buildResult(
    resolvedValue: string,
    strategy: IFizzBuzzOutputStringResolutionStrategy,
  ): IFizzBuzzOutputStringResolutionResult {
    return new AbstractBaseFizzBuzzOutputStringResolutionResult(
      resolvedValue,
      strategy.getName(),
      strategy.getVersion(),
      strategy.getResolvedIdentifier(),
    );
  }
}
