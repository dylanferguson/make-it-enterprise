import type { IDivisibilityValidationEnforcementGate } from "./IDivisibilityValidationEnforcementGate.js";

export interface IDivisibilityValidationEnforcementGateDecorator
  extends IDivisibilityValidationEnforcementGate {
  getDecoratedGate(): IDivisibilityValidationEnforcementGate;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getDecoratorOrder(): number;
}
