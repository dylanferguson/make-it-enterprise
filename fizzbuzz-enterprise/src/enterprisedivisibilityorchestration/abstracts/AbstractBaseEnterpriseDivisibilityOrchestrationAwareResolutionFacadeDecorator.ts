import type { IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator } from "../contracts/IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";

export abstract class AbstractBaseEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator
  implements IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator
{
  private readonly decoratorName: string;
  private readonly decoratorVersion: string;
  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly invoker: IEnterpriseDivisibilityOrchestrationInvoker;
  private readonly decoratorEnabled: boolean;

  constructor(
    decoratorName: string,
    decoratorVersion: string,
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    invoker: IEnterpriseDivisibilityOrchestrationInvoker,
    decoratorEnabled: boolean,
  ) {
    this.decoratorName = decoratorName;
    this.decoratorVersion = decoratorVersion;
    this.wrappedFacade = wrappedFacade;
    this.invoker = invoker;
    this.decoratorEnabled = decoratorEnabled;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];

  getFacadeName(): string {
    return this.decoratorName;
  }

  getFacadeVersion(): string {
    return this.decoratorVersion;
  }

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getInvoker(): IEnterpriseDivisibilityOrchestrationInvoker {
    return this.invoker;
  }

  isDecoratorEnabled(): boolean {
    return this.decoratorEnabled;
  }
}
