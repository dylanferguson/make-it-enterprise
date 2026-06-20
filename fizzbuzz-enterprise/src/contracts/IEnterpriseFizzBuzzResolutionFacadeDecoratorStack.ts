import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationCommandDecorator } from "./IFizzBuzzComputationCommandDecorator.js";

export interface IEnterpriseFizzBuzzResolutionFacadeDecoratorStack {
  buildDecoratorStack(baseCommand: IFizzBuzzComputationCommand): IFizzBuzzComputationCommand;
  registerDecoratorFactory(factory: () => IFizzBuzzComputationCommandDecorator, priority: number): void;
  registerDecoratorType(decoratorType: new (wrapped: IFizzBuzzComputationCommand) => IFizzBuzzComputationCommandDecorator, priority: number): void;
  getDecoratorStackName(): string;
  getDecoratorStackVersion(): string;
  getRegisteredDecoratorCount(): number;
}
