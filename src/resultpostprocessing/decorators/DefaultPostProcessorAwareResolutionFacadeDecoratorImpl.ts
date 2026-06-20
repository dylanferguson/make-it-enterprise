import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputationResultPostProcessorProvider } from "../contracts/IEnterpriseComputationResultPostProcessor.js";
import { AbstractBasePostProcessorAwareResolutionFacadeDecorator } from "../abstracts/AbstractBasePostProcessorAwareResolutionFacadeDecorator.js";

export class DefaultPostProcessorAwareResolutionFacadeDecoratorImpl
  extends AbstractBasePostProcessorAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "DefaultPostProcessorAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-POST-PROCESSOR-AWARE-DECORATOR";
  private static readonly DECORATOR_CONFIGURATION_PROFILE = "POST_PROCESSOR_ENABLED_RESOLUTION";

  private resolutionCount: number = 0;
  private decoratorEnabled: boolean;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    postProcessorProvider: IEnterpriseComputationResultPostProcessorProvider,
    decoratorEnabled: boolean = true,
  ) {
    super(wrappedFacade, postProcessorProvider);
    this.decoratorEnabled = decoratorEnabled;
  }

  override resolveValue(value: number): string {
    this.resolutionCount++;
    const rawResult = this.wrappedFacade.resolveValue(value);
    if (!this.decoratorEnabled) {
      return rawResult;
    }
    const resolutionContext = this.generateResolutionContext(value);
    console.debug(
      `[${DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
      `Post-processing single value resolution: value=[${value}], ` +
      `rawResult=[${rawResult}], context=[${resolutionContext}], ` +
      `provider=[${this.postProcessorProvider.getProviderName()} v${this.postProcessorProvider.getProviderVersion()}], ` +
      `chain=[${this.postProcessorProvider.getActiveProcessorChainDescriptor()}]`,
    );
    return this.postProcessorProvider.processComputationResult(value, rawResult, resolutionContext);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  override getFacadeName(): string {
    return `${DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getWrappedFacadeName(): string {
    return this.wrappedFacade.getFacadeName();
  }

  override getPostProcessorProviderName(): string {
    return this.postProcessorProvider.getProviderName();
  }

  override isDecoratorEnabled(): boolean {
    return this.decoratorEnabled;
  }

  setDecoratorEnabled(enabled: boolean): void {
    this.decoratorEnabled = enabled;
  }

  getResolutionCount(): number {
    return this.resolutionCount;
  }

  getDecoratorConfigurationProfile(): string {
    return DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.DECORATOR_CONFIGURATION_PROFILE;
  }
}
