import type { IModuloRemainderComputationChainOfResponsibilityHandler, IModuloRemainderComputationCommandInvoker, IModuloRemainderComputationVisitor, IModuloRemainderComputationStrategyProvider } from "../contracts/index.js";
import type { IModuloRemainderComputationAwareResolutionFacadeDecorator } from "../contracts/IModuloRemainderComputationAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export abstract class AbstractBaseModuloRemainderComputationAwareResolutionFacadeDecoratorImpl
  implements IModuloRemainderComputationAwareResolutionFacadeDecorator
{
  protected abstract readonly decoratorName: string;
  protected abstract readonly decoratorVersion: string;
  protected abstract readonly decoratorEnabled: boolean;

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly chainHandler: IModuloRemainderComputationChainOfResponsibilityHandler;
  protected readonly commandInvoker: IModuloRemainderComputationCommandInvoker;
  protected readonly computationVisitor: IModuloRemainderComputationVisitor;
  protected readonly strategyProvider: IModuloRemainderComputationStrategyProvider;
  protected readonly registeredDivisors: readonly number[];

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    chainHandler: IModuloRemainderComputationChainOfResponsibilityHandler,
    commandInvoker: IModuloRemainderComputationCommandInvoker,
    computationVisitor: IModuloRemainderComputationVisitor,
    strategyProvider: IModuloRemainderComputationStrategyProvider,
    registeredDivisors: readonly number[],
  ) {
    this.wrappedFacade = wrappedFacade;
    this.chainHandler = chainHandler;
    this.commandInvoker = commandInvoker;
    this.computationVisitor = computationVisitor;
    this.strategyProvider = strategyProvider;
    this.registeredDivisors = registeredDivisors;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;

  getDecoratorName(): string { return this.decoratorName; }
  getDecoratorVersion(): string { return this.decoratorVersion; }
  isDecoratorEnabled(): boolean { return this.decoratorEnabled; }
  getWrappedFacadeName(): string { return this.wrappedFacade.getFacadeName(); }
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade { return this.wrappedFacade; }
  getChainHandler(): IModuloRemainderComputationChainOfResponsibilityHandler { return this.chainHandler; }
  getCommandInvoker(): IModuloRemainderComputationCommandInvoker { return this.commandInvoker; }
  getComputationVisitor(): IModuloRemainderComputationVisitor { return this.computationVisitor; }
  getStrategyProvider(): IModuloRemainderComputationStrategyProvider { return this.strategyProvider; }
  getRegisteredDivisors(): readonly number[] { return [...this.registeredDivisors]; }
  abstract getComputationCount(): number;
  abstract getDecoratorInterceptionCount(): number;

  protected performRemainderComputation(value: number, divisor: number): number {
    return this.chainHandler.evaluateRemainder(value, divisor, (v: number, d: number) => {
      const command = this.strategyProvider.resolveComputationStrategy(d);
      return this.commandInvoker.invokeComputation(v, d);
    });
  }

  protected evaluateDivisibilityForDivisors(value: number, divisor: number): boolean {
    const remainder = this.performRemainderComputation(value, divisor);
    this.computationVisitor.visitModuloOperation(value, divisor, remainder);
    const isDivisible = remainder === 0;
    this.computationVisitor.visitModuloResult(remainder, isDivisible);
    return isDivisible;
  }

  protected assertFiniteValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.decoratorName} v${this.decoratorVersion}] ` +
        `Resolution value must be finite, received: ${value}`,
      );
    }
  }
}
