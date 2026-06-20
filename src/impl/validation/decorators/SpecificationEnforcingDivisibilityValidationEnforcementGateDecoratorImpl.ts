import type { IDivisibilityValidationEnforcementGate } from "../../../contracts/IDivisibilityValidationEnforcementGate.js";
import type { IDivisibilityValidationEnforcementSpecificationProvider } from "../../../contracts/IDivisibilityValidationEnforcementSpecificationProvider.js";
import type { IValidationEnforcementMetricsCollector } from "../../../contracts/IValidationEnforcementMetricsCollector.js";
import { AbstractBaseDivisibilityValidationEnforcementGateDecorator } from "../../../abstracts/AbstractBaseDivisibilityValidationEnforcementGateDecorator.js";

export class SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl
  extends AbstractBaseDivisibilityValidationEnforcementGateDecorator
{
  private static readonly DECORATOR_NAME = "SpecificationEnforcingDivisibilityValidationEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-SPECIFICATION-GATE-DECORATOR";
  private static readonly DECORATOR_ORDER = 15;
  private static readonly SPECIFICATION_CATEGORY = "DIVISIBILITY_VALIDATION";

  private readonly specificationProvider: IDivisibilityValidationEnforcementSpecificationProvider;
  private readonly metricsCollector: IValidationEnforcementMetricsCollector | null;

  constructor(
    decoratedGate: IDivisibilityValidationEnforcementGate,
    specificationProvider: IDivisibilityValidationEnforcementSpecificationProvider,
    metricsCollector: IValidationEnforcementMetricsCollector | null = null,
  ) {
    super(decoratedGate);
    this.specificationProvider = specificationProvider;
    this.metricsCollector = metricsCollector;
  }

  override enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean {
    const specification = this.specificationProvider.resolveValidationSpecification(
      divisor,
      SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.SPECIFICATION_CATEGORY,
    );
    if (specification !== null && !specification.isSatisfiedBy(value)) {
      if (this.metricsCollector !== null) {
        this.metricsCollector.recordSpecificationEvaluation(
          specification.getSpecificationName(),
          false,
        );
      }
      return false;
    }
    if (specification !== null && this.metricsCollector !== null) {
      this.metricsCollector.recordSpecificationEvaluation(
        specification.getSpecificationName(),
        true,
      );
    }
    return this.decoratedGate.enforceDivisibilityValidation(
      value,
      divisor,
      validationContext,
    );
  }

  override getGateName(): string {
    return `${SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME}:wraps:${this.decoratedGate.getGateName()}`;
  }

  override getGateVersion(): string {
    return SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getGateImplementationType(): string {
    return `SPECIFICATION_ENFORCING:${this.decoratedGate.getGateImplementationType()}`;
  }

  override getDecoratorName(): string {
    return SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorOrder(): number {
    return SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_ORDER;
  }

  getSpecificationProvider(): IDivisibilityValidationEnforcementSpecificationProvider {
    return this.specificationProvider;
  }
}
