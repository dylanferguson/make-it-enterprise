import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputationResolutionMediatorArchitecture } from "../contracts/IEnterpriseComputationResolutionMediatorArchitecture.js";
import { AbstractBaseComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator } from "../abstracts/AbstractBaseComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator.js";

export class ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "ComputationResolutionMediatorArchitectureAwareFacadeDecoratorImpl";
  private static readonly DECORATOR_VERSION = "1.0.0-DECORATOR-ADAPTER-ARCH";

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    architecture: IEnterpriseComputationResolutionMediatorArchitecture,
    decoratorEnabled: boolean = true,
  ) {
    super(
      ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME,
      ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION,
      wrappedFacade,
      architecture,
      decoratorEnabled,
    );
  }

  resolveValue(value: number): string {
    if (!this.decoratorEnabled) {
      return this.wrappedFacade.resolveValue(value);
    }
    const adapterResult = this.architecture.resolveValue(value);
    if (adapterResult !== String(value)) {
      return adapterResult;
    }
    return this.wrappedFacade.resolveValue(value);
  }

  resolveRange(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }
}
