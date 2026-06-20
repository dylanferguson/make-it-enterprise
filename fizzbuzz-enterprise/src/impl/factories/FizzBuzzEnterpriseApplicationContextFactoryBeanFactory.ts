import type { IFizzBuzzEnterpriseApplicationContext } from "../../contracts/IFizzBuzzEnterpriseApplicationContext.js";
import { FizzBuzzEnterpriseApplicationContextImpl } from "../context/FizzBuzzEnterpriseApplicationContextImpl.js";

export const FizzBuzzEnterpriseApplicationContextConfigurationProfile = {
  STANDARD: "STANDARD",
  EAGER_INITIALIZATION: "EAGER_INITIALIZATION",
  LAZY_INITIALIZATION: "LAZY_INITIALIZATION",
  STRICT_DESCRIPTOR_VALIDATION: "STRICT_DESCRIPTOR_VALIDATION",
} as const;

export type FizzBuzzEnterpriseApplicationContextConfigurationProfile =
  (typeof FizzBuzzEnterpriseApplicationContextConfigurationProfile)[keyof typeof FizzBuzzEnterpriseApplicationContextConfigurationProfile];

export class FizzBuzzEnterpriseApplicationContextFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzEnterpriseApplicationContextFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CONTEXT-FACTORY-BEAN";

  private static instance: IFizzBuzzEnterpriseApplicationContext | null = null;
  private static currentProfile: FizzBuzzEnterpriseApplicationContextConfigurationProfile = "STANDARD";

  static createApplicationContext(
    profile: FizzBuzzEnterpriseApplicationContextConfigurationProfile = "STANDARD",
  ): IFizzBuzzEnterpriseApplicationContext {
    if (
      FizzBuzzEnterpriseApplicationContextFactoryBean.instance === null ||
      FizzBuzzEnterpriseApplicationContextFactoryBean.currentProfile !== profile
    ) {
      console.debug(
        `[${FizzBuzzEnterpriseApplicationContextFactoryBean.FACTORY_BEAN_NAME} v${FizzBuzzEnterpriseApplicationContextFactoryBean.FACTORY_BEAN_VERSION}] Creating application context with profile: ${profile}`,
      );
      const context = new FizzBuzzEnterpriseApplicationContextImpl();
      if (profile === "EAGER_INITIALIZATION" || profile === "STANDARD") {
        context.initialize();
      }
      FizzBuzzEnterpriseApplicationContextFactoryBean.instance = context;
      FizzBuzzEnterpriseApplicationContextFactoryBean.currentProfile = profile;
    }
    return FizzBuzzEnterpriseApplicationContextFactoryBean.instance;
  }

  static getApplicationContext(): IFizzBuzzEnterpriseApplicationContext | null {
    return FizzBuzzEnterpriseApplicationContextFactoryBean.instance;
  }

  static resetApplicationContext(): void {
    if (FizzBuzzEnterpriseApplicationContextFactoryBean.instance !== null) {
      if (FizzBuzzEnterpriseApplicationContextFactoryBean.instance.isInitialized()) {
        FizzBuzzEnterpriseApplicationContextFactoryBean.instance.destroy();
      }
      FizzBuzzEnterpriseApplicationContextFactoryBean.instance = null;
    }
    FizzBuzzEnterpriseApplicationContextFactoryBean.currentProfile = "STANDARD";
  }

  static getCurrentProfile(): FizzBuzzEnterpriseApplicationContextConfigurationProfile {
    return FizzBuzzEnterpriseApplicationContextFactoryBean.currentProfile;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzEnterpriseApplicationContextFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzEnterpriseApplicationContextFactoryBean.FACTORY_BEAN_VERSION;
  }

  static isContextInitialized(): boolean {
    return (
      FizzBuzzEnterpriseApplicationContextFactoryBean.instance !== null &&
      FizzBuzzEnterpriseApplicationContextFactoryBean.instance.isInitialized()
    );
  }
}
