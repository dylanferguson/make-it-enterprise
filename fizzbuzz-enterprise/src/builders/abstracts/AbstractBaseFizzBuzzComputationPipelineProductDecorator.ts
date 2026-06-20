import type { IFizzBuzzComputationPipelineProductDecorator } from "../contracts/IFizzBuzzComputationPipelineProductDecorator.js";
import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";

export abstract class AbstractBaseFizzBuzzComputationPipelineProductDecorator
  implements IFizzBuzzComputationPipelineProductDecorator
{
  protected abstract readonly decoratorName: string;
  protected abstract readonly decoratorVersion: string;
  protected abstract readonly decoratorPriority: number;

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }

  getDecoratorPriority(): number {
    return this.decoratorPriority;
  }

  abstract decorate(product: IFizzBuzzComputationPipelineProduct): IFizzBuzzComputationPipelineProduct;
}
