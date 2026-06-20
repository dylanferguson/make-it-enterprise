import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator } from "../contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator.js";
import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "../contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";

export abstract class AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator
  implements IEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator
{
  protected readonly decoratedHandler: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler;

  constructor(decoratedHandler: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler) {
    this.decoratedHandler = decoratedHandler;
  }

  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  getDecoratedHandler(): IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler {
    return this.decoratedHandler;
  }

  getTemplateMethodName(): string {
    return this.decoratedHandler.getTemplateMethodName();
  }

  getTemplateMethodVersion(): string {
    return this.decoratedHandler.getTemplateMethodVersion();
  }

  getTemplateMethodDescriptor(): string {
    return this.decoratedHandler.getTemplateMethodDescriptor();
  }

  executeTemplateResolution(
    value: number,
    innerResolver: (value: number) => string,
    templateContext: string | null,
  ): string {
    return this.doExecuteDecorated(value, innerResolver, templateContext);
  }

  protected abstract doExecuteDecorated(
    value: number,
    innerResolver: (value: number) => string,
    templateContext: string | null,
  ): string;
}
