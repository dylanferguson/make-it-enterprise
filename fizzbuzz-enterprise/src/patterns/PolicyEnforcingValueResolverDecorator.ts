import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import type { IComputationPolicyDecisionPoint } from "../contracts/IComputationPolicyDecisionPoint.js";
import { ComputationPolicyViolationException } from "../exceptions/ComputationPolicyViolationException.js";

export class PolicyEnforcingValueResolverDecorator implements ICompositeValueResolver {
  private static readonly DECORATOR_NAME = "PolicyEnforcingValueResolverDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-ENTERPRISE";
  private readonly decorated: ICompositeValueResolver;
  private readonly decisionPoint: IComputationPolicyDecisionPoint;
  private enforcementCount: number = 0;
  private denialCount: number = 0;

  constructor(
    decorated: ICompositeValueResolver,
    decisionPoint: IComputationPolicyDecisionPoint,
  ) {
    this.decorated = decorated;
    this.decisionPoint = decisionPoint;
  }

  resolve(value: number): string {
    this.enforcementCount++;
    const decision = this.decisionPoint.evaluate(value);
    if (!decision.isAllowed()) {
      this.denialCount++;
      console.debug(
        `[${PolicyEnforcingValueResolverDecorator.DECORATOR_NAME}] ` +
        `Computation denied for value [${value}]: ${decision.getDecisionCode()} — ${decision.getDecisionMessage()}`,
      );
      throw new ComputationPolicyViolationException(
        "PolicyEnforcingValueResolverDecorator",
        value,
        `FizzBuzz computation rejected by decision point: ${decision.getDecisionMessage()}`,
      );
    }
    console.debug(
      `[${PolicyEnforcingValueResolverDecorator.DECORATOR_NAME}] ` +
      `Computation allowed for value [${value}]: ${decision.getDecisionCode()} — ${decision.getDecisionMessage()}`,
    );
    return this.decorated.resolve(value);
  }

  getEnforcementCount(): number {
    return this.enforcementCount;
  }

  getDenialCount(): number {
    return this.denialCount;
  }

  getDecoratorName(): string {
    return PolicyEnforcingValueResolverDecorator.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return PolicyEnforcingValueResolverDecorator.DECORATOR_VERSION;
  }

  getDecisionPoint(): IComputationPolicyDecisionPoint {
    return this.decisionPoint;
  }
}
