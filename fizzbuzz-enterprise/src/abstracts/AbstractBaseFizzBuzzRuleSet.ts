import type { IFizzBuzzRuleDefinition } from "../contracts/IFizzBuzzRuleDefinition.js";
import type { IFizzBuzzRuleSet } from "../contracts/IFizzBuzzRuleSet.js";

export abstract class AbstractBaseFizzBuzzRuleSet implements IFizzBuzzRuleSet {
  protected readonly rules: IFizzBuzzRuleDefinition[] = [];

  abstract getRuleSetName(): string;
  abstract getRuleSetVersion(): string;

  addRule(rule: IFizzBuzzRuleDefinition): void {
    this.rules.push(rule);
  }

  removeRule(ruleName: string): boolean {
    const index = this.rules.findIndex(r => r.getRuleName() === ruleName);
    if (index !== -1) {
      this.rules.splice(index, 1);
      return true;
    }
    return false;
  }

  getApplicableRule(value: number): IFizzBuzzRuleDefinition | null {
    const sorted = [...this.rules]
      .filter(r => r.isEnabled())
      .sort((a, b) => b.getRulePriority() - a.getRulePriority());

    for (const rule of sorted) {
      if (rule.getExpression().interpret(value)) {
        return rule;
      }
    }
    return null;
  }

  getAllRules(): readonly IFizzBuzzRuleDefinition[] {
    return [...this.rules];
  }

  getRuleCount(): number {
    return this.rules.length;
  }

  clear(): void {
    this.rules.length = 0;
  }
}

