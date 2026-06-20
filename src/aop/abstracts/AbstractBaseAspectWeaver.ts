import type { IAspectAdvice } from "../contracts/IAspectAdvice.js";
import type { IAspectPointcut } from "../contracts/IAspectPointcut.js";
import type { IAspectWeaver } from "../contracts/IAspectWeaver.js";

export abstract class AbstractBaseAspectWeaver implements IAspectWeaver {
  private readonly weaverName: string;
  private readonly weaverVersion: string;
  protected readonly aspectRegistrations: Array<{ pointcut: IAspectPointcut; advice: IAspectAdvice }> = [];

  constructor(weaverName: string, weaverVersion: string) {
    this.weaverName = weaverName;
    this.weaverVersion = weaverVersion;
  }

  getWeaverName(): string {
    return this.weaverName;
  }

  getWeaverVersion(): string {
    return this.weaverVersion;
  }

  registerAspect(pointcut: IAspectPointcut, advice: IAspectAdvice): void {
    this.aspectRegistrations.push({ pointcut, advice });
  }

  getRegisteredAspectCount(): number {
    return this.aspectRegistrations.length;
  }

  getRegisteredPointcuts(): readonly IAspectPointcut[] {
    return this.aspectRegistrations.map((r) => r.pointcut);
  }

  getRegisteredAdvice(): readonly IAspectAdvice[] {
    return this.aspectRegistrations.map((r) => r.advice);
  }

  abstract weave<T extends object>(target: T): T;
  abstract isWoven(target: unknown): boolean;
}
