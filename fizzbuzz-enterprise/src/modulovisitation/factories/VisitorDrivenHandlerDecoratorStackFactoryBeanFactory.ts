import type { IModuloArithmeticVisitorHandlerProduct } from "../contracts/IVisitorDrivenModuloArithmeticHandler.js";
import { EnterpriseModuloArithmeticVisitorFactoryBeanFactory } from "./EnterpriseModuloArithmeticVisitorFactoryBeanFactory.js";

export class VisitorDrivenHandlerDecoratorStackFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "VisitorDrivenHandlerDecoratorStackFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DECORATOR-STACK-FACTORY";

  private static decoratorStackProduct: IModuloArithmeticVisitorHandlerProduct | null = null;

  static initializeDecoratorStackInfrastructure(
    cachingEnabled: boolean,
    auditingEnabled: boolean,
  ): IModuloArithmeticVisitorHandlerProduct {
    if (VisitorDrivenHandlerDecoratorStackFactoryBeanFactory.decoratorStackProduct === null) {
      VisitorDrivenHandlerDecoratorStackFactoryBeanFactory.decoratorStackProduct =
        EnterpriseModuloArithmeticVisitorFactoryBeanFactory.createVisitorProductWithChain(
          cachingEnabled,
          auditingEnabled,
          [],
        );
    }
    return VisitorDrivenHandlerDecoratorStackFactoryBeanFactory.decoratorStackProduct;
  }

  static getDecoratorStackProduct(): IModuloArithmeticVisitorHandlerProduct | null {
    return VisitorDrivenHandlerDecoratorStackFactoryBeanFactory.decoratorStackProduct;
  }

  static resetDecoratorStack(): void {
    VisitorDrivenHandlerDecoratorStackFactoryBeanFactory.decoratorStackProduct = null;
  }

  static getFactoryBeanName(): string {
    return VisitorDrivenHandlerDecoratorStackFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return VisitorDrivenHandlerDecoratorStackFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
