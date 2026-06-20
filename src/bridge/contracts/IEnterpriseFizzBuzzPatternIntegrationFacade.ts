import type { IFizzBuzzComputationBridgeAbstraction } from "../../bridge/contracts/IFizzBuzzComputationBridgeAbstraction.js";
import { ComputationTypeFlyweightFactoryImpl } from "../../flyweight/impl/factory/ComputationTypeFlyweightFactoryImpl.js";
import type { IComputationPrototypeRegistry } from "../../prototype/contracts/IComputationPrototypeRegistry.js";

export interface IEnterpriseFizzBuzzPatternIntegrationFacade {
  getIntegrationName(): string;
  getIntegrationVersion(): string;
  getBridge(): IFizzBuzzComputationBridgeAbstraction | null;
  getFlyweightFactory(): ComputationTypeFlyweightFactoryImpl | null;
  getPrototypeRegistry(): IComputationPrototypeRegistry | null;
  isPatternInfrastructureInitialized(): boolean;
  resolveComputationTypeLabel(value: number): string | null;
  cloneComputationPrototype(identifier: string): unknown;
}

