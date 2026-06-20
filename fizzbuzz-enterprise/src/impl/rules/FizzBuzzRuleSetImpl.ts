import { AbstractBaseFizzBuzzRuleSet } from "../../abstracts/AbstractBaseFizzBuzzRuleSet.js";

export class FizzBuzzRuleSetImpl extends AbstractBaseFizzBuzzRuleSet {
  private static readonly RULESET_NAME = "FizzBuzzRuleSet";
  private static readonly RULESET_VERSION = "1.0.0-ENTERPRISE";

  override getRuleSetName(): string {
    return FizzBuzzRuleSetImpl.RULESET_NAME;
  }

  override getRuleSetVersion(): string {
    return FizzBuzzRuleSetImpl.RULESET_VERSION;
  }
}

