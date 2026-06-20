import type { IComputationStrategySelectorStrategy } from "../../contracts/IComputationStrategySelectorStrategy.js";
import type { IEnterpriseComputationStrategySelectorStrategyFactoryBean } from "../../contracts/IEnterpriseComputationStrategySelectorStrategyFactoryBean.js";
import type { IEnterpriseComputationStrategySelectionHandler } from "../../contracts/IEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import { AbstractBaseEnterpriseComputationStrategySelectorStrategy } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectorStrategy.js";
import { DefaultEnterpriseComputationStrategySelectionHandlerImpl } from "../handlers/DefaultEnterpriseComputationStrategySelectionHandlerImpl.js";

class StandardEnterpriseComputationStrategySelectorStrategyImpl
  extends AbstractBaseEnterpriseComputationStrategySelectorStrategy
{
  private static readonly STRATEGY_NAME = "StandardEnterpriseComputationStrategySelectorStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-ENTERPRISE";

  private defaultHandler: IEnterpriseComputationStrategySelectionHandler | null = null;

  override selectSelector(context: IEnterpriseComputationStrategySelectionContext): IEnterpriseComputationStrategySelectionHandler {
    this.validateSelectionContext(context);
    if (this.defaultHandler === null) {
      this.defaultHandler = new DefaultEnterpriseComputationStrategySelectionHandlerImpl();
    }
    return this.defaultHandler;
  }

  override getSelectorStrategyName(): string {
    return StandardEnterpriseComputationStrategySelectorStrategyImpl.STRATEGY_NAME;
  }

  override getSelectorStrategyVersion(): string {
    return StandardEnterpriseComputationStrategySelectorStrategyImpl.STRATEGY_VERSION;
  }
}

export class StandardEnterpriseComputationStrategySelectorStrategyFactoryBean
  implements IEnterpriseComputationStrategySelectorStrategyFactoryBean
{
  private static readonly FACTORY_BEAN_NAME = "StandardEnterpriseComputationStrategySelectorStrategyFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-SELECTOR-STRATEGY-FACTORY";

  createSelectorStrategy(): IComputationStrategySelectorStrategy {
    return new StandardEnterpriseComputationStrategySelectorStrategyImpl();
  }

  getFactoryBeanName(): string {
    return StandardEnterpriseComputationStrategySelectorStrategyFactoryBean.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return StandardEnterpriseComputationStrategySelectorStrategyFactoryBean.FACTORY_BEAN_VERSION;
  }
}
