import type { IModuloRemainderComputationCommand, IModuloRemainderComputationStrategyProvider } from "../contracts/index.js";

export abstract class AbstractBaseModuloRemainderComputationStrategyProvider
  implements IModuloRemainderComputationStrategyProvider
{
  protected static readonly PROVIDER_FRAMEWORK_VERSION = "1.0.0-MRC-PROVIDER-FRAMEWORK";

  protected readonly providerName: string;
  protected readonly providerVersion: string;
  protected readonly strategyRegistry: Map<number, IModuloRemainderComputationCommand>;

  constructor(providerName: string, providerVersion: string) {
    this.providerName = providerName;
    this.providerVersion = providerVersion;
    this.strategyRegistry = new Map<number, IModuloRemainderComputationCommand>();
  }

  abstract resolveComputationStrategy(divisor: number): IModuloRemainderComputationCommand;

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }

  getRegisteredDivisors(): readonly number[] {
    return Array.from(this.strategyRegistry.keys());
  }

  protected registerStrategy(divisor: number, command: IModuloRemainderComputationCommand): void {
    this.strategyRegistry.set(divisor, command);
  }
}
