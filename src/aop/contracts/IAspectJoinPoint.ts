import type { IAspectAdvice } from "./IAspectAdvice.js";

export interface IAspectJoinPoint {
  getJoinPointName(): string;
  getJoinPointVersion(): string;
  getTarget(): unknown;
  getMethodName(): string;
  getArguments(): readonly unknown[];
  proceed(): unknown;
  proceedWithArgs(args: readonly unknown[]): unknown;
  getAdviceChain(): readonly IAspectAdvice[];
  setAdviceChain(advice: readonly IAspectAdvice[]): void;
}
