import type { IAspectPointcut } from "../../contracts/IAspectPointcut.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";
import { AbstractBaseAspectPointcut } from "../../abstracts/AbstractBaseAspectPointcut.js";

export class CompositeAspectPointcutImpl extends AbstractBaseAspectPointcut {
  private static readonly POINTCUT_NAME = "CompositeAspectPointcut";
  private static readonly POINTCUT_VERSION = "1.0.0-COMPOSITE-POINTCUT";

  private readonly pointcuts: readonly IAspectPointcut[];
  private readonly matchStrategy: "ALL" | "ANY";

  constructor(pointcuts: readonly IAspectPointcut[], matchStrategy: "ALL" | "ANY" = "ANY") {
    super(
      `${CompositeAspectPointcutImpl.POINTCUT_NAME}::${matchStrategy}`,
      CompositeAspectPointcutImpl.POINTCUT_VERSION,
    );
    this.pointcuts = pointcuts;
    this.matchStrategy = matchStrategy;
  }

  override matches(joinPoint: IAspectJoinPoint): boolean {
    if (this.matchStrategy === "ALL") {
      return this.pointcuts.every((p) => p.matches(joinPoint));
    }
    return this.pointcuts.some((p) => p.matches(joinPoint));
  }

  override getRegisteredExpressionPatterns(): readonly string[] {
    return this.pointcuts.flatMap((p) => p.getRegisteredExpressionPatterns());
  }
}
