import type { IFizzBuzzRuleSet } from "../contracts/IFizzBuzzRuleSet.js";
import type { IFizzBuzzOutputFormatter } from "../contracts/IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzExpressionEvaluator } from "../contracts/IFizzBuzzExpressionEvaluator.js";
import type { IFizzBuzzRuleDefinition } from "../contracts/IFizzBuzzRuleDefinition.js";

export abstract class AbstractBaseFizzBuzzExpressionEvaluator implements IFizzBuzzExpressionEvaluator {
  protected readonly ruleSet: IFizzBuzzRuleSet;
  protected outputFormatter: IFizzBuzzOutputFormatter | null = null;
  private initialized: boolean = false;

  constructor(ruleSet: IFizzBuzzRuleSet) {
    this.ruleSet = ruleSet;
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
      if (label === "FizzBuzz") {
        return this.outputFormatter.formatFizzBuzz();
      }
      if (label === "Fizz") {
        return this.outputFormatter.formatFizz();
      }
      if (label === "Buzz") {
        return this.outputFormatter.formatBuzz();
      }
    }
    return rule.getOutputLabel();
  }
}

