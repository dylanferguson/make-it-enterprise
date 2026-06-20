import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IAopProxyFactory } from "./IAopProxyFactory.js";
import type { IAspectWeaver } from "./IAspectWeaver.js";

export interface IAspectOrientedResolutionFacadeDecorator extends IFizzBuzzSingleValueResolutionFacade {
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getAopProxyFactory(): IAopProxyFactory;
  getAopWeaver(): IAspectWeaver;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
}
