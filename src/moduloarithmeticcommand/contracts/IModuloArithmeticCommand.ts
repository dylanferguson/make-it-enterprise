export interface IModuloArithmeticCommand {
  execute(dividend: number, divisor: number): number;
  getCommandName(): string;
  getCommandVersion(): string;
  supportsOperands(dividend: number, divisor: number): boolean;
  getCommandDescriptor(): string;
}
