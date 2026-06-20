import type { IResolutionDelegationVisitor } from "../contracts/IResolutionDelegationVisitor.js";
import { AuditingResolutionDelegationVisitorImpl } from "../impl/AuditingResolutionDelegationVisitorImpl.js";

export class ResolutionDelegationVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ResolutionDelegationVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DELEGATION-VISITOR-FACTORY-BEAN";

  private static visitorSingleton: IResolutionDelegationVisitor | null = null;

  static createVisitor(): IResolutionDelegationVisitor {
    if (ResolutionDelegationVisitorFactoryBeanFactory.visitorSingleton === null) {
      ResolutionDelegationVisitorFactoryBeanFactory.visitorSingleton =
        new AuditingResolutionDelegationVisitorImpl();
    }
    return ResolutionDelegationVisitorFactoryBeanFactory.visitorSingleton;
  }

  static getVisitor(): IResolutionDelegationVisitor | null {
    return ResolutionDelegationVisitorFactoryBeanFactory.visitorSingleton;
  }

  static resetVisitor(): void {
    ResolutionDelegationVisitorFactoryBeanFactory.visitorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return ResolutionDelegationVisitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ResolutionDelegationVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
