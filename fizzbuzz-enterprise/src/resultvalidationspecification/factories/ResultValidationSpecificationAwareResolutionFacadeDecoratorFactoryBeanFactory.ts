import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import type { IResultValidationSpecificationAwareResolutionFacadeDecorator } from "../contracts/IResultValidationSpecificationAwareResolutionFacadeDecorator.js";
import { ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl } from "../impl/ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "ResultValidationSpecificationAwareResolutionFacadeDecoratorFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-VALIDATION-DECORATOR-FACTORY-BEAN-FACTORY";

class ResultValidationSpecificationDecoratorFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseResultValidationSpecificationDecoratorFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-VALIDATION-DECORATOR-FACTORY-BEAN";

  getFactoryBeanName(): string {
    return ResultValidationSpecificationDecoratorFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return ResultValidationSpecificationDecoratorFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    validationRegistry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry,
    enabled: boolean,
  ): IResultValidationSpecificationAwareResolutionFacadeDecorator {
    return new ResultValidationSpecificationAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      validationRegistry,
      enabled,
    );
  }
}

let decoratorFactoryBean: ResultValidationSpecificationDecoratorFactoryBeanImpl | null = null;

export class ResultValidationSpecificationAwareResolutionFacadeDecoratorFactoryBeanFactory {
  static createFactoryBean(): ResultValidationSpecificationDecoratorFactoryBeanImpl {
    if (decoratorFactoryBean === null) {
      decoratorFactoryBean = new ResultValidationSpecificationDecoratorFactoryBeanImpl();
    }
    return decoratorFactoryBean;
  }

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    validationRegistry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry,
    enabled: boolean = true,
  ): IResultValidationSpecificationAwareResolutionFacadeDecorator {
    const factoryBean = ResultValidationSpecificationAwareResolutionFacadeDecoratorFactoryBeanFactory.createFactoryBean();
    return factoryBean.createDecorator(wrappedFacade, validationRegistry, enabled);
  }

  static getFactoryBean(): ResultValidationSpecificationDecoratorFactoryBeanImpl | null {
    return decoratorFactoryBean;
  }

  static resetFactoryBean(): void {
    decoratorFactoryBean = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
