import { AbstractBaseEnterpriseMessagePropertyConfigurationSource } from "../../abstracts/AbstractBaseEnterpriseMessagePropertyConfigurationSource.js";

const DEFAULT_PROPERTIES: Record<string, string> = {
  "message.template.codec.fizz": "Fizz",
  "message.template.codec.buzz": "Buzz",
  "message.template.codec.fizzbuzz": "FizzBuzz",
  "message.template.codec.divisible.result": "DIVISIBLE",
  "message.template.codec.not.divisible.result": "NOT_DIVISIBLE",
};

export class StaticDefaultMessagePropertyConfigurationSourceImpl extends AbstractBaseEnterpriseMessagePropertyConfigurationSource {
  protected override readonly sourceName = "StaticDefaultMessagePropertyConfigurationSource";
  protected override readonly sourcePriority = 25;

  override getPropertyValue(propertyKey: string): string | null {
    const value = DEFAULT_PROPERTIES[propertyKey];
    return value !== undefined ? value : null;
  }
}
