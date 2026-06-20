import { AbstractBaseResultValidationSpecificationAwareResolutionFacadeDecoratorImpl } from "../abstracts/AbstractBaseResultValidationSpecificationAwareResolutionFacadeDecoratorImpl.js";
import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export class ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseResultValidationSpecificationAwareResolutionFacadeDecoratorImpl
{
  private static readonly DECORATOR_NAME = "ResultValidationSpecificationAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-VALIDATION-DECORATOR";

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    validationRegistry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry,
    enabled: boolean,
  ) {
    super(
      ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME,
      ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION,
      wrappedFacade,
      validationRegistry,
      enabled,
    );
  }

  getFacadeName(): string {
    return `${ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}->${this.getWrappedFacadeName()}`;
  }

  getFacadeVersion(): string {
    return ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  resolveValue(value: number): string {
    const computedResult = this.getWrappedFacade().resolveValue(value);
    return this.performValidation(value, computedResult);
  }
}
