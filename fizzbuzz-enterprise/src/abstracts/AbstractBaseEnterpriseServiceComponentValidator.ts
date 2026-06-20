import type { IEnterpriseServiceComponentValidator } from "../contracts/IEnterpriseServiceComponentValidator.js";
import type { IFizzBuzzVisitor } from "../contracts/IFizzBuzzVisitor.js";

export abstract class AbstractBaseEnterpriseServiceComponentValidator
  implements IEnterpriseServiceComponentValidator
{
  abstract validateComponent(
    componentName: string,
    component: object,
    visitor: IFizzBuzzVisitor,
  ): string[];
  abstract getValidatorName(): string;
  abstract getValidatorVersion(): string;
  abstract isValidationRequired(): boolean;

  protected createValidationResult(
    componentName: string,
    severity: string,
    message: string,
  ): string {
    return `[${this.getValidatorName()}][${severity}] ${componentName}: ${message}`;
  }

  protected validateComponentType(
    component: object,
    expectedTypeName: string,
  ): boolean {
    return component.constructor.name.includes(expectedTypeName);
  }
}
