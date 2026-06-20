import { AbstractBaseAspectAdvice } from "../../abstracts/AbstractBaseAspectAdvice.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";

export class BeforeAspectAdviceImpl extends AbstractBaseAspectAdvice {
  private static readonly ADVICE_NAME = "BeforeAspectAdvice";
  private static readonly ADVICE_VERSION = "1.0.0-BEFORE-ADVICE";

  private readonly beforeCallback: (joinPoint: IAspectJoinPoint) => void;

  constructor(beforeCallback: (joinPoint: IAspectJoinPoint) => void, order: number = 100) {
    super(BeforeAspectAdviceImpl.ADVICE_NAME, BeforeAspectAdviceImpl.ADVICE_VERSION, "BEFORE", order);
    this.beforeCallback = beforeCallback;
  }

  override invoke(joinPoint: IAspectJoinPoint): unknown {
    this.beforeCallback(joinPoint);
    return joinPoint.proceed();
  }
}
