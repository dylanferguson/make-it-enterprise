import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionMediator } from "../contracts/IFizzBuzzResolutionMediator.js";
import type { IMediatorAwareResolutionFacadeDecorator } from "../contracts/IMediatorAwareResolutionFacadeDecorator.js";

export abstract class AbstractBaseMediatorAwareResolutionFacadeDecorator
  implements IMediatorAwareResolutionFacadeDecorator
{
  private readonly decoratorName: string;
  private readonly decoratorVersion: string;
  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly mediator: IFizzBuzzResolutionMediator;
  private readonly decoratorEnabled: boolean;

  constructor(
    decoratorName: string,
    decoratorVersion: string,
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    mediator: IFizzBuzzResolutionMediator,
    decoratorEnabled: boolean,
  ) {
    this.decoratorName = decoratorName;
    this.decoratorVersion = decoratorVersion;
    this.wrappedFacade = wrappedFacade;
    this.mediator = mediator;
    this.decoratorEnabled = decoratorEnabled;
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

  getMediator(): IFizzBuzzResolutionMediator {
    return this.mediator;
  }

  isDecoratorEnabled(): boolean {
    return this.decoratorEnabled;
  }

  getFacadeName(): string {
    return this.decoratorName;
  }

  getFacadeVersion(): string {
    return this.decoratorVersion;
  }

  abstract resolveValue(value: number): string;

  abstract resolveRange(start: number, end: number): readonly string[];
}
