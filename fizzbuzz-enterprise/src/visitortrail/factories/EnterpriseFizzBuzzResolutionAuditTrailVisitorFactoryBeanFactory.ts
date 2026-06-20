import type { IEnterpriseFizzBuzzResolutionAuditTrailVisitor } from "../contracts/IEnterpriseFizzBuzzResolutionAuditTrailVisitor.js";
import { StandardEnterpriseFizzBuzzResolutionAuditTrailVisitorImpl } from "../impl/StandardEnterpriseFizzBuzzResolutionAuditTrailVisitorImpl.js";

export class EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-AUDIT-VISITOR-FACTORY-BEAN-FACTORY";

  private static visitorSingleton: IEnterpriseFizzBuzzResolutionAuditTrailVisitor | null = null;

  static createVisitor(): IEnterpriseFizzBuzzResolutionAuditTrailVisitor {
    if (EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.visitorSingleton === null) {
      EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.visitorSingleton =
        new StandardEnterpriseFizzBuzzResolutionAuditTrailVisitorImpl();
    }
    return EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.visitorSingleton;
  }

  static getVisitor(): IEnterpriseFizzBuzzResolutionAuditTrailVisitor | null {
    return EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.visitorSingleton;
  }

  static getFactoryBeanFactoryName(): string {
    return EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return EnterpriseFizzBuzzResolutionAuditTrailVisitorFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
