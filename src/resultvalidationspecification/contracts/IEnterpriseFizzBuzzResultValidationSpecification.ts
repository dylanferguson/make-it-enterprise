export interface IEnterpriseFizzBuzzResultValidationSpecification {
  getSpecificationName(): string;
  getSpecificationVersion(): string;
  getSpecificationDescription(): string;
  isResultValid(value: number, computedResult: string): boolean;
  getValidationPriority(): number;
  getFailureCode(): string;
}
