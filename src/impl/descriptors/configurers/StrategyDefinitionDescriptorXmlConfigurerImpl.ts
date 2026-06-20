import type { IStrategyDefinitionDescriptorXmlConfigurer } from "../../../contracts/IStrategyDefinitionDescriptorXmlConfigurer.js";
import type { IXmlParsedElement } from "../../../contracts/IXmlParsedElement.js";

export class StrategyDefinitionDescriptorXmlConfigurerImpl implements IStrategyDefinitionDescriptorXmlConfigurer {
  private static readonly CONFIGURER_NAME = "StrategyDefinitionDescriptorXmlConfigurer";
  private static readonly CONFIGURER_VERSION = "1.0.0-STRATEGY-DEFINITION-CONFIGURER";

  private configured: boolean = false;
  private beanDefinitions: Map<string, { beanClass: string; properties: Map<string, string> }> = new Map();

  getConfigurerName(): string {
    return StrategyDefinitionDescriptorXmlConfigurerImpl.CONFIGURER_NAME;
  }

  getConfigurerVersion(): string {
    return StrategyDefinitionDescriptorXmlConfigurerImpl.CONFIGURER_VERSION;
  }

  configureFromParsedDescriptor(descriptor: IXmlParsedElement): boolean {
    if (this.configured) return true;

    const beans = descriptor.tagName === "beans" ? descriptor : descriptor.findChild("beans");
    if (!beans) return false;

    const beanElements = beans.findChildren("bean");
    for (const beanElement of beanElements) {
      const beanId = beanElement.getAttribute("id") ?? "";
      const beanClass = beanElement.getAttribute("class") ?? "";
      if (!beanId && !beanClass) continue;

      const id = beanId || beanClass;
      const properties = new Map<string, string>();

      const propertyElements = beanElement.findChildren("property");
      for (const prop of propertyElements) {
        const propName = prop.getAttribute("name") ?? "";
        const propValue = prop.getAttribute("value") ?? prop.textContent;
        if (propName) {
          properties.set(propName, propValue);
        }
      }

      this.beanDefinitions.set(id, { beanClass, properties });
    }

    this.configured = true;
    console.debug(
      `[${StrategyDefinitionDescriptorXmlConfigurerImpl.CONFIGURER_NAME}] Configured ${this.beanDefinitions.size} bean definition(s) from strategy definitions XML`,
    );
    return true;
  }

  getConfiguredBeanIds(): readonly string[] {
    return Array.from(this.beanDefinitions.keys());
  }

  getConfiguredBeanClass(beanId: string): string | null {
    return this.beanDefinitions.get(beanId)?.beanClass ?? null;
  }

  getConfiguredProperty(beanId: string, propertyName: string): string | null {
    return this.beanDefinitions.get(beanId)?.properties.get(propertyName) ?? null;
  }
}
