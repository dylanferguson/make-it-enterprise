import type { IFizzBuzzSingleValueResolutionFacade } from "../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseModuloArithmeticConfigurationProvider } from "../contracts/IEnterpriseModuloArithmeticConfigurationProvider.js";
import type { IConfigurationAwareResolutionFacadeDecorator } from "../contracts/IConfigurationAwareResolutionFacadeDecorator.js";

export abstract class AbstractBaseConfigurationAwareResolutionFacadeDecorator
  implements IConfigurationAwareResolutionFacadeDecorator
{
  protected static readonly RESOLUTION_CONTEXT_PREFIX = "config:aware:dec";

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly configurationProvider: IEnterpriseModuloArithmeticConfigurationProvider;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    configurationProvider: IEnterpriseModuloArithmeticConfigurationProvider,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.configurationProvider = configurationProvider;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;
  abstract getDecoratorConfigurationProfile(): string;

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getConfigurationProvider(): IEnterpriseModuloArithmeticConfigurationProvider {
    return this.configurationProvider;
  }

  protected buildResolutionContext(value: number): string {
    return `${AbstractBaseConfigurationAwareResolutionFacadeDecorator.RESOLUTION_CONTEXT_PREFIX}:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }

  protected assertValueInRange(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
        `Resolution value must be finite, received: ${value}`,
      );
    }
  }
}
