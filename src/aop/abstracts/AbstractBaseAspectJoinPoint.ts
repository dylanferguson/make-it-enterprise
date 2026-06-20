import type { IAspectAdvice } from "../contracts/IAspectAdvice.js";
import type { IAspectJoinPoint } from "../contracts/IAspectJoinPoint.js";

export abstract class AbstractBaseAspectJoinPoint implements IAspectJoinPoint {
  private readonly joinPointName: string;
  private readonly joinPointVersion: string;
  private readonly target: unknown;
  private readonly methodName: string;
  private readonly args: readonly unknown[];
  private adviceChain: readonly IAspectAdvice[] = [];
  private currentAdviceIndex: number = 0;
  private chainedReturnValue: unknown = undefined;

  constructor(
    joinPointName: string,
    joinPointVersion: string,
    target: unknown,
    methodName: string,
    args: readonly unknown[],
  ) {
    this.joinPointName = joinPointName;
    this.joinPointVersion = joinPointVersion;
    this.target = target;
    this.methodName = methodName;
    this.args = args;
  }

  getJoinPointName(): string {
    return this.joinPointName;
  }

  getJoinPointVersion(): string {
    return this.joinPointVersion;
  }

  getTarget(): unknown {
    return this.target;
  }

  getMethodName(): string {
    return this.methodName;
  }

  getArguments(): readonly unknown[] {
    return this.args;
  }

  getAdviceChain(): readonly IAspectAdvice[] {
    return this.adviceChain;
  }

  setAdviceChain(advice: readonly IAspectAdvice[]): void {
    this.adviceChain = advice;
    this.currentAdviceIndex = 0;
  }

  getCurrentAdviceIndex(): number {
    return this.currentAdviceIndex;
  }

  setCurrentAdviceIndex(index: number): void {
    this.currentAdviceIndex = index;
  }

  getChainedReturnValue(): unknown {
    return this.chainedReturnValue;
  }

  setChainedReturnValue(value: unknown): void {
    this.chainedReturnValue = value;
  }

  abstract proceed(): unknown;
  abstract proceedWithArgs(args: readonly unknown[]): unknown;
}
