export interface IFizzBuzzOutputFormatter {
  formatFizzBuzz(): string;
  formatFizz(): string;
  formatBuzz(): string;
  formatDefault(value: number): string;
}
