import type { IComputationStrategySelectorStrategy } from "../../contracts/IComputationStrategySelectorStrategy.js";
import type { IEnterpriseComputationStrategySelectorStrategyFactoryBean } from "../../contracts/IEnterpriseComputationStrategySelectorStrategyFactoryBean.js";
import type { IEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory } from "../../contracts/IEnterpriseComputationStrategySelectorStrategyFactoryBean.js";
import { StandardEnterpriseComputationStrategySelectorStrategyFactoryBean } from "../selectors/StandardEnterpriseComputationStrategySelectorStrategyFactoryBean.js";

export class StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory
  implements IEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory
{
  private static readonly FACTORY_NAME = "StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory";
  private static readonly FACTORY_PRIORITY = 100;

  private static bean: IEnterpriseComputationStrategySelectorStrategyFactoryBean | null = null;
  private static strategy: IComputationStrategySelectorStrategy | null = null;

  createSelectorStrategy(): IComputationStrategySelectorStrategy {
    if (StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.strategy === null) {
      if (StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.bean === null) {
        StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.bean =
          new StandardEnterpriseComputationStrategySelectorStrategyFactoryBean();
      }
      StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.strategy =
        StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.bean!.createSelectorStrategy();
    }
    return StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.strategy;
  }

  getFactoryName(): string {
    return StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.FACTORY_NAME;
  }

  getFactoryPriority(): number {
    return StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.FACTORY_PRIORITY;
  }

  static resetFactory(): void {
    StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.bean = null;
    StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.strategy = null;
  }
}
