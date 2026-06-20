import type { IAspectJoinPoint } from "./IAspectJoinPoint.js";

export interface IAspectPointcut {
  getPointcutName(): string;
  getPointcutVersion(): string;
  matches(joinPoint: IAspectJoinPoint): boolean;
  getRegisteredExpressionPatterns(): readonly string[];
}
