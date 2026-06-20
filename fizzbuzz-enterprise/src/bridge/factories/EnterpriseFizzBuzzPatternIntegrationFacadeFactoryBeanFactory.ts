import { EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory } from "./EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory.js";
import { ComputationTypeFlyweightFactoryFactoryBeanFactory } from "../../flyweight/factories/ComputationTypeFlyweightFactoryFactoryBeanFactory.js";
import { ComputationPrototypeRegistryFactoryBeanFactory } from "../../prototype/factories/ComputationPrototypeRegistryFactoryBeanFactory.js";
import type { IEnterpriseFizzBuzzPatternIntegrationFacade } from "../contracts/IEnterpriseFizzBuzzPatternIntegrationFacade.js";
import type { IFizzBuzzComputationBridgeAbstraction } from "../contracts/IFizzBuzzComputationBridgeAbstraction.js";
import { ComputationTypeFlyweightFactoryImpl } from "../../flyweight/impl/factory/ComputationTypeFlyweightFactoryImpl.js";
import type { IComputationPrototypeRegistry } from "../../prototype/contracts/IComputationPrototypeRegistry.js";
import { PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl } from "../impl/bridges/PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl.js";

export class EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory {
  private static readonly FACADE_NAME = "EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory";
  private static readonly FACADE_VERSION = "1.0.0-PATTERN-INTEGRATION-FACADE";

  private static patternFacadeSingleton: IEnterpriseFizzBuzzPatternIntegrationFacade | null = null;
  private static patternBridgeSingleton: PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl | null = null;

  static initializePatternIntegrationInfrastructure(): {
    facade: IEnterpriseFizzBuzzPatternIntegrationFacade;
    bridge: PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl;
  } {
    if (EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.patternFacadeSingleton === null) {
      const bridgeImplementor = EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory.createDefaultImplementor();
      const flyweightInfrastructure = ComputationTypeFlyweightFactoryFactoryBeanFactory.initializeFlyweightInfrastructure();
      const prototypeRegistry = ComputationPrototypeRegistryFactoryBeanFactory.initializePrototypeInfrastructure();

      const patternFacade = new EnterpriseFizzBuzzPatternIntegrationFacadeImpl(
        flyweightInfrastructure.factory,
        prototypeRegistry,
      );
      EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.patternFacadeSingleton = patternFacade;

      const bridge = new PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl(
        bridgeImplementor,
        patternFacade,
      );
      EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.patternBridgeSingleton = bridge;
    }
    return {
      facade: EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.patternFacadeSingleton,
      bridge: EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.patternBridgeSingleton!,
    };
  }

  static getFacade(): IEnterpriseFizzBuzzPatternIntegrationFacade | null {
    return EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.patternFacadeSingleton;
  }

  static getBridge(): PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl | null {
    return EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.patternBridgeSingleton;
  }

  static getFacadeName(): string {
    return EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.FACADE_NAME;
  }

  static getFacadeVersion(): string {
    return EnterpriseFizzBuzzPatternIntegrationFacadeFactoryBeanFactory.FACADE_VERSION;
  }
}

class EnterpriseFizzBuzzPatternIntegrationFacadeImpl
  implements IEnterpriseFizzBuzzPatternIntegrationFacade
{
  private static readonly IMPL_NAME = "EnterpriseFizzBuzzPatternIntegrationFacadeImpl";
  private static readonly IMPL_VERSION = "1.0.0-PATTERN-INTEGRATION-FACADE-IMPL";

  private readonly _flyweightFactory: ComputationTypeFlyweightFactoryImpl;
  private readonly _prototypeRegistry: IComputationPrototypeRegistry;

  constructor(
    flyweightFactory: ComputationTypeFlyweightFactoryImpl,
    prototypeRegistry: IComputationPrototypeRegistry,
  ) {
    this._flyweightFactory = flyweightFactory;
    this._prototypeRegistry = prototypeRegistry;
  }

  getIntegrationName(): string {
    return EnterpriseFizzBuzzPatternIntegrationFacadeImpl.IMPL_NAME;
  }

  getIntegrationVersion(): string {
    return EnterpriseFizzBuzzPatternIntegrationFacadeImpl.IMPL_VERSION;
  }

  getBridge(): IFizzBuzzComputationBridgeAbstraction | null {
    return EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory.getBridgeAbstraction();
  }

  getFlyweightFactory(): ComputationTypeFlyweightFactoryImpl | null {
    return this._flyweightFactory;
  }

  getPrototypeRegistry(): IComputationPrototypeRegistry | null {
    return this._prototypeRegistry;
  }

  isPatternInfrastructureInitialized(): boolean {
    return true;
  }

  resolveComputationTypeLabel(value: number): string | null {
    const flyweight = this._flyweightFactory.resolveComputationType(value);
    return flyweight?.getDisplayLabel() ?? null;
  }

  cloneComputationPrototype(identifier: string): unknown {
    return this._prototypeRegistry.clonePrototype(identifier);
  }
}

