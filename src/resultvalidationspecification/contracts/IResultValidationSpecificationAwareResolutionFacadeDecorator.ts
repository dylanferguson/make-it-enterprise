import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "./IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export interface IResultValidationSpecificationAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getWrappedFacadeName(): string;
  getValidationRegistry(): IEnterpriseFizzBuzzResultValidationSpecificationRegistry;
  getTotalValidatedCount(): number;
  getTotalValidationFailureCount(): number;
  getLastValidationFailures(): readonly string[];
  isDecoratorEnabled(): boolean;
  getDecoratorDiagnosticSummary(): string;
}
