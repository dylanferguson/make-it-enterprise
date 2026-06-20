import { FizzBuzzCommandPostProcessorChainImpl } from "../postprocessors/FizzBuzzCommandPostProcessorChainImpl.js";
import { FizzBuzzCommandValidationPostProcessorImpl } from "../postprocessors/FizzBuzzCommandValidationPostProcessorImpl.js";
import { FizzBuzzCommandAuditPostProcessorImpl } from "../postprocessors/FizzBuzzCommandAuditPostProcessorImpl.js";
import { StandardFizzBuzzComputationTemplateImpl } from "../templates/StandardFizzBuzzComputationTemplateImpl.js";
import type { IFizzBuzzComputationTemplate } from "../../contracts/IFizzBuzzComputationTemplate.js";
import type { IFizzBuzzCommandPostProcessorChain } from "../../contracts/IFizzBuzzCommandPostProcessorChain.js";

export class FizzBuzzComputationTemplateFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzComputationTemplateFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN";

  private static instance: IFizzBuzzComputationTemplate | null = null;
  private static postProcessorChain: IFizzBuzzCommandPostProcessorChain | null = null;

  static createTemplate(): IFizzBuzzComputationTemplate {
    if (FizzBuzzComputationTemplateFactoryBean.instance === null) {
      const chain = FizzBuzzComputationTemplateFactoryBean.createPostProcessorChain();
      chain.addPostProcessor(new FizzBuzzCommandValidationPostProcessorImpl());
      chain.addPostProcessor(new FizzBuzzCommandAuditPostProcessorImpl());

      FizzBuzzComputationTemplateFactoryBean.postProcessorChain = chain;
      FizzBuzzComputationTemplateFactoryBean.instance =
        new StandardFizzBuzzComputationTemplateImpl(chain);
    }
    return FizzBuzzComputationTemplateFactoryBean.instance;
  }

  private static createPostProcessorChain(): IFizzBuzzCommandPostProcessorChain {
    return new FizzBuzzCommandPostProcessorChainImpl();
  }

  static getPostProcessorChain(): IFizzBuzzCommandPostProcessorChain | null {
    return FizzBuzzComputationTemplateFactoryBean.postProcessorChain;
  }

  static resetTemplate(): void {
    FizzBuzzComputationTemplateFactoryBean.instance = null;
    FizzBuzzComputationTemplateFactoryBean.postProcessorChain = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzComputationTemplateFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzComputationTemplateFactoryBean.FACTORY_BEAN_VERSION;
  }
}
