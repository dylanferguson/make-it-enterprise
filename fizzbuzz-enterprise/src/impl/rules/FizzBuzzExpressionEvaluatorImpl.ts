import { AbstractBaseFizzBuzzExpressionEvaluator } from "../../abstracts/AbstractBaseFizzBuzzExpressionEvaluator.js";
import type { IFizzBuzzRuleSet } from "../../contracts/IFizzBuzzRuleSet.js";
import type { IMessageTemplateCodecProvider } from "../../contracts/IMessageTemplateCodecProvider.js";

export class FizzBuzzExpressionEvaluatorImpl extends AbstractBaseFizzBuzzExpressionEvaluator {
  private static readonly EVALUATOR_NAME = "FizzBuzzExpressionEvaluator";
  private static readonly EVALUATOR_VERSION = "2.0.0-ENTERPRISE-CODEC-AWARE";

  constructor(ruleSet: IFizzBuzzRuleSet, messageTemplateCodecProvider?: IMessageTemplateCodecProvider) {
    super(ruleSet, messageTemplateCodecProvider);
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
