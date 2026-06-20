import type {
  IFizzBuzzOutputStringResolutionChainHandler,
  IFizzBuzzOutputStringResolutionResult,
  IFizzBuzzOutputStringResolutionStrategy,
} from "../contracts/index.js";
import { AbstractBaseFizzBuzzOutputStringResolutionResult } from "./AbstractBaseFizzBuzzOutputStringResolutionResult.js";

export abstract class AbstractBaseFizzBuzzOutputStringResolutionChainHandler
  implements IFizzBuzzOutputStringResolutionChainHandler
{
  private readonly chainName: string;
  private readonly chainVersion: string;
  protected readonly strategyHandlers: IFizzBuzzOutputStringResolutionStrategy[] = [];
  protected fallbackStrategy: IFizzBuzzOutputStringResolutionStrategy | null = null;

  constructor(chainName: string, chainVersion: string) {
    this.chainName = chainName;
    this.chainVersion = chainVersion;
  }

  getChainName(): string {
    return this.chainName;
  }

  getChainVersion(): string {
    return this.chainVersion;
  }

  registerStrategyHandler(strategy: IFizzBuzzOutputStringResolutionStrategy, position: number): void {
    if (position < 0 || position > this.strategyHandlers.length) {
      this.strategyHandlers.push(strategy);
    } else {
      this.strategyHandlers.splice(position, 0, strategy);
    }
  }

  setFallbackStrategy(strategy: IFizzBuzzOutputStringResolutionStrategy): void {
    this.fallbackStrategy = strategy;
  }

  abstract handleResolution(value: number): IFizzBuzzOutputStringResolutionResult;

  protected buildResolutionResult(
    resolvedValue: string,
    strategyName: string,
    strategyVersion: string,
    strategyIdentifier: string,
  ): IFizzBuzzOutputStringResolutionResult {
    return new AbstractBaseFizzBuzzOutputStringResolutionResult(
      resolvedValue,
      strategyName,
      strategyVersion,
      strategyIdentifier,
    );
  }

  protected getStrategiesSortedByPriority(): IFizzBuzzOutputStringResolutionStrategy[] {
    return [...this.strategyHandlers].sort((a, b) => a.getPriority() - b.getPriority());
  }
}
