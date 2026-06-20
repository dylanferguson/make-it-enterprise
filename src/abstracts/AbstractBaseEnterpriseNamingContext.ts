import type { IEnterpriseNamingContext } from "../contracts/IEnterpriseNamingContext.js";
import type { IServiceLocator } from "../contracts/IServiceLocator.js";

export abstract class AbstractBaseEnterpriseNamingContext implements IEnterpriseNamingContext {
  protected readonly bindings: Map<string, unknown> = new Map();
  protected readonly contextName: string;

  constructor(contextName: string = "FizzBuzzEnterpriseNamingContext") {
    this.contextName = contextName;
  }

  abstract lookup(name: string): unknown;
  abstract lookupServiceLocator(): IServiceLocator;
  abstract bind(name: string, value: unknown): void;
  abstract unbind(name: string): boolean;
  abstract listBoundNames(): readonly string[];
  abstract getNamingContextName(): string;

  protected assertBound(name: string): void {
    if (!this.bindings.has(name)) {
      throw new Error(
        `[${this.contextName}] No binding found for name: ${name}`,
      );
    }
  }
}
