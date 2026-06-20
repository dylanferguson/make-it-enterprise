import type { IXmlParsedElement } from "./IXmlParsedElement.js";

export interface IEjbJarDescriptorXmlConfigurer {
  getConfigurerName(): string;
  getConfigurerVersion(): string;
  configureFromParsedDescriptor(descriptor: IXmlParsedElement): boolean;
  getConfiguredEntityBeanNames(): readonly string[];
  getConfiguredFinderMethods(beanName: string): readonly string[];
  getConfiguredCmpFields(beanName: string): readonly string[];
}
