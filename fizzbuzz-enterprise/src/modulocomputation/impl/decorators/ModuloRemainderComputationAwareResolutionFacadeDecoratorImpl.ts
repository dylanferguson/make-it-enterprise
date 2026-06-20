import { AbstractBaseModuloRemainderComputationAwareResolutionFacadeDecoratorImpl } from "../../abstracts/AbstractBaseModuloRemainderComputationAwareResolutionFacadeDecoratorImpl.js";
import type { IModuloRemainderComputationChainOfResponsibilityHandler, IModuloRemainderComputationCommandInvoker, IModuloRemainderComputationVisitor, IModuloRemainderComputationStrategyProvider } from "../../contracts/index.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export class ModuloRemainderComputationAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseModuloRemainderComputationAwareResolutionFacadeDecoratorImpl
{
  protected readonly decoratorName = "ModuloRemainderComputationAwareResolutionFacadeDecorator";
  protected readonly decoratorVersion = "1.0.0-MRC-AWARE-DECORATOR";
  protected readonly decoratorEnabled = true;

  private computationCount: number = 0;
  private decoratorInterceptionCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    chainHandler: IModuloRemainderComputationChainOfResponsibilityHandler,
    commandInvoker: IModuloRemainderComputationCommandInvoker,
    computationVisitor: IModuloRemainderComputationVisitor,
    strategyProvider: IModuloRemainderComputationStrategyProvider,
    registeredDivisors: readonly number[],
  ) {
    super(wrappedFacade, chainHandler, commandInvoker, computationVisitor, strategyProvider, registeredDivisors);
  }

  override resolveValue(value: number): string {
    this.assertFiniteValue(value);
    this.decoratorInterceptionCount++;

    const divisorResults: string[] = [];
    for (const divisor of this.registeredDivisors) {
      this.computationCount++;
      const remainder = this.performRemainderComputation(value, divisor);
      this.computationVisitor.visitModuloOperation(value, divisor, remainder);
      const isDivisible = remainder === 0;
      this.computationVisitor.visitModuloResult(remainder, isDivisible);
      if (isDivisible) {
        divisorResults.push(divisor === 3 ? "Fizz" : divisor === 5 ? "Buzz" : "");
      }
    }

    if (divisorResults.length > 0) {
      const composite = divisorResults.join("");
      if (composite === "FizzBuzz") {
        return composite;
      }
      if (composite === "Fizz" || composite === "Buzz") {
        return composite;
      }
    }

    return this.wrappedFacade.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertFiniteValue(start);
    this.assertFiniteValue(end);
    if (end < start) {
      throw new Error(
        `[${this.decoratorName} v${this.decoratorVersion}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  override getFacadeName(): string {
    return `${this.decoratorName}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return this.decoratorVersion;
  }

  override getComputationCount(): number {
    return this.computationCount;
  }

  override getDecoratorInterceptionCount(): number {
    return this.decoratorInterceptionCount;
  }
}
