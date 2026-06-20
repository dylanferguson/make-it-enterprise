import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";

export interface IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getJndiLookupPath(): string;
  isEjbRoutingEnabled(): boolean;
}
