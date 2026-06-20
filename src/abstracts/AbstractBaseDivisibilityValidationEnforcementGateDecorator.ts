import type { IDivisibilityValidationEnforcementGate } from "../contracts/IDivisibilityValidationEnforcementGate.js";
import type { IDivisibilityValidationEnforcementGateDecorator } from "../contracts/IDivisibilityValidationEnforcementGateDecorator.js";

export abstract class AbstractBaseDivisibilityValidationEnforcementGateDecorator
  implements IDivisibilityValidationEnforcementGateDecorator
{
  protected readonly decoratedGate: IDivisibilityValidationEnforcementGate;
  protected static readonly DEFAULT_DECORATOR_ORDER = 100;
  protected static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-GATE-DECORATOR-FRAMEWORK";

  constructor(decoratedGate: IDivisibilityValidationEnforcementGate) {
    if (decoratedGate === null) {
      throw new Error(
        `[${this.getDecoratorName()}] Decorated gate must not be null`,
      );
    }
    this.decoratedGate = decoratedGate;
  }

  abstract getGateName(): string;
  abstract getGateVersion(): string;
  abstract getGateImplementationType(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;
  abstract getDecoratorOrder(): number;
  abstract enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean;

  getDecoratedGate(): IDivisibilityValidationEnforcementGate {
    return this.decoratedGate;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBaseDivisibilityValidationEnforcementGateDecorator.DECORATOR_FRAMEWORK_VERSION;
  }

  protected createDecoratorAuditTrailEntry(
    decoratorName: string,
    value: number,
    divisor: number,
    result: boolean,
  ): string {
    return `[${decoratorName}] gate:audit:${value}:${divisor}:${result}:${Date.now()}`;
  }
}
