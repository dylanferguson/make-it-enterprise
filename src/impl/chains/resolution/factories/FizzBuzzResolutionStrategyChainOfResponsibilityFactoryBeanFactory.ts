import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityManager } from "../../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityManager.js";
import type { IEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../../../../contracts/IEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";
import type { IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler } from "../../../../templatemethod/contracts/IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler.js";
import type { IEnterpriseFizzBuzzResolutionAuditTrailVisitor } from "../../../../visitortrail/contracts/IEnterpriseFizzBuzzResolutionAuditTrailVisitor.js";
import { EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory } from "../../../../visitortrail/factories/EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.js";
import { ModuloBasedResolutionStrategyChainHandlerImpl } from "../ModuloBasedResolutionStrategyChainHandlerImpl.js";
import { DefaultResolutionStrategyChainHandlerImpl } from "../DefaultResolutionStrategyChainHandlerImpl.js";
import { TemplateMethodSpecificationDrivenChainHandlerImpl } from "../TemplateMethodSpecificationDrivenChainHandlerImpl.js";
import { EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl } from "../visitors/EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl.js";
import { FizzBuzzResolutionStrategyChainOfResponsibilityManagerImpl } from "../FizzBuzzResolutionStrategyChainOfResponsibilityManagerImpl.js";

export class FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CHAIN-OF-RESPONSIBILITY-FACTORY-BEAN";

  private static chainManagerSingleton: IFizzBuzzResolutionStrategyChainOfResponsibilityManager | null = null;
  private static strategySelectorVisitorSingleton: IEnterpriseFizzBuzzResolutionStrategySelectorVisitor | null = null;

  static createChainManager(
    moduloThreeHandler: (value: number, innerResolver: (value: number) => string) => string,
    moduloFiveHandler: (value: number, innerResolver: (value: number) => string) => string,
    moduloFifteenHandler: (value: number, innerResolver: (value: number) => string) => string,
    visitor?: IEnterpriseFizzBuzzResolutionStrategySelectorVisitor,
    templateMethodHandler?: IEnterpriseFizzBuzzTemplateMethodResolutionChainHandler,
    auditTrailVisitor?: IEnterpriseFizzBuzzResolutionAuditTrailVisitor,
  ): IFizzBuzzResolutionStrategyChainOfResponsibilityManager {
    if (FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.chainManagerSingleton === null) {
      FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.strategySelectorVisitorSingleton =
        visitor ?? new EnterpriseFizzBuzzResolutionStrategySelectorVisitorImpl();

      const moduloHandler = new ModuloBasedResolutionStrategyChainHandlerImpl(
        moduloThreeHandler,
        moduloFiveHandler,
        moduloFifteenHandler,
      );
      const defaultHandler = new DefaultResolutionStrategyChainHandlerImpl();

      const handlers: IFizzBuzzResolutionStrategyChainOfResponsibilityHandler[] = [
        moduloHandler,
        defaultHandler,
      ];

      if (templateMethodHandler !== null && templateMethodHandler !== undefined) {
        const effectiveAuditTrail = auditTrailVisitor
          ?? EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.createVisitor();
        const templateMethodChainHandler = new TemplateMethodSpecificationDrivenChainHandlerImpl(
          templateMethodHandler,
          effectiveAuditTrail,
          templateMethodHandler,
        );
        handlers.unshift(templateMethodChainHandler);
        console.debug(
          `[${FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.FACTORY_BEAN_NAME}] Template method handler registered as highest priority handler in chain`,
        );
      }

      FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.chainManagerSingleton =
        new FizzBuzzResolutionStrategyChainOfResponsibilityManagerImpl(
          handlers,
          FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.strategySelectorVisitorSingleton,
        );
    }
    return FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.chainManagerSingleton;
  }

  static getChainManager(): IFizzBuzzResolutionStrategyChainOfResponsibilityManager | null {
    return FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.chainManagerSingleton;
  }

  static getStrategySelectorVisitor(): IEnterpriseFizzBuzzResolutionStrategySelectorVisitor | null {
    return FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.strategySelectorVisitorSingleton;
  }

  static resetChainManager(): void {
    FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.chainManagerSingleton = null;
    FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.strategySelectorVisitorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzResolutionStrategyChainOfResponsibilityFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
