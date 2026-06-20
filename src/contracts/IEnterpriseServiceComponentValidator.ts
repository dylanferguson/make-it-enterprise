import type { IFizzBuzzVisitor } from "./IFizzBuzzVisitor.js";

export interface IEnterpriseServiceComponentValidator {
  validateComponent(
    componentName: string,
    component: object,
    visitor: IFizzBuzzVisitor,
  ): string[];
  getValidatorName(): string;
  getValidatorVersion(): string;
  isValidationRequired(): boolean;
}
