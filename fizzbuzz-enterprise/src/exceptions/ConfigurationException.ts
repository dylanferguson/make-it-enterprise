import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class ConfigurationException extends FizzBuzzEnterpriseException {
  private readonly componentName: string;

  constructor(componentName: string, message: string, cause: Error | null = null) {
    super(message, "FIZZBUZZ-1002", cause);
    this.name = "ConfigurationException";
    this.componentName = componentName;
  }

  getComponentName(): string {
    return this.componentName;
  }
}
