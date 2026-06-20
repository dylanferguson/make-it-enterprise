import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputationResultPostProcessorProvider } from "../contracts/IEnterpriseComputationResultPostProcessor.js";
import type { IPostProcessorAwareResolutionFacadeDecorator } from "../contracts/IEnterpriseComputationResultPostProcessor.js";

export abstract class AbstractBasePostProcessorAwareResolutionFacadeDecorator
  implements IFizzBuzzSingleValueResolutionFacade, IPostProcessorAwareResolutionFacadeDecorator
{
  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly postProcessorProvider: IEnterpriseComputationResultPostProcessorProvider;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    postProcessorProvider: IEnterpriseComputationResultPostProcessorProvider,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.postProcessorProvider = postProcessorProvider;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;
  abstract getWrappedFacadeName(): string;
  abstract getPostProcessorProviderName(): string;
  abstract isDecoratorEnabled(): boolean;

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getPostProcessorProvider(): IEnterpriseComputationResultPostProcessorProvider {
    return this.postProcessorProvider;
  }

  protected generateResolutionContext(value: number): string {
    return `pp:ctx:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }
}
