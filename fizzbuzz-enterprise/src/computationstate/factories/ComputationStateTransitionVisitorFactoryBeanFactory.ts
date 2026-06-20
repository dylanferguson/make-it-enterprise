import type { IComputationStateTransitionVisitor } from "../contracts/IComputationStateTransitionVisitor.js";
import { DefaultComputationStateTransitionVisitorImpl } from "../impl/visitors/DefaultComputationStateTransitionVisitorImpl.js";

export class ComputationStateTransitionVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationStateTransitionVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-VISITOR-FACTORY";

  private static visitorSingleton: IComputationStateTransitionVisitor | null = null;

  static createVisitor(): IComputationStateTransitionVisitor {
    if (ComputationStateTransitionVisitorFactoryBeanFactory.visitorSingleton === null) {
      ComputationStateTransitionVisitorFactoryBeanFactory.visitorSingleton =
        new DefaultComputationStateTransitionVisitorImpl();
    }
    return ComputationStateTransitionVisitorFactoryBeanFactory.visitorSingleton;
  }

  static getVisitor(): IComputationStateTransitionVisitor | null {
    return ComputationStateTransitionVisitorFactoryBeanFactory.visitorSingleton;
  }

  static resetVisitor(): void {
    ComputationStateTransitionVisitorFactoryBeanFactory.visitorSingleton = null;
  }

  static isInitialized(): boolean {
    return ComputationStateTransitionVisitorFactoryBeanFactory.visitorSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return ComputationStateTransitionVisitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationStateTransitionVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
