import type { IFizzBuzzResolutionMediator } from "../contracts/IFizzBuzzResolutionMediator.js";

export abstract class AbstractBaseFizzBuzzResolutionMediator implements IFizzBuzzResolutionMediator {
  private readonly mediatorName: string;
  private readonly mediatorVersion: string;
  protected readonly strategies: Map<string, (value: number) => string> = new Map();
  protected readonly strategyRegistrationOrder: string[] = [];

  constructor(mediatorName: string, mediatorVersion: string) {
    this.mediatorName = mediatorName;
    this.mediatorVersion = mediatorVersion;
  }

  getMediatorName(): string {
    return this.mediatorName;
  }

  getMediatorVersion(): string {
    return this.mediatorVersion;
  }

  abstract mediateSingleValueResolution(value: number): string;

  abstract mediateRangeResolution(start: number, end: number): readonly string[];

  registerResolutionStrategy(strategyName: string, strategy: (value: number) => string): void {
    if (!this.strategies.has(strategyName)) {
      this.strategyRegistrationOrder.push(strategyName);
    }
    this.strategies.set(strategyName, strategy);
  }

  getRegisteredStrategyNames(): readonly string[] {
    return [...this.strategyRegistrationOrder];
  }

  getMediationStrategyCount(): number {
    return this.strategies.size;
  }
}
