import { AbstractBaseEnterpriseFizzBuzzResolutionFacadeDecoratorStack } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionFacadeDecoratorStack.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationCommandDecorator } from "../../contracts/IFizzBuzzComputationCommandDecorator.js";
import type { IEnterpriseFizzBuzzResolutionFacadeDecoratorStack } from "../../contracts/IEnterpriseFizzBuzzResolutionFacadeDecoratorStack.js";

interface DecoratorRegistrationEntry {
  decoratorType: new (wrapped: IFizzBuzzComputationCommand) => IFizzBuzzComputationCommandDecorator;
  priority: number;
}

export class StandardEnterpriseFizzBuzzResolutionFacadeDecoratorStackImpl
  extends AbstractBaseEnterpriseFizzBuzzResolutionFacadeDecoratorStack
  implements IEnterpriseFizzBuzzResolutionFacadeDecoratorStack
{
  private static readonly STACK_NAME = "StandardEnterpriseFizzBuzzResolutionFacadeDecoratorStack";
  private static readonly STACK_VERSION = "1.0.0-ENTERPRISE";

  private readonly registrations: DecoratorRegistrationEntry[] = [];

  constructor() {
    super();
  }

  override buildDecoratorStack(baseCommand: IFizzBuzzComputationCommand): IFizzBuzzComputationCommand {
    this.assertStackDepth(this.registrations.length);
    const sorted = [...this.registrations]
      .sort((a, b) => b.priority - a.priority);
    let decorated: IFizzBuzzComputationCommand = baseCommand;
    for (const entry of sorted) {
      decorated = new entry.decoratorType(decorated);
    }
    return decorated;
  }

  registerDecoratorFactory(
    factory: () => IFizzBuzzComputationCommandDecorator,
    _priority: number,
  ): void {
    console.warn(
      `[${this.getDecoratorStackName()}] registerDecoratorFactory with factory function not supported in this implementation. Use registerDecoratorType instead.`,
    );
  }

  registerDecoratorType(
    decoratorType: new (wrapped: IFizzBuzzComputationCommand) => IFizzBuzzComputationCommandDecorator,
    priority: number,
  ): void {
    this.registrations.push({ decoratorType, priority });
  }

  override getDecoratorStackName(): string {
    return StandardEnterpriseFizzBuzzResolutionFacadeDecoratorStackImpl.STACK_NAME;
  }

  override getDecoratorStackVersion(): string {
    return StandardEnterpriseFizzBuzzResolutionFacadeDecoratorStackImpl.STACK_VERSION;
  }

  override getRegisteredDecoratorCount(): number {
    return this.registrations.length;
  }
}
