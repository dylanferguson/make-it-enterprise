export interface IModuloOperationTemplateMethodFrameworkProvider {
  executeModuloOperation(
    dividend: number,
    divisor: number,
    operationName: string,
  ): number;
  getFrameworkName(): string;
  getFrameworkVersion(): string;
  isOperationSupported(dividend: number, divisor: number): boolean;
}
