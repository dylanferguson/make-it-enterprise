export interface IEnterpriseResultValidator {
  validate(input: number, result: string): string;
  getValidatorName(): string;
  getValidatorPriority(): number;
}
