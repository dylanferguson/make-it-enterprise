import type { IModularArithmeticDivisibilityResolutionMediatorProvider } from "../contracts/IModularArithmeticDivisibilityResolutionMediatorProvider.js";
import type { IModularArithmeticDivisibilityResolutionStrategyMediator } from "../contracts/IModularArithmeticDivisibilityResolutionStrategyMediator.js";
import type { IModularArithmeticDivisibilityResolutionMediatorRegistry } from "../contracts/IModularArithmeticDivisibilityResolutionMediatorRegistry.js";

export abstract class AbstractBaseModularArithmeticDivisibilityResolutionMediatorProvider
  implements IModularArithmeticDivisibilityResolutionMediatorProvider
{
  private static readonly DEFAULT_PROVIDER_VERSION = "1.0.0-BASE-PROVIDER";

  private readonly providerName: string;
  private readonly providerVersion: string;
  protected mediatorRegistry: IModularArithmeticDivisibilityResolutionMediatorRegistry | null = null;

  constructor(
    providerName: string,
    providerVersion: string = AbstractBaseModularArithmeticDivisibilityResolutionMediatorProvider.DEFAULT_PROVIDER_VERSION,
  ) {
    this.providerName = providerName;
    this.providerVersion = providerVersion;
  }

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }

  setMediatorRegistry(registry: IModularArithmeticDivisibilityResolutionMediatorRegistry): void {
    this.mediatorRegistry = registry;
  }

  getMediatorRegistry(): IModularArithmeticDivisibilityResolutionMediatorRegistry | null {
    return this.mediatorRegistry;
  }

  abstract resolveMediator(divisor: number): IModularArithmeticDivisibilityResolutionStrategyMediator;

  getRegisteredDivisors(): number[] {
    if (this.mediatorRegistry === null) {
      return [];
    }
    return this.mediatorRegistry.getRegisteredDivisors();
  }

  protected getRegistryForLookup(): IModularArithmeticDivisibilityResolutionMediatorRegistry {
    if (this.mediatorRegistry === null) {
      throw new Error(
        `[${this.providerName}] Mediator registry not configured: cannot resolve mediator`,
      );
    }
    return this.mediatorRegistry;
  }
}
