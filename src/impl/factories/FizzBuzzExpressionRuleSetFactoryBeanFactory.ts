import type { IFizzBuzzExpressionEvaluator } from "../../contracts/IFizzBuzzExpressionEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import { FizzBuzzRuleSetImpl } from "../rules/FizzBuzzRuleSetImpl.js";
import { FizzBuzzExpressionEvaluatorImpl } from "../rules/FizzBuzzExpressionEvaluatorImpl.js";
import { FizzBuzzRuleDefinitionImpl } from "../rules/FizzBuzzRuleDefinitionImpl.js";
import { DivisibleByExpressionImpl } from "../expressions/DivisibleByExpressionImpl.js";
import { AndExpressionImpl } from "../expressions/AndExpressionImpl.js";
import type { IFizzBuzzRuleSet } from "../../contracts/IFizzBuzzRuleSet.js";

export class FizzBuzzExpressionRuleSetFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzExpressionRuleSetFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE";
  private static instance: IFizzBuzzExpressionEvaluator | null = null;

  static createDefaultRuleSet(): IFizzBuzzRuleSet {
    const ruleSet = new FizzBuzzRuleSetImpl();

    const divisibleByThreeExpr = new DivisibleByExpressionImpl(3);
    const divisibleByFiveExpr = new DivisibleByExpressionImpl(5);
    const divisibleByFifteenExpr = new AndExpressionImpl(
      divisibleByThreeExpr,
      divisibleByFiveExpr,
    );

    const fizzBuzzRule = new FizzBuzzRuleDefinitionImpl(
      "FizzBuzzRule",
      divisibleByFifteenExpr,
      "FizzBuzz",
      100,
    );

    const fizzRule = new FizzBuzzRuleDefinitionImpl(
      "FizzRule",
      divisibleByThreeExpr,
      "Fizz",
      50,
    );

    const buzzRule = new FizzBuzzRuleDefinitionImpl(
      "BuzzRule",
      divisibleByFiveExpr,
      "Buzz",
      25,
    );

    ruleSet.addRule(fizzBuzzRule);
    ruleSet.addRule(fizzRule);
    ruleSet.addRule(buzzRule);

    return ruleSet;
  }

  static createExpressionEvaluator(
    outputFormatter?: IFizzBuzzOutputFormatter,
  ): IFizzBuzzExpressionEvaluator {
    const ruleSet = FizzBuzzExpressionRuleSetFactoryBeanFactory.createDefaultRuleSet();
    const evaluator = new FizzBuzzExpressionEvaluatorImpl(ruleSet);
    if (outputFormatter !== undefined) {
      evaluator.setOutputFormatter(outputFormatter);
    }
    return evaluator;
  }

  static createSingletonExpressionEvaluator(
    outputFormatter?: IFizzBuzzOutputFormatter,
  ): IFizzBuzzExpressionEvaluator {
    if (FizzBuzzExpressionRuleSetFactoryBeanFactory.instance === null) {
      FizzBuzzExpressionRuleSetFactoryBeanFactory.instance =
        FizzBuzzExpressionRuleSetFactoryBeanFactory.createExpressionEvaluator(
          outputFormatter,
        );
    }
    return FizzBuzzExpressionRuleSetFactoryBeanFactory.instance;
  }

  static resetInstance(): void {
    FizzBuzzExpressionRuleSetFactoryBeanFactory.instance = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzExpressionRuleSetFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzExpressionRuleSetFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

