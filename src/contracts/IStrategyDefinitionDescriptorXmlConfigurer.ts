import type { IXmlParsedElement } from "./IXmlParsedElement.js";

export interface IStrategyDefinitionDescriptorXmlConfigurer {
  getConfigurerName(): string;
  getConfigurerVersion(): string;
  configureFromParsedDescriptor(descriptor: IXmlParsedElement): boolean;
  getConfiguredBeanIds(): readonly string[];
  getConfiguredBeanClass(beanId: string): string | null;
  getConfiguredProperty(beanId: string, propertyName: string): string | null;
}
