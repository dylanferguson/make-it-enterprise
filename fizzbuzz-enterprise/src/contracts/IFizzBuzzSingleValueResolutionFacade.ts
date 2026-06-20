export interface IFizzBuzzSingleValueResolutionFacade {
  resolveValue(value: number): string;
  resolveRange(start: number, end: number): readonly string[];
  getFacadeName(): string;
  getFacadeVersion(): string;
}
