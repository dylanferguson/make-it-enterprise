import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator } from "../contracts/IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator.js";
import type { IEnterpriseComputationResolutionMediatorArchitecture } from "../contracts/IEnterpriseComputationResolutionMediatorArchitecture.js";

export abstract class AbstractBaseComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator
  implements IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator
{
  protected readonly decoratorName: string;
  protected readonly decoratorVersion: string;
  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly architecture: IEnterpriseComputationResolutionMediatorArchitecture;
  protected decoratorEnabled: boolean;

  constructor(
    decoratorName: string,
    decoratorVersion: string,
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    architecture: IEnterpriseComputationResolutionMediatorArchitecture,
    decoratorEnabled: boolean,
  ) {
    this.decoratorName = decoratorName;
    this.decoratorVersion = decoratorVersion;
    this.wrappedFacade = wrappedFacade;
    this.architecture = architecture;
    this.decoratorEnabled = decoratorEnabled;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];

  getArchitecture(): IEnterpriseComputationResolutionMediatorArchitecture {
    return this.architecture;
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
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
}
