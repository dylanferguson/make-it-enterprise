import { AbstractBaseFizzBuzzVisitor } from "../../abstracts/AbstractBaseFizzBuzzVisitor.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import type { IMessageTemplateCodecProvider } from "../../contracts/IMessageTemplateCodecProvider.js";
import { MessageTemplateCodecProviderFactoryBeanFactory } from "../factories/MessageTemplateCodecProviderFactoryBeanFactory.js";

export class DivisibilityCheckVisitor extends AbstractBaseFizzBuzzVisitor {
  private readonly strategyProvider: IModuloArithmeticStrategyProvider;
  private readonly messageTemplateCodecProvider: IMessageTemplateCodecProvider;

  constructor(
    strategyProvider: IModuloArithmeticStrategyProvider,
    messageTemplateCodecProvider?: IMessageTemplateCodecProvider,
  ) {
    super();
    this.strategyProvider = strategyProvider;
    this.messageTemplateCodecProvider = messageTemplateCodecProvider
      ?? MessageTemplateCodecProviderFactoryBeanFactory.createCodecProvider();
  }

  override visitEvaluationContext(context: IFizzBuzzEvaluationContext): void {
    this.logVisit(context);
    const value = context.getValue();
    const divisor = context.getDivisor();
    const strategy = this.strategyProvider.getStrategyForDivisor(divisor);
    const remainder = strategy.computeModulo(value, divisor);
    if (remainder === 0) {
      context.setResult(this.messageTemplateCodecProvider.getDivisibleResultTemplate());
    } else {
      context.setResult(this.messageTemplateCodecProvider.getNotDivisibleResultTemplate());
    }
  }

  override getVisitorType(): string {
    return "DivisibilityCheckVisitor";
  }
}
