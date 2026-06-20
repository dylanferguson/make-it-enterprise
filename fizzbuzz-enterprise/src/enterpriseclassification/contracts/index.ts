import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export interface IEnterpriseClassificationStrategyProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  getRegisteredClassificationDivisors(): readonly number[];
  registerClassificationDefinition(divisor: number, classification: string): void;
  resolveClassificationForValue(value: number): readonly string[];
  getClassificationRegistry(): IEnterpriseClassificationRegistry;
}

export interface IEnterpriseClassificationChainHandler {
  getHandlerName(): string;
  getHandlerVersion(): string;
  getHandlerPriority(): number;
  handleClassification(value: number): string | null;
  setNextHandler(handler: IEnterpriseClassificationChainHandler | null): void;
  getNextHandler(): IEnterpriseClassificationChainHandler | null;
}

export interface IEnterpriseClassificationVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  visitValue(value: number): string | null;
  visitCollection(value: number, results: readonly string[]): string;
  getAggregatedClassification(value: number): string;
}

export interface IEnterpriseClassificationRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerHandler(handler: IEnterpriseClassificationChainHandler, priority: number): void;
  unregisterHandler(handlerName: string): boolean;
  getRegisteredHandlers(): readonly IEnterpriseClassificationChainHandler[];
  clearRegistry(): void;
  getChainHead(): IEnterpriseClassificationChainHandler | null;
  getHandlerCount(): number;
}

export interface IEnterpriseClassificationAwareResolutionFacadeDecorator extends IFizzBuzzSingleValueResolutionFacade {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isDecoratorEnabled(): boolean;
  getWrappedFacadeName(): string;
  getClassificationStrategyProvider(): IEnterpriseClassificationStrategyProvider;
  getClassificationVisitor(): IEnterpriseClassificationVisitor;
}
