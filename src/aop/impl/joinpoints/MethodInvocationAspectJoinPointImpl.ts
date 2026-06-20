import { AbstractBaseAspectJoinPoint } from "../../abstracts/AbstractBaseAspectJoinPoint.js";
import type { IAspectAdvice } from "../../contracts/IAspectAdvice.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";

export class MethodInvocationAspectJoinPointImpl extends AbstractBaseAspectJoinPoint {
  private static readonly JOIN_POINT_NAME = "MethodInvocationAspectJoinPoint";
  private static readonly JOIN_POINT_VERSION = "1.0.0-METHOD-INVOCATION-JOIN-POINT";

  private readonly proxiedMethod: (...args: unknown[]) => unknown;

  constructor(
    target: object,
    methodName: string,
    args: readonly unknown[],
    proxiedMethod: (...args: unknown[]) => unknown,
  ) {
    super(
      `${MethodInvocationAspectJoinPointImpl.JOIN_POINT_NAME}::${methodName}`,
      MethodInvocationAspectJoinPointImpl.JOIN_POINT_VERSION,
      target,
      methodName,
      args,
    );
    this.proxiedMethod = proxiedMethod;
  }

  override proceed(): unknown {
    const chain = this.getAdviceChain();
    const currentIndex = this.getCurrentAdviceIndex();

    if (currentIndex < chain.length) {
      const advice = chain[currentIndex];
      if (advice === undefined) {
        throw new Error(`[${this.getJoinPointName()}] Advice at index [${currentIndex}] is undefined`);
      }
      this.setCurrentAdviceIndex(currentIndex + 1);
      return advice.invoke(this);
    }

    return this.proxiedMethod(...this.getArguments());
  }

  override proceedWithArgs(args: readonly unknown[]): unknown {
    const chain = this.getAdviceChain();
    const currentIndex = this.getCurrentAdviceIndex();

    if (currentIndex < chain.length) {
      const advice = chain[currentIndex];
      if (advice === undefined) {
        throw new Error(`[${this.getJoinPointName()}] Advice at index [${currentIndex}] is undefined`);
      }
      this.setCurrentAdviceIndex(currentIndex + 1);
      return advice.invoke(this);
    }

    return this.proxiedMethod(...args);
  }
}
