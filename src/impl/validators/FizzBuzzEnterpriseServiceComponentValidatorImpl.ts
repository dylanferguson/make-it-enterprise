import { AbstractBaseEnterpriseServiceComponentValidator } from "../../abstracts/AbstractBaseEnterpriseServiceComponentValidator.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import { FizzBuzzEvaluationContextImpl } from "../evaluation/FizzBuzzEvaluationContextImpl.js";

export class FizzBuzzEnterpriseServiceComponentValidatorImpl extends AbstractBaseEnterpriseServiceComponentValidator {
  private static readonly VALIDATOR_NAME = "FizzBuzzEnterpriseServiceComponentValidator";
  private static readonly VALIDATOR_VERSION = "1.0.0-ENTERPRISE";

  override validateComponent(
    componentName: string,
    component: object,
    visitor: IFizzBuzzVisitor,
  ): string[] {
    const validationIssues: string[] = [];

    if (component === null || component === undefined) {
      validationIssues.push(
        this.createValidationResult(componentName, "CRITICAL", "Component reference is null or undefined"),
      );
      return validationIssues;
    }

    const context = new FizzBuzzEvaluationContextImpl(0);
    context.setDivisor(1);

    try {
      visitor.visitEvaluationContext(context as IFizzBuzzEvaluationContext);
    } catch {
      validationIssues.push(
        this.createValidationResult(componentName, "WARNING", "Component failed visitor inspection"),
      );
    }

    const componentType = component.constructor?.name ?? "Unknown";
    if (componentType === "Object" || componentType === "") {
      validationIssues.push(
        this.createValidationResult(componentName, "INFO", `Component has non-specific type: ${componentType}`),
      );
    }

    return validationIssues;
  }

  override getValidatorName(): string {
    return FizzBuzzEnterpriseServiceComponentValidatorImpl.VALIDATOR_NAME;
  }

  override getValidatorVersion(): string {
    return FizzBuzzEnterpriseServiceComponentValidatorImpl.VALIDATOR_VERSION;
  }

  override isValidationRequired(): boolean {
    return true;
  }
}
