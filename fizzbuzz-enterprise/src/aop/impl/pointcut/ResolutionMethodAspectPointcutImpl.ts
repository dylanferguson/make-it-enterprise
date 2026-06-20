import { AbstractBaseAspectPointcut } from "../../abstracts/AbstractBaseAspectPointcut.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";

export class ResolutionMethodAspectPointcutImpl extends AbstractBaseAspectPointcut {
  private static readonly POINTCUT_NAME = "ResolutionMethodAspectPointcut";
  private static readonly POINTCUT_VERSION = "1.0.0-RESOLUTION-METHOD-POINTCUT";
  private static readonly TARGET_METHOD_PATTERNS: readonly string[] = [
    "resolveValue",
    "resolveRange",
    "resolveSingleValue",
    "delegateSingleValueResolution",
    "enforceComputation",
  ];

  constructor() {
    super(
      ResolutionMethodAspectPointcutImpl.POINTCUT_NAME,
      ResolutionMethodAspectPointcutImpl.POINTCUT_VERSION,
    );
  }

  override matches(joinPoint: IAspectJoinPoint): boolean {
    return ResolutionMethodAspectPointcutImpl.TARGET_METHOD_PATTERNS.includes(joinPoint.getMethodName());
  }

  override getRegisteredExpressionPatterns(): readonly string[] {
    return ResolutionMethodAspectPointcutImpl.TARGET_METHOD_PATTERNS.map(
      (p) => `execution(* *.${p}(..))`,
    );
  }
}
