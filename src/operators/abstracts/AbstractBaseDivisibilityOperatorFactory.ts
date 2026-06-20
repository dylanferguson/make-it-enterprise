import type { IDivisibilityOperatorFactory } from "../contracts/IDivisibilityOperatorFactory.js";
import type { IDivisibilityOperator } from "../contracts/IDivisibilityOperator.js";

export abstract class AbstractBaseDivisibilityOperatorFactory implements IDivisibilityOperatorFactory {
  private static readonly DEFAULT_FACTORY_NAME = "AbstractBaseDivisibilityOperatorFactory";
  private static readonly DEFAULT_FACTORY_VERSION = "1.0.0-BASE-OPERATOR-FACTORY";

  private readonly factoryName: string;
  private readonly factoryVersion: string;

  constructor(
    factoryName: string = AbstractBaseDivisibilityOperatorFactory.DEFAULT_FACTORY_NAME,
    factoryVersion: string = AbstractBaseDivisibilityOperatorFactory.DEFAULT_FACTORY_VERSION,
  ) {
    this.factoryName = factoryName;
    this.factoryVersion = factoryVersion;
  }

  getFactoryName(): string {
    return this.factoryName;
  }

  getFactoryVersion(): string {
    return this.factoryVersion;
  }

  abstract createOperator(): IDivisibilityOperator;
  abstract createOperatorWithContext(context: string): IDivisibilityOperator;

  protected createOperatorName(context: string): string {
    return `${this.factoryName}::${context}`;
  }
}
