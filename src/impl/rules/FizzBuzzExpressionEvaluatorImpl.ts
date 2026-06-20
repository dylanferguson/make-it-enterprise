import { AbstractBaseFizzBuzzExpressionEvaluator } from "../../abstracts/AbstractBaseFizzBuzzExpressionEvaluator.js";
import type { IFizzBuzzRuleSet } from "../../contracts/IFizzBuzzRuleSet.js";

export class FizzBuzzExpressionEvaluatorImpl extends AbstractBaseFizzBuzzExpressionEvaluator {
  private static readonly EVALUATOR_NAME = "FizzBuzzExpressionEvaluator";
  private static readonly EVALUATOR_VERSION = "1.0.0-ENTERPRISE";

  constructor(ruleSet: IFizzBuzzRuleSet) {
    super(ruleSet);
  }

  override getEvaluatorName(): string {
    return FizzBuzzExpressionEvaluatorImpl.EVALUATOR_NAME;
  }

  override getEvaluatorVersion(): string {
    return FizzBuzzExpressionEvaluatorImpl.EVALUATOR_VERSION;
  }

  override evaluate(value: number): string | null {
    this.ensureInitialized();
    const applicableRule = this.ruleSet.getApplicableRule(value);
    if (applicableRule !== null) {
      return this.formatRuleOutput(applicableRule);
    }
    return null;
  }
}

