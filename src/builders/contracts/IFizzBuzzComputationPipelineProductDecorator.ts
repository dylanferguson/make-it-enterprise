import type { IFizzBuzzComputationPipelineProduct } from "./IFizzBuzzComputationPipelineBuilder.js";

export interface IFizzBuzzComputationPipelineProductDecorator {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getDecoratorPriority(): number;
  decorate(product: IFizzBuzzComputationPipelineProduct): IFizzBuzzComputationPipelineProduct;
}
