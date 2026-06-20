import type { IEnterpriseModuloArithmeticVisitor } from "../contracts/IEnterpriseModuloArithmeticVisitor.js";
import type { IModuloArithmeticVisitorHandlerProduct } from "../contracts/IVisitorDrivenModuloArithmeticHandler.js";
import type { IVisitorDrivenModuloArithmeticHandlerFactory } from "../contracts/IVisitorDrivenModuloArithmeticHandler.js";
import { StandardModuloArithmeticEvaluationVisitorImpl } from "../impl/visitors/StandardModuloArithmeticEvaluationVisitorImpl.js";
import { VisitorChainBuilderImpl } from "../impl/handlers/VisitorChainBuilderImpl.js";

export class EnterpriseModuloArithmeticVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseModuloArithmeticVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-VISITOR-FACTORY";

  private static visitorSingleton: IEnterpriseModuloArithmeticVisitor | null = null;
  private static factorySingleton: IVisitorDrivenModuloArithmeticHandlerFactory | null = null;

  static createDefaultVisitor(): IEnterpriseModuloArithmeticVisitor {
    if (EnterpriseModuloArithmeticVisitorFactoryBeanFactory.visitorSingleton === null) {
      EnterpriseModuloArithmeticVisitorFactoryBeanFactory.visitorSingleton =
        new StandardModuloArithmeticEvaluationVisitorImpl();
    }
    return EnterpriseModuloArithmeticVisitorFactoryBeanFactory.visitorSingleton;
  }

  static createDefaultHandlerFactory(): IVisitorDrivenModuloArithmeticHandlerFactory {
    if (EnterpriseModuloArithmeticVisitorFactoryBeanFactory.factorySingleton === null) {
      EnterpriseModuloArithmeticVisitorFactoryBeanFactory.factorySingleton =
        new DefaultEnterpriseModuloArithmeticVisitorHandlerFactoryImpl();
    }
    return EnterpriseModuloArithmeticVisitorFactoryBeanFactory.factorySingleton;
  }

  static createVisitorProductWithChain(
    cachingEnabled: boolean,
    auditingEnabled: boolean,
    additionalVisitors: IEnterpriseModuloArithmeticVisitor[],
  ): IModuloArithmeticVisitorHandlerProduct {
    const builder = new VisitorChainBuilderImpl();
    builder.withCachingDecorator(cachingEnabled);
    builder.withAuditingDecorator(auditingEnabled);
    const defaultVisitor = EnterpriseModuloArithmeticVisitorFactoryBeanFactory.createDefaultVisitor();
    builder.withVisitor(defaultVisitor);
    for (const v of additionalVisitors) {
      builder.withVisitor(v);
    }
    return builder.build();
  }

  static getVisitor(): IEnterpriseModuloArithmeticVisitor | null {
    return EnterpriseModuloArithmeticVisitorFactoryBeanFactory.visitorSingleton;
  }

  static getFactory(): IVisitorDrivenModuloArithmeticHandlerFactory | null {
    return EnterpriseModuloArithmeticVisitorFactoryBeanFactory.factorySingleton;
  }

  static reset(): void {
    EnterpriseModuloArithmeticVisitorFactoryBeanFactory.visitorSingleton = null;
    EnterpriseModuloArithmeticVisitorFactoryBeanFactory.factorySingleton = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseModuloArithmeticVisitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseModuloArithmeticVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

export class DefaultEnterpriseModuloArithmeticVisitorHandlerFactoryImpl
  implements IVisitorDrivenModuloArithmeticHandlerFactory
{
  private static readonly FACTORY_IMPL_NAME = "DefaultEnterpriseModuloArithmeticVisitorHandlerFactory";
  private static readonly FACTORY_IMPL_VERSION = "1.0.0-HANDLER-FACTORY";

  createHandler(visitor: IEnterpriseModuloArithmeticVisitor): IModuloArithmeticVisitorHandlerProduct {
    const builder = new VisitorChainBuilderImpl();
    builder.withVisitor(visitor);
    builder.withCachingDecorator(true);
    builder.withAuditingDecorator(true);
    return builder.build();
  }

  getFactoryName(): string {
    return DefaultEnterpriseModuloArithmeticVisitorHandlerFactoryImpl.FACTORY_IMPL_NAME;
  }

  getFactoryVersion(): string {
    return DefaultEnterpriseModuloArithmeticVisitorHandlerFactoryImpl.FACTORY_IMPL_VERSION;
  }
}
