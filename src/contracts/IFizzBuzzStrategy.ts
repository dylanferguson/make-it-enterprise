export interface IFizzBuzzStrategy {
  evaluate(value: number): string | null;
  getPriority(): number;
}
