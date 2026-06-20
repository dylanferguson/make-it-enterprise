import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../../contracts/index.js";
import type { IExecutionCoordinatorAwareResolutionFacadeDecorator } from "../../contracts/IExecutionCoordinatorAwareResolutionFacadeDecorator.js";

export class DefaultExecutionCoordinatorAwareResolutionFacadeDecoratorImpl
  implements IExecutionCoordinatorAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "DefaultExecutionCoordinatorAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-EXECUTION-COORDINATOR-AWARE-DECORATOR";

  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly executionCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  private coordinatorEngaged: boolean = false;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    executionCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.executionCoordinator = executionCoordinator;
  }

  resolveValue(value: number): string {
    this.coordinatorEngaged = true;
    try {
      const result = this.executionCoordinator.coordinateSingleValueExecution(value);
      this.coordinatorEngaged = false;
      return result;
    } catch (error) {
      this.coordinatorEngaged = false;
      return this.wrappedFacade.resolveValue(value);
    }
  }

  resolveRange(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  getFacadeName(): string {
    return `${DefaultExecutionCoordinatorAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  getFacadeVersion(): string {
    return DefaultExecutionCoordinatorAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getExecutionCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
    return this.executionCoordinator;
  }

  isCoordinatorEngaged(): boolean {
    return this.coordinatorEngaged;
  }
}
