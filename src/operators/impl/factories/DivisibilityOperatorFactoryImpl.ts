import { AbstractBaseDivisibilityOperatorFactory } from "../../abstracts/AbstractBaseDivisibilityOperatorFactory.js";
import type { IDivisibilityOperator } from "../../contracts/IDivisibilityOperator.js";
import { StandardRemainderBasedDivisibilityOperatorImpl } from "../operators/StandardRemainderBasedDivisibilityOperatorImpl.js";

export class DivisibilityOperatorFactoryImpl extends AbstractBaseDivisibilityOperatorFactory {
  private static readonly FACTORY_NAME = "DivisibilityOperatorFactory";
  private static readonly FACTORY_VERSION = "1.0.0-DIVISIBILITY-OPERATOR-FACTORY";

  private readonly singletonOperator: IDivisibilityOperator;

  constructor() {
    super(
      DivisibilityOperatorFactoryImpl.FACTORY_NAME,
      DivisibilityOperatorFactoryImpl.FACTORY_VERSION,
    );
    this.singletonOperator = new StandardRemainderBasedDivisibilityOperatorImpl();
  }

  override createOperator(): IDivisibilityOperator {
    return new StandardRemainderBasedDivisibilityOperatorImpl();
  }

  override createOperatorWithContext(context: string): IDivisibilityOperator {
    const contextualOperator = new StandardRemainderBasedDivisibilityOperatorImpl();
    return contextualOperator;
  }
}
