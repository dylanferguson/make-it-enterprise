import type { IFizzBuzzExpressionEvaluator } from "../../contracts/IFizzBuzzExpressionEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import type { IMessageTemplateCodecProvider } from "../../contracts/IMessageTemplateCodecProvider.js";
import { FizzBuzzRuleSetImpl } from "../rules/FizzBuzzRuleSetImpl.js";
import { FizzBuzzExpressionEvaluatorImpl } from "../rules/FizzBuzzExpressionEvaluatorImpl.js";
import { FizzBuzzRuleDefinitionImpl } from "../rules/FizzBuzzRuleDefinitionImpl.js";
import { DivisibleByExpressionImpl } from "../expressions/DivisibleByExpressionImpl.js";
import { AndExpressionImpl } from "../expressions/AndExpressionImpl.js";
import type { IFizzBuzzRuleSet } from "../../contracts/IFizzBuzzRuleSet.js";
import { MessageTemplateCodecProviderFactoryBeanFactory } from "./MessageTemplateCodecProviderFactoryBeanFactory.js";

export class FizzBuzzExpressionRuleSetFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzExpressionRuleSetFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "2.0.0-ENTERPRISE-CODEC-AWARE";
  private static instance: IFizzBuzzExpressionEvaluator | null = null;

  static createDefaultRuleSet(messageCodecProvider?: IMessageTemplateCodecProvider): IFizzBuzzRuleSet {
    const effectiveProvider = messageCodecProvider
      ?? MessageTemplateCodecProviderFactoryBeanFactory.createCodecProvider();
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
      effectiveProvider.getFizzBuzzTemplate(),
      100,
    );

    const fizzRule = new FizzBuzzRuleDefinitionImpl(
      "FizzRule",
      divisibleByThreeExpr,
      effectiveProvider.getFizzTemplate(),
      50,
    );

    const buzzRule = new FizzBuzzRuleDefinitionImpl(
      "BuzzRule",
      divisibleByFiveExpr,
      effectiveProvider.getBuzzTemplate(),
      25,
    );

    ruleSet.addRule(fizzBuzzRule);
    ruleSet.addRule(fizzRule);
    ruleSet.addRule(buzzRule);

    return ruleSet;
  }

  static createExpressionEvaluator(
    outputFormatter?: IFizzBuzzOutputFormatter,
    messageCodecProvider?: IMessageTemplateCodecProvider,
  ): IFizzBuzzExpressionEvaluator {
    const effectiveProvider = messageCodecProvider
      ?? MessageTemplateCodecProviderFactoryBeanFactory.createCodecProvider();
    const ruleSet = FizzBuzzExpressionRuleSetFactoryBeanFactory.createDefaultRuleSet(effectiveProvider);
    const evaluator = new FizzBuzzExpressionEvaluatorImpl(ruleSet, effectiveProvider);
    if (outputFormatter !== undefined) {
      evaluator.setOutputFormatter(outputFormatter);
    }
    return evaluator;
  }

  static createSingletonExpressionEvaluator(
    outputFormatter?: IFizzBuzzOutputFormatter,
    messageCodecProvider?: IMessageTemplateCodecProvider,
  ): IFizzBuzzExpressionEvaluator {
    if (FizzBuzzExpressionRuleSetFactoryBeanFactory.instance === null) {
      FizzBuzzExpressionRuleSetFactoryBeanFactory.instance =
        FizzBuzzExpressionRuleSetFactoryBeanFactory.createExpressionEvaluator(
          outputFormatter,
          messageCodecProvider,
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
