import type { IDivisibilityEvaluator } from "../contracts/IDivisibilityEvaluator.js";
import type { ISpecificationSelectionMediator } from "../contracts/ISpecificationSelectionMediator.js";
import { SpecificationSelectionMediatorFactoryBeanFactory } from "../impl/factories/SpecificationSelectionMediatorFactoryBeanFactory.js";

export class SpecificationMediationEnforcingDivisibilityEvaluatorDecorator
  implements IDivisibilityEvaluator
{
  private static readonly DECORATOR_NAME = "SpecificationMediationEnforcingDivisibilityEvaluatorDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-SPECIFICATION-MEDIATION-DECORATOR";

  private readonly delegate: IDivisibilityEvaluator;
  private readonly mediator: ISpecificationSelectionMediator;

  constructor(
    delegate: IDivisibilityEvaluator,
    mediator: ISpecificationSelectionMediator | null,
  ) {
    this.delegate = delegate;
    this.mediator = mediator ?? SpecificationSelectionMediatorFactoryBeanFactory.createMediator(delegate);
  }

  isDivisible(dividend: number, divisor: number): boolean {
    const mediatedResult = this.mediator.mediateSpecificationSelection(dividend, divisor);
    const delegatedResult = this.delegate.isDivisible(dividend, divisor);
    return mediatedResult && delegatedResult;
  }

  getDecoratorName(): string {
    return SpecificationMediationEnforcingDivisibilityEvaluatorDecorator.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return SpecificationMediationEnforcingDivisibilityEvaluatorDecorator.DECORATOR_VERSION;
  }

  getDelegate(): IDivisibilityEvaluator {
    return this.delegate;
  }

  getMediator(): ISpecificationSelectionMediator {
    return this.mediator;
  }
}
