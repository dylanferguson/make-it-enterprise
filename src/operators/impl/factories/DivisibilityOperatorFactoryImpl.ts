import { AbstractBaseDivisibilityOperatorFactory } from "../../abstracts/AbstractBaseDivisibilityOperatorFactory.js";
import type { IDivisibilityOperator } from "../../contracts/IDivisibilityOperator.js";
import { DivisibilityOperatorChainBuilderFactoryBeanFactory } from "./DivisibilityOperatorChainBuilderFactoryBeanFactory.js";

export class DivisibilityOperatorFactoryImpl extends AbstractBaseDivisibilityOperatorFactory {
  private static readonly FACTORY_NAME = "DivisibilityOperatorFactory";
  private static readonly FACTORY_VERSION = "1.0.0-DIVISIBILITY-OPERATOR-FACTORY";

  private readonly singletonOperator: IDivisibilityOperator;

  constructor() {
    super(
      DivisibilityOperatorFactoryImpl.FACTORY_NAME,
      DivisibilityOperatorFactoryImpl.FACTORY_VERSION,
    );
    const builder = DivisibilityOperatorChainBuilderFactoryBeanFactory.getOrCreateBuilder();
    this.singletonOperator = builder.buildChain();
  }

  override createOperator(): IDivisibilityOperator {
    const builder = DivisibilityOperatorChainBuilderFactoryBeanFactory.createBuilder();
    return builder.buildChain();
  }

  override createOperatorWithContext(context: string): IDivisibilityOperator {
    const builder = DivisibilityOperatorChainBuilderFactoryBeanFactory.createBuilder();
    return builder.buildChain();
  }
}
