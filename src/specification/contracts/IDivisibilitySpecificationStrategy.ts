export interface IDivisibilitySpecificationStrategy {
  isSatisfiedBy(value: number): boolean;
  getSpecificationName(): string;
  getSpecificationVersion(): string;
  getSpecificationDivisor(): number;
}
