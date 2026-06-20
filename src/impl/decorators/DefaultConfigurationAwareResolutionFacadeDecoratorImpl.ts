import { AbstractBaseConfigurationAwareResolutionFacadeDecorator } from "../../abstracts/AbstractBaseConfigurationAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseModuloArithmeticConfigurationProvider } from "../../contracts/IEnterpriseModuloArithmeticConfigurationProvider.js";

export class DefaultConfigurationAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseConfigurationAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "DefaultConfigurationAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-CONFIG-AWARE-DECORATOR";
  private static readonly DECORATOR_CONFIGURATION_PROFILE = "CONFIGURATION_AWARE_RESOLUTION";

  private resolutionCount: number = 0;
  private configurationLookupCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    configurationProvider: IEnterpriseModuloArithmeticConfigurationProvider,
  ) {
    super(wrappedFacade, configurationProvider);
  }

  override resolveValue(value: number): string {
    this.assertValueInRange(value);
    this.resolutionCount++;
    this.configurationLookupCount++;
    const registeredDivisors = this.configurationProvider.getDivisorCandidates();
    const resolutionContext = this.buildResolutionContext(value);
    console.debug(
      `[${DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
      `Resolving value [${value}] with configuration-aware decorator [context=${resolutionContext}]: ` +
      `configurationProfile=[${this.configurationProvider.getConfigurationProfile()}], ` +
      `registeredDivisors=[${registeredDivisors.join(", ")}], ` +
      `provider=[${this.configurationProvider.getConfigurationProviderName()} v${this.configurationProvider.getConfigurationProviderVersion()}]`,
    );
    return this.wrappedFacade.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertValueInRange(start);
    this.assertValueInRange(end);
    if (end < start) {
      throw new Error(
        `[${DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    this.resolutionCount += (end - start + 1);
    this.configurationLookupCount++;
    const registeredDivisors = this.configurationProvider.getDivisorCandidates();
    console.debug(
      `[${DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
      `Resolving range [${start}..${end}] with configuration-aware decorator: ` +
      `configurationProfile=[${this.configurationProvider.getConfigurationProfile()}], ` +
      `registeredDivisors=[${registeredDivisors.join(", ")}]`,
    );
    return this.wrappedFacade.resolveRange(start, end);
  }

  override getFacadeName(): string {
    return `${DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorConfigurationProfile(): string {
    return DefaultConfigurationAwareResolutionFacadeDecoratorImpl.DECORATOR_CONFIGURATION_PROFILE;
  }

  getResolutionCount(): number {
    return this.resolutionCount;
  }

  getConfigurationLookupCount(): number {
    return this.configurationLookupCount;
  }
}
