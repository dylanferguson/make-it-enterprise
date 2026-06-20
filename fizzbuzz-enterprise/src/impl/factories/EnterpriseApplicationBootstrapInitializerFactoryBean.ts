import type { IEnterpriseApplicationBootstrapInitializer } from "../../contracts/IEnterpriseApplicationBootstrapInitializer.js";
import { EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl } from "../initializers/EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl.js";

export class EnterpriseApplicationBootstrapInitializerFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseApplicationBootstrapInitializerFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-BOOTSTRAP-FACTORY-BEAN";

  private static instance: IEnterpriseApplicationBootstrapInitializer | null = null;
  private static autoInitialize: boolean = true;

  static createBootstrapInitializer(
    autoInitialize: boolean = true,
  ): IEnterpriseApplicationBootstrapInitializer {
    if (EnterpriseApplicationBootstrapInitializerFactoryBean.instance === null) {
      console.debug(
        `[${EnterpriseApplicationBootstrapInitializerFactoryBean.FACTORY_BEAN_NAME} v${EnterpriseApplicationBootstrapInitializerFactoryBean.FACTORY_BEAN_VERSION}] Creating bootstrap initializer (autoInitialize=${autoInitialize})`,
      );
      EnterpriseApplicationBootstrapInitializerFactoryBean.autoInitialize = autoInitialize;
      const initializer =
        new EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl();
      if (autoInitialize) {
        initializer.initializeApplicationContext();
      }
      EnterpriseApplicationBootstrapInitializerFactoryBean.instance = initializer;
    }
    return EnterpriseApplicationBootstrapInitializerFactoryBean.instance;
  }

  static getBootstrapInitializer(): IEnterpriseApplicationBootstrapInitializer | null {
    return EnterpriseApplicationBootstrapInitializerFactoryBean.instance;
  }

  static resetBootstrapInitializer(): void {
    if (EnterpriseApplicationBootstrapInitializerFactoryBean.instance !== null) {
      if (EnterpriseApplicationBootstrapInitializerFactoryBean.instance.isContextInitialized()) {
        EnterpriseApplicationBootstrapInitializerFactoryBean.instance.destroyApplicationContext();
      }
      EnterpriseApplicationBootstrapInitializerFactoryBean.instance = null;
    }
  }

  static isInitialized(): boolean {
    return (
      EnterpriseApplicationBootstrapInitializerFactoryBean.instance !== null &&
      EnterpriseApplicationBootstrapInitializerFactoryBean.instance.isContextInitialized()
    );
  }

  static getFactoryBeanName(): string {
    return EnterpriseApplicationBootstrapInitializerFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseApplicationBootstrapInitializerFactoryBean.FACTORY_BEAN_VERSION;
  }
}
