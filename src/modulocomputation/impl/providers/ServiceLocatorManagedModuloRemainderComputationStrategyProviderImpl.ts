import type { IModuloRemainderComputationCommand, IModuloRemainderComputationStrategyProvider } from "../../contracts/index.js";
import { AbstractBaseModuloRemainderComputationStrategyProvider } from "../../abstracts/AbstractBaseModuloRemainderComputationStrategyProvider.js";
import { NativeJavaScriptModuloRemainderComputationCommandImpl } from "../commands/NativeJavaScriptModuloRemainderComputationCommandImpl.js";

export class ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl
  extends AbstractBaseModuloRemainderComputationStrategyProvider
{
  private static readonly PROVIDER_NAME = "ServiceLocatorManagedModuloRemainderComputationStrategyProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-SERVICE-LOCATOR-PROVIDER";

  private static readonly DEFAULT_DIVISOR_REGISTRATIONS: readonly number[] = [3, 5, 15];
  private static readonly SERVICE_LOCATOR_LOOKUP_KEY = "ModuloRemainderComputationStrategy";

  constructor() {
    super(
      ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl.PROVIDER_NAME,
      ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl.PROVIDER_VERSION,
    );
    this.initializeDefaultDivisorRegistrations();
  }

  resolveComputationStrategy(divisor: number): IModuloRemainderComputationCommand {
    const resolved = this.strategyRegistry.get(divisor);
    if (resolved !== undefined) {
      return resolved;
    }
    const fallback = this.strategyRegistry.values().next();
    if (fallback.done !== true && fallback.value !== undefined) {
      return fallback.value;
    }
    throw new Error(
      `[ServiceLocatorManagedModuloRemainderComputationStrategyProvider] ` +
      `No strategy registered for divisor=[${divisor}]. ` +
      `Registered divisors=[${this.getRegisteredDivisors().join(", ")}]. ` +
      `ServiceLocator lookup key=[${ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl.SERVICE_LOCATOR_LOOKUP_KEY}]`,
    );
  }

  private initializeDefaultDivisorRegistrations(): void {
    const nativeCommand = new NativeJavaScriptModuloRemainderComputationCommandImpl();
    for (const divisor of ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl.DEFAULT_DIVISOR_REGISTRATIONS) {
      this.registerStrategy(divisor, nativeCommand);
    }
  }
}
