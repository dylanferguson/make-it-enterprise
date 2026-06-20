import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationCommandDecorator } from "../contracts/IFizzBuzzComputationCommandDecorator.js";
import type { IEnterpriseFizzBuzzResolutionFacadeDecoratorStack } from "../contracts/IEnterpriseFizzBuzzResolutionFacadeDecoratorStack.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResolutionFacadeDecoratorStack
  implements IEnterpriseFizzBuzzResolutionFacadeDecoratorStack
{
  protected static readonly DECORATOR_STACK_FRAMEWORK_VERSION = "1.0.0-DECORATOR-STACK-FRAMEWORK";
  protected static readonly MAX_DECORATOR_DEPTH = 20;

  abstract buildDecoratorStack(baseCommand: IFizzBuzzComputationCommand): IFizzBuzzComputationCommand;
  abstract registerDecoratorFactory(factory: () => IFizzBuzzComputationCommandDecorator, priority: number): void;
  abstract registerDecoratorType(decoratorType: new (wrapped: IFizzBuzzComputationCommand) => IFizzBuzzComputationCommandDecorator, priority: number): void;
  abstract getDecoratorStackName(): string;
  abstract getDecoratorStackVersion(): string;
  abstract getRegisteredDecoratorCount(): number;

  protected assertStackDepth(registrations: number): void {
    if (registrations > AbstractBaseEnterpriseFizzBuzzResolutionFacadeDecoratorStack.MAX_DECORATOR_DEPTH) {
      throw new Error(
        `[${this.getDecoratorStackName()} v${AbstractBaseEnterpriseFizzBuzzResolutionFacadeDecoratorStack.DECORATOR_STACK_FRAMEWORK_VERSION}] ` +
        `Decorator stack depth ${registrations} exceeds maximum of ${AbstractBaseEnterpriseFizzBuzzResolutionFacadeDecoratorStack.MAX_DECORATOR_DEPTH}`,
      );
    }
  }
}
