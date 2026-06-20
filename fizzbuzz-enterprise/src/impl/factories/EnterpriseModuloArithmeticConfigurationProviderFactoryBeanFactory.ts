import type { IEnterpriseModuloArithmeticConfigurationProvider } from "../../contracts/IEnterpriseModuloArithmeticConfigurationProvider.js";
import { DefaultEnterpriseModuloArithmeticConfigurationProviderImpl } from "../providers/DefaultEnterpriseModuloArithmeticConfigurationProviderImpl.js";

export class EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CONFIG-PROVIDER-FACTORY";

  private static provider: IEnterpriseModuloArithmeticConfigurationProvider | null = null;
  private static providerProfile: string | null = null;

  static createConfigurationProvider(
    profile?: string,
  ): IEnterpriseModuloArithmeticConfigurationProvider {
    if (
      EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.provider === null ||
      (profile !== undefined &&
        EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.providerProfile !== profile)
    ) {
      EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.providerProfile =
        profile ?? "STANDARD";
      EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.provider =
        new DefaultEnterpriseModuloArithmeticConfigurationProviderImpl();
      console.debug(
        `[${EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Created configuration provider with profile: ${profile ?? "STANDARD"}`,
      );
    }
    return EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.provider;
  }

  static getConfigurationProvider(): IEnterpriseModuloArithmeticConfigurationProvider | null {
    return EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.provider;
  }

  static getFactoryBeanName(): string {
    return EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetConfigurationProvider(): void {
    EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.provider = null;
    EnterpriseModuloArithmeticConfigurationProviderFactoryBeanFactory.providerProfile = null;
  }
}
