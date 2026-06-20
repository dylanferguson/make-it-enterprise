import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "../contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";
import type { IDivisibilitySpecificationRegistry } from "../../specification/contracts/IDivisibilitySpecificationRegistry.js";
import type { IModuloArithmeticCommandInvoker } from "../../moduloarithmeticcommand/contracts/IModuloArithmeticCommandInvoker.js";
import type { IModuloArithmeticCommand } from "../../moduloarithmeticcommand/contracts/IModuloArithmeticCommand.js";
import { SpecificationDrivenEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerImpl } from "../impl/SpecificationDrivenEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerImpl.js";
import { AuditTrailingTemplateMethodResolutionChainHandlerDecoratorImpl } from "../impl/AuditTrailingTemplateMethodResolutionChainHandlerDecoratorImpl.js";
import { DivisibilitySpecificationStrategyFactoryBeanFactory } from "../../specification/factories/DivisibilitySpecificationStrategyFactoryBeanFactory.js";
import { ModuloArithmeticCommandInvokerFactoryBeanFactory } from "../../moduloarithmeticcommand/factories/ModuloArithmeticCommandInvokerFactoryBeanFactory.js";

export class TemplateMethodResolutionChainHandlerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "TemplateMethodResolutionChainHandlerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-TEMPLATE-METHOD-FACTORY-BEAN-FACTORY";

  private static baseHandlerSingleton: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler | null = null;
  private static decoratedHandlerSingleton: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler | null = null;

  static createBaseHandler(): IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler {
    if (TemplateMethodResolutionChainHandlerFactoryBeanFactory.baseHandlerSingleton === null) {
      const registry = DivisibilitySpecificationStrategyFactoryBeanFactory.createRegistry();
      const invoker = ModuloArithmeticCommandInvokerFactoryBeanFactory.createInvoker();
      const command = ModuloArithmeticCommandInvokerFactoryBeanFactory.getCommand();

      if (command === null) {
        throw new Error("[TemplateMethodResolutionChainHandlerFactoryBeanFactory] Modulo arithmetic command not available");
      }

      TemplateMethodResolutionChainHandlerFactoryBeanFactory.baseHandlerSingleton =
        new SpecificationDrivenEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerImpl(
          registry,
          invoker,
          command,
        );
    }
    return TemplateMethodResolutionChainHandlerFactoryBeanFactory.baseHandlerSingleton;
  }

  static createDecoratedHandler(): IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler {
    if (TemplateMethodResolutionChainHandlerFactoryBeanFactory.decoratedHandlerSingleton === null) {
      const base = TemplateMethodResolutionChainHandlerFactoryBeanFactory.createBaseHandler();
      const auditDecorator = new AuditTrailingTemplateMethodResolutionChainHandlerDecoratorImpl(base);
      TemplateMethodResolutionChainHandlerFactoryBeanFactory.decoratedHandlerSingleton = auditDecorator;
    }
    return TemplateMethodResolutionChainHandlerFactoryBeanFactory.decoratedHandlerSingleton;
  }

  static getBaseHandler(): IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler | null {
    return TemplateMethodResolutionChainHandlerFactoryBeanFactory.baseHandlerSingleton;
  }

  static getDecoratedHandler(): IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler | null {
    return TemplateMethodResolutionChainHandlerFactoryBeanFactory.decoratedHandlerSingleton;
  }

  static getFactoryBeanFactoryName(): string {
    return TemplateMethodResolutionChainHandlerFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return TemplateMethodResolutionChainHandlerFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
