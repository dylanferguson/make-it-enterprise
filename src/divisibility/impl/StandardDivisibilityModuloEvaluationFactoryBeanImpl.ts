import { AbstractBaseDivisibilityModuloEvaluationFactoryBean } from "../abstracts/AbstractBaseDivisibilityModuloEvaluationFactoryBean.js";
import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";
import { StandardDivisibilityModuloEvaluationChainHandlerImpl } from "../impl/StandardDivisibilityModuloEvaluationChainHandlerImpl.js";
import { DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl } from "../impl/DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.js";
import { DivisibilityModuloEvaluationChainBuilderImpl } from "../factories/DivisibilityModuloEvaluationChainBuilderImpl.js";

export class StandardDivisibilityModuloEvaluationFactoryBeanImpl
  extends AbstractBaseDivisibilityModuloEvaluationFactoryBean
{
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-STANDARD-MODULO-FACTORY-BEAN";
  private static readonly SINGLETON = true;

  private chainHandler: IDivisibilityModuloEvaluationChainHandler | null = null;

  constructor(factoryBeanName: string, supportedDivisor: number) {
    super(
      factoryBeanName,
      StandardDivisibilityModuloEvaluationFactoryBeanImpl.FACTORY_BEAN_VERSION,
      StandardDivisibilityModuloEvaluationFactoryBeanImpl.SINGLETON,
      supportedDivisor,
    );
  }

  override createChainHandler(): IDivisibilityModuloEvaluationChainHandler {
    this.logInstantiation("DivisibilityModuloEvaluationChainHandler");
    if (this.chainHandler !== null && this.isSingleton()) {
      return this.chainHandler;
    }
    const builder = new DivisibilityModuloEvaluationChainBuilderImpl();
    const handler = builder
      .addValidationDecorator()
      .addStandardModuloEvaluator()
      .build();
    this.chainHandler = handler;
    console.debug(
      `[${this.getFactoryBeanName()}] Chain handler created: ` +
      `handler=[${handler.getHandlerName()} v${handler.getHandlerVersion()}], ` +
      `priority=[${handler.getHandlerPriority()}], ` +
      `divisor=[${this.getSupportedDivisor()}]`,
    );
    return handler;
  }
}
