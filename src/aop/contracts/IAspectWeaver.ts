import type { IAspectAdvice } from "./IAspectAdvice.js";
import type { IAspectPointcut } from "./IAspectPointcut.js";

export interface IAspectWeaver {
  getWeaverName(): string;
  getWeaverVersion(): string;
  registerAspect(pointcut: IAspectPointcut, advice: IAspectAdvice): void;
  getRegisteredAspectCount(): number;
  getRegisteredPointcuts(): readonly IAspectPointcut[];
  getRegisteredAdvice(): readonly IAspectAdvice[];
  weave<T extends object>(target: T): T;
  isWoven(target: unknown): boolean;
}
