import { AbstractBaseCommand } from "../../abstracts/AbstractBaseCommand.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IMessageTemplateCodecProvider } from "../../contracts/IMessageTemplateCodecProvider.js";
import { MessageTemplateCodecProviderFactoryBeanFactory } from "../factories/MessageTemplateCodecProviderFactoryBeanFactory.js";

export class DivisibilityEvaluationCommand extends AbstractBaseCommand<IFizzBuzzEvaluationContext, boolean> {
  private readonly visitor: IFizzBuzzVisitor;
  private readonly divisor: number;
  private readonly messageTemplateCodecProvider: IMessageTemplateCodecProvider;

  constructor(
    visitor: IFizzBuzzVisitor,
    divisor: number,
    messageTemplateCodecProvider?: IMessageTemplateCodecProvider,
  ) {
    super();
    this.visitor = visitor;
    this.divisor = divisor;
    this.messageTemplateCodecProvider = messageTemplateCodecProvider
      ?? MessageTemplateCodecProviderFactoryBeanFactory.createCodecProvider();
  }

  override execute(context: IFizzBuzzEvaluationContext): boolean {
    this.logExecution(context);
    const clonedContext = context.clone();
    clonedContext.setDivisor(this.divisor);
    clonedContext.accept(this.visitor);
    return clonedContext.getResult() === this.messageTemplateCodecProvider.getDivisibleResultTemplate();
  }

  override getCommandName(): string {
    return `DivisibilityEvaluationCommand[divisor=${this.divisor}]`;
  }

  override canExecute(context: IFizzBuzzEvaluationContext): boolean {
    return context.getValue() >= 0 && this.divisor > 0;
  }
}
