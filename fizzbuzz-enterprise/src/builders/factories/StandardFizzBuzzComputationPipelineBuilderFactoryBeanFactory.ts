import { StandardFizzBuzzComputationPipelineBuilderImpl } from "../impl/StandardFizzBuzzComputationPipelineBuilderImpl.js";
import type { IFizzBuzzComputationPipelineBuilder, IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";

const FACTORY_BEAN_FACTORY_NAME = "StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-BUILDER-FACTORY-BEAN-FACTORY";

let singletonBuilder: IFizzBuzzComputationPipelineBuilder | null = null;
let singletonProduct: IFizzBuzzComputationPipelineProduct | null = null;

export class StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory {
  static createBuilder(singleton: boolean = false): IFizzBuzzComputationPipelineBuilder {
    const builder = new StandardFizzBuzzComputationPipelineBuilderImpl();
    if (singleton) {
      singletonBuilder = builder;
    }
    console.debug(
      `[${FACTORY_BEAN_FACTORY_NAME}] Created builder (singleton=${singleton}, ` +
      `name=${builder.getBuilderName()} v${builder.getBuilderVersion()})`,
    );
    return builder;
  }

  static buildProduct(builder: IFizzBuzzComputationPipelineBuilder): IFizzBuzzComputationPipelineProduct {
    const product = builder.build();
    singletonProduct = product;
    console.debug(
      `[${FACTORY_BEAN_FACTORY_NAME}] Built pipeline product: ` +
      `name=${product.getProductName()} v${product.getProductVersion()}, ` +
      `profile=${product.getPipelineConfigurationProfile()}`,
    );
    return product;
  }

  static getSingletonBuilder(): IFizzBuzzComputationPipelineBuilder | null {
    return singletonBuilder;
  }

  static getSingletonProduct(): IFizzBuzzComputationPipelineProduct | null {
    return singletonProduct;
  }

  static reset(): void {
    singletonBuilder = null;
    singletonProduct = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
