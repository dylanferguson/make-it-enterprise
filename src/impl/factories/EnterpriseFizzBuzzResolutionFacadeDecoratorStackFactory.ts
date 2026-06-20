import type { IEnterpriseFizzBuzzResolutionFacadeDecoratorStack } from "../../contracts/IEnterpriseFizzBuzzResolutionFacadeDecoratorStack.js";
import { StandardEnterpriseFizzBuzzResolutionFacadeDecoratorStackImpl } from "../stacks/StandardEnterpriseFizzBuzzResolutionFacadeDecoratorStackImpl.js";

export class EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory {
  private static readonly FACTORY_NAME = "EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory";
  private static readonly FACTORY_VERSION = "1.0.0-DECORATOR-STACK-FACTORY";

  private static decoratorStack: IEnterpriseFizzBuzzResolutionFacadeDecoratorStack | null = null;
  private static instanceCount = 0;

  static createDecoratorStack(): IEnterpriseFizzBuzzResolutionFacadeDecoratorStack {
    if (EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.decoratorStack === null) {
      EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.decoratorStack =
        new StandardEnterpriseFizzBuzzResolutionFacadeDecoratorStackImpl();
      EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.instanceCount++;
    }
    return EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.decoratorStack;
  }

  static getInstanceCount(): number {
    return EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.instanceCount;
  }

  static getFactoryName(): string {
    return EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.FACTORY_VERSION;
  }

  static resetDecoratorStack(): void {
    EnterpriseFizzBuzzResolutionFacadeDecoratorStackFactory.decoratorStack = null;
  }
}
