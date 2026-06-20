import type { IEnterpriseComputationResolutionAdapterVisitor } from "../contracts/IEnterpriseComputationResolutionAdapterVisitor.js";
import { DefaultComputationResolutionAdapterVisitorImpl } from "../impl/DefaultComputationResolutionAdapterVisitorImpl.js";

export class ComputationResolutionAdapterVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationResolutionAdapterVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-VISITOR-FACTORY";
  private static visitor: IEnterpriseComputationResolutionAdapterVisitor | null = null;

  static createVisitor(): IEnterpriseComputationResolutionAdapterVisitor {
    if (this.visitor === null) {
      this.visitor = new DefaultComputationResolutionAdapterVisitorImpl();
    }
    return this.visitor;
  }

  static getVisitor(): IEnterpriseComputationResolutionAdapterVisitor | null {
    return this.visitor;
  }

  static resetVisitor(): void {
    if (this.visitor !== null) {
      this.visitor.resetVisitorState();
    }
    this.visitor = null;
  }

  static getFactoryBeanName(): string {
    return this.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return this.FACTORY_BEAN_VERSION;
  }
}
