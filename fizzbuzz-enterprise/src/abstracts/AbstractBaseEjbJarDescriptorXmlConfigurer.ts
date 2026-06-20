import type { IEjbJarDescriptorXmlConfigurer } from "../contracts/IEjbJarDescriptorXmlConfigurer.js";
import type { IStrategyDefinitionDescriptorXmlConfigurer } from "../contracts/IStrategyDefinitionDescriptorXmlConfigurer.js";

export abstract class AbstractBaseEjbJarDescriptorXmlConfigurer
  implements IEjbJarDescriptorXmlConfigurer
{
  private readonly configurerName: string;
  private readonly configurerVersion: string;

  constructor(configurerName: string, configurerVersion: string) {
    this.configurerName = configurerName;
    this.configurerVersion = configurerVersion;
  }

  getConfigurerName(): string {
    return this.configurerName;
  }

  getConfigurerVersion(): string {
    return this.configurerVersion;
  }

  abstract configureFromParsedDescriptor(
    descriptor: import("../contracts/IXmlParsedElement.js").IXmlParsedElement,
  ): boolean;
  abstract getConfiguredEntityBeanNames(): readonly string[];
  abstract getConfiguredFinderMethods(beanName: string): readonly string[];
  abstract getConfiguredCmpFields(beanName: string): readonly string[];
}
