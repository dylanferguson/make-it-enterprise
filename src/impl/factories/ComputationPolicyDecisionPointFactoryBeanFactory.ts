import type { IComputationPolicyDecisionPoint } from "../../contracts/IComputationPolicyDecisionPoint.js";
import type { IComputationPolicy } from "../../contracts/IComputationPolicy.js";
import { FizzBuzzComputationPolicyDecisionPointImpl } from "../policies/FizzBuzzComputationPolicyDecisionPointImpl.js";
import { FizzBuzzConstraintValidationPolicyImpl } from "../policies/FizzBuzzConstraintValidationPolicyImpl.js";

export class ComputationPolicyDecisionPointFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationPolicyDecisionPointFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE";
  private static instance: IComputationPolicyDecisionPoint | null = null;

  static createDecisionPoint(
    maxComputationValue?: number,
    additionalPolicies?: IComputationPolicy[],
  ): IComputationPolicyDecisionPoint {
    const decisionPoint = new FizzBuzzComputationPolicyDecisionPointImpl();
    if (additionalPolicies !== undefined) {
      for (const policy of additionalPolicies) {
        decisionPoint.registerPolicy(policy);
      }
    }
    console.debug(
      `[${ComputationPolicyDecisionPointFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
      `Created decision point [${decisionPoint.getDecisionPointName()}] ` +
      `with [${decisionPoint.getRegisteredPolicies().length}] policies`,
    );
    return decisionPoint;
  }

  static createSingletonDecisionPoint(
    maxComputationValue?: number,
    additionalPolicies?: IComputationPolicy[],
  ): IComputationPolicyDecisionPoint {
    if (ComputationPolicyDecisionPointFactoryBeanFactory.instance === null) {
      ComputationPolicyDecisionPointFactoryBeanFactory.instance =
        ComputationPolicyDecisionPointFactoryBeanFactory.createDecisionPoint(
          maxComputationValue,
          additionalPolicies,
        );
    }
    return ComputationPolicyDecisionPointFactoryBeanFactory.instance!;
  }

  static resetDecisionPoint(): void {
    ComputationPolicyDecisionPointFactoryBeanFactory.instance = null;
  }

  static getFactoryBeanName(): string {
    return ComputationPolicyDecisionPointFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationPolicyDecisionPointFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
