import { AbstractBaseAspectAdvice } from "../../abstracts/AbstractBaseAspectAdvice.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";

export type AroundInvocationClosure = (joinPoint: IAspectJoinPoint) => unknown;

export class AroundAspectAdviceImpl extends AbstractBaseAspectAdvice {
  private static readonly ADVICE_NAME = "AroundAspectAdvice";
  private static readonly ADVICE_VERSION = "1.0.0-AROUND-ADVICE";

  private readonly aroundCallback: AroundInvocationClosure;

  constructor(aroundCallback: AroundInvocationClosure, order: number = 150) {
    super(AroundAspectAdviceImpl.ADVICE_NAME, AroundAspectAdviceImpl.ADVICE_VERSION, "AROUND", order);
    this.aroundCallback = aroundCallback;
  }

  override invoke(joinPoint: IAspectJoinPoint): unknown {
    return this.aroundCallback(joinPoint);
  }
}
