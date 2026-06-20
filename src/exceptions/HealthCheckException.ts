import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class HealthCheckException extends FizzBuzzEnterpriseException {
  private readonly componentName: string;

  constructor(componentName: string, message: string, cause: Error | null = null) {
    super(message, "FIZZBUZZ-4001", cause);
    this.name = "HealthCheckException";
    this.componentName = componentName;
  }

  getComponentName(): string {
    return this.componentName;
  }
}
