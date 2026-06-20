import type { IAspectJoinPoint } from "./IAspectJoinPoint.js";

export type AdviceType = "BEFORE" | "AFTER" | "AROUND" | "AFTER_THROWING" | "AFTER_RETURNING";

export interface IAspectAdvice {
  getAdviceName(): string;
  getAdviceVersion(): string;
  getAdviceType(): AdviceType;
  getAdviceOrder(): number;
  invoke(joinPoint: IAspectJoinPoint): unknown;
}
