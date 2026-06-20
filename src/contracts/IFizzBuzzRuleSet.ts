import type { IFizzBuzzRuleDefinition } from "./IFizzBuzzRuleDefinition.js";

export interface IFizzBuzzRuleSet {
  addRule(rule: IFizzBuzzRuleDefinition): void;
  removeRule(ruleName: string): boolean;
  getApplicableRule(value: number): IFizzBuzzRuleDefinition | null;
  getAllRules(): readonly IFizzBuzzRuleDefinition[];
  getRuleSetName(): string;
  getRuleSetVersion(): string;
  getRuleCount(): number;
  clear(): void;
}

