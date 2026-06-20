import { AbstractBaseAspectAdvice } from "../../abstracts/AbstractBaseAspectAdvice.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";

export class AfterAspectAdviceImpl extends AbstractBaseAspectAdvice {
  private static readonly ADVICE_NAME = "AfterAspectAdvice";
  private static readonly ADVICE_VERSION = "1.0.0-AFTER-ADVICE";

  private readonly afterCallback: (joinPoint: IAspectJoinPoint, result: unknown) => void;

  constructor(afterCallback: (joinPoint: IAspectJoinPoint, result: unknown) => void, order: number = 200) {
    super(AfterAspectAdviceImpl.ADVICE_NAME, AfterAspectAdviceImpl.ADVICE_VERSION, "AFTER", order);
    this.afterCallback = afterCallback;
  }

  override invoke(joinPoint: IAspectJoinPoint): unknown {
    const result = joinPoint.proceed();
    this.afterCallback(joinPoint, result);
    return result;
  }
}
