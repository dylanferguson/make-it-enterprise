import type { IFizzBuzzRuleSet } from "../contracts/IFizzBuzzRuleSet.js";
import type { IFizzBuzzOutputFormatter } from "../contracts/IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzExpressionEvaluator } from "../contracts/IFizzBuzzExpressionEvaluator.js";
import type { IFizzBuzzRuleDefinition } from "../contracts/IFizzBuzzRuleDefinition.js";
import type { IMessageTemplateCodecProvider } from "../contracts/IMessageTemplateCodecProvider.js";
import { MessageTemplateCodecProviderFactoryBeanFactory } from "../impl/factories/MessageTemplateCodecProviderFactoryBeanFactory.js";

export abstract class AbstractBaseFizzBuzzExpressionEvaluator implements IFizzBuzzExpressionEvaluator {
  protected readonly ruleSet: IFizzBuzzRuleSet;
  protected outputFormatter: IFizzBuzzOutputFormatter | null = null;
  protected readonly messageTemplateCodecProvider: IMessageTemplateCodecProvider;
  private initialized: boolean = false;

  constructor(ruleSet: IFizzBuzzRuleSet, messageTemplateCodecProvider?: IMessageTemplateCodecProvider) {
    this.ruleSet = ruleSet;
    this.messageTemplateCodecProvider = messageTemplateCodecProvider
      ?? MessageTemplateCodecProviderFactoryBeanFactory.createCodecProvider();
  }

  abstract getEvaluatorName(): string;
  abstract getEvaluatorVersion(): string;

  getRuleSet(): IFizzBuzzRuleSet {
    return this.ruleSet;
  }

  setOutputFormatter(formatter: IFizzBuzzOutputFormatter): void {
    this.outputFormatter = formatter;
  }

  abstract evaluate(value: number): string | null;

  protected ensureInitialized(): void {
    if (!this.initialized) {
      this.onInitialize();
      this.initialized = true;
    }
  }

  protected onInitialize(): void {
  }

  protected evaluateRule(value: number, rule: IFizzBuzzRuleDefinition): boolean {
    return rule.getExpression().interpret(value);
  }

  protected formatRuleOutput(rule: IFizzBuzzRuleDefinition): string {
    if (this.outputFormatter !== null) {
      const label = rule.getOutputLabel();
      const expectedFizz = this.messageTemplateCodecProvider.getFizzTemplate();
      const expectedBuzz = this.messageTemplateCodecProvider.getBuzzTemplate();
      const expectedFizzBuzz = this.messageTemplateCodecProvider.getFizzBuzzTemplate();
      if (label === expectedFizzBuzz) {
        return this.outputFormatter.formatFizzBuzz();
      }
      if (label === expectedFizz) {
        return this.outputFormatter.formatFizz();
      }
      if (label === expectedBuzz) {
        return this.outputFormatter.formatBuzz();
      }
    }
    return rule.getOutputLabel();
  }
}
