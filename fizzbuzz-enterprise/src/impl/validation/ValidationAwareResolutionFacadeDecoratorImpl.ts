import { AbstractBaseValidationAwareResolutionFacadeDecorator } from "../../abstracts/AbstractBaseValidationAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IDivisibilityValidationEnforcementGate } from "../../contracts/IDivisibilityValidationEnforcementGate.js";

export class ValidationAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseValidationAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "ValidationAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-VALIDATION-AWARE-DECORATOR";
  private static readonly VALIDATION_GATE_CONTEXT = "FACADE_VALIDATION_GATE_CONTEXT";

  private readonly validationGate: IDivisibilityValidationEnforcementGate;
  private readonly validationEnabled: boolean;
  private readonly divisorRegistry: Map<string, number>;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    validationGate: IDivisibilityValidationEnforcementGate,
    validationEnabled: boolean = true,
  ) {
    super(decoratedFacade);
    this.validationGate = validationGate;
    this.validationEnabled = validationEnabled;
    this.divisorRegistry = new Map<string, number>([
      ["fizzDivisibleByThree", 3],
      ["buzzDivisibleByFive", 5],
      ["fizzBuzzCombinationFifteen", 15],
    ]);
  }

  override resolveValue(value: number): string {
    if (this.validationEnabled) {
      this.validateValueThroughGate(value);
    }
    return this.decoratedFacade.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    if (this.validationEnabled) {
      const results: string[] = [];
      for (let i = start; i <= end; i++) {
        this.validateValueThroughGate(i);
        results.push(this.decoratedFacade.resolveValue(i));
      }
      return results;
    }
    return this.decoratedFacade.resolveRange(start, end);
  }

  override getFacadeName(): string {
    return `${ValidationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}:wraps:${this.decoratedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return ValidationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return ValidationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return ValidationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override isValidationEnabled(): boolean {
    return this.validationEnabled;
  }

  registerDivisor(ruleName: string, divisor: number): void {
    this.divisorRegistry.set(ruleName, divisor);
  }

  private validateValueThroughGate(value: number): void {
    const contextId = this.createValidationContextId(value);
    for (const [ruleName, divisor] of this.divisorRegistry.entries()) {
      this.validationGate.enforceDivisibilityValidation(
        value,
        divisor,
        `${ValidationAwareResolutionFacadeDecoratorImpl.VALIDATION_GATE_CONTEXT}:${ruleName}:${contextId}`,
      );
    }
  }
}
