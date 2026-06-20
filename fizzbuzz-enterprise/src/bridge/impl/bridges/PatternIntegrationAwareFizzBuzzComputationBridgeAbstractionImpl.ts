import { AbstractBaseFizzBuzzComputationBridgeAbstractionImpl } from "../../abstracts/AbstractBaseFizzBuzzComputationBridgeAbstractionImpl.js";
import type { IBridgeComputationImplementor } from "../../contracts/IBridgeComputationImplementor.js";
import type { IEnterpriseFizzBuzzPatternIntegrationFacade } from "../../contracts/IEnterpriseFizzBuzzPatternIntegrationFacade.js";
import type { IComputationPrototypeRegistry } from "../../../prototype/contracts/IComputationPrototypeRegistry.js";
import { ComputationTypeFlyweightFactoryImpl } from "../../../flyweight/impl/factory/ComputationTypeFlyweightFactoryImpl.js";

export class PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl
  extends AbstractBaseFizzBuzzComputationBridgeAbstractionImpl
{
  private static readonly BRIDGE_NAME = "PatternIntegrationAwareFizzBuzzComputationBridgeAbstraction";
  private static readonly BRIDGE_VERSION = "1.0.0-PATTERN-INTEGRATION-BRIDGE";

  private readonly _integrationFacade: IEnterpriseFizzBuzzPatternIntegrationFacade;

  constructor(
    implementor: IBridgeComputationImplementor,
    integrationFacade: IEnterpriseFizzBuzzPatternIntegrationFacade,
  ) {
    super(
      PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl.BRIDGE_NAME,
      PatternIntegrationAwareFizzBuzzComputationBridgeAbstractionImpl.BRIDGE_VERSION,
      implementor,
    );
    this._integrationFacade = integrationFacade;
  }

  getIntegrationFacade(): IEnterpriseFizzBuzzPatternIntegrationFacade {
    return this._integrationFacade;
  }

  override resolveComputedClassification(value: number, divisor: number): boolean {
    const remainder = this.resolveComputedValue(value, divisor);
    return remainder === 0;
  }

  resolveComputationTypeLabelViaFlyweight(value: number): string | null {
    return this._integrationFacade.resolveComputationTypeLabel(value);
  }
}

