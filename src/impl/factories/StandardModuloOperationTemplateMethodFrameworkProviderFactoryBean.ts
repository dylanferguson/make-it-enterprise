import { AbstractBaseModuloOperationTemplateMethodFrameworkProvider } from "../../abstracts/AbstractBaseModuloOperationTemplateMethodFrameworkProvider.js";
import { StandardModuloOperationTemplateMethodFrameworkProviderImpl } from "../frameworks/StandardModuloOperationTemplateMethodFrameworkProviderImpl.js";

export class StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE";
  private static instance: AbstractBaseModuloOperationTemplateMethodFrameworkProvider | null = null;

  static createFrameworkProvider(): AbstractBaseModuloOperationTemplateMethodFrameworkProvider {
    if (StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.instance === null) {
      StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.instance =
        new StandardModuloOperationTemplateMethodFrameworkProviderImpl();
      console.debug(
        `[${StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.FACTORY_BEAN_NAME}] Framework provider instantiated`,
      );
    }
    return StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.instance!;
  }

  static getFactoryBeanName(): string {
    return StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.FACTORY_BEAN_VERSION;
  }

  static resetInstance(): void {
    StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.instance = null;
  }
}
