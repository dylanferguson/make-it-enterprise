import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "./IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";

export interface IEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator
  extends IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler {
  getDecoratedHandler(): IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
}
