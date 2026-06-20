import { AbstractBaseAspectWeaver } from "../../abstracts/AbstractBaseAspectWeaver.js";
import type { IAspectAdvice } from "../../contracts/IAspectAdvice.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";
import type { IAspectPointcut } from "../../contracts/IAspectPointcut.js";
import type { IAspectWeaver } from "../../contracts/IAspectWeaver.js";

export class DefaultAspectWeaverImpl extends AbstractBaseAspectWeaver {
  private static readonly WEAVER_NAME = "DefaultAspectWeaver";
  private static readonly WEAVER_VERSION = "1.0.0-DEFAULT-ASPECT-WEAVER";

  private readonly wovenTargets: Set<object> = new Set();

  constructor() {
    super(DefaultAspectWeaverImpl.WEAVER_NAME, DefaultAspectWeaverImpl.WEAVER_VERSION);
  }

  override weave<T extends object>(target: T): T {
    this.wovenTargets.add(target);
    return target;
  }

  override isWoven(target: unknown): boolean {
    return this.wovenTargets.has(target as object);
  }

  getApplicableAdvice(joinPoint: IAspectJoinPoint): readonly IAspectAdvice[] {
    const applicable: IAspectAdvice[] = [];
    for (const registration of this.aspectRegistrations) {
      if (registration.pointcut.matches(joinPoint)) {
        applicable.push(registration.advice);
      }
    }
    applicable.sort((a, b) => a.getAdviceOrder() - b.getAdviceOrder());
    return applicable;
  }
}
