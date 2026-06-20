export interface IModuloRemainderComputationCommand {
  executeComputation(value: number, divisor: number): number;
  getCommandName(): string;
  getCommandVersion(): string;
  getCommandDescriptor(): string;
}

export interface IModuloRemainderComputationCommandInvoker {
  invokeComputation(value: number, divisor: number): number;
  getInvokerName(): string;
  getInvokerVersion(): string;
  registerCommand(command: IModuloRemainderComputationCommand): void;
  getRegisteredCommandNames(): readonly string[];
}

export interface IModuloRemainderComputationStrategyProvider {
  resolveComputationStrategy(divisor: number): IModuloRemainderComputationCommand;
  getProviderName(): string;
  getProviderVersion(): string;
  getRegisteredDivisors(): readonly number[];
}

export interface IModuloRemainderComputationChainOfResponsibilityHandler {
  evaluateRemainder(value: number, divisor: number, next: (v: number, d: number) => number): number;
  getHandlerName(): string;
  getHandlerVersion(): string;
  setNext(handler: IModuloRemainderComputationChainOfResponsibilityHandler): void;
}

export interface IModuloRemainderComputationVisitor {
  visitModuloOperation(value: number, divisor: number, remainder: number): void;
  visitModuloResult(remainder: number, isDivisible: boolean): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitLog(): readonly string[];
}

export interface IModuloRemainderComputationCommandDecorator
  extends IModuloRemainderComputationCommand {
  getWrappedCommand(): IModuloRemainderComputationCommand;
}
