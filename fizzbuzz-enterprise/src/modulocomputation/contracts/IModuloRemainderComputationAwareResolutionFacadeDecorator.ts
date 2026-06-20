import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IModuloRemainderComputationChainOfResponsibilityHandler, IModuloRemainderComputationCommandInvoker, IModuloRemainderComputationVisitor, IModuloRemainderComputationStrategyProvider } from "./index.js";

export interface IModuloRemainderComputationAwareResolutionFacadeDecorator extends IFizzBuzzSingleValueResolutionFacade {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isDecoratorEnabled(): boolean;
  getWrappedFacadeName(): string;
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getChainHandler(): IModuloRemainderComputationChainOfResponsibilityHandler;
  getCommandInvoker(): IModuloRemainderComputationCommandInvoker;
  getComputationVisitor(): IModuloRemainderComputationVisitor;
  getStrategyProvider(): IModuloRemainderComputationStrategyProvider;
  getRegisteredDivisors(): readonly number[];
  getComputationCount(): number;
  getDecoratorInterceptionCount(): number;
}
