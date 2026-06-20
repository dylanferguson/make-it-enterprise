import type { IEnterpriseFizzBuzzDocumentVisitor } from "../../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { EnterpriseFizzBuzzDocumentVisitorImpl } from "../EnterpriseFizzBuzzDocumentVisitorImpl.js";

export class EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DOCUMENT-VISITOR-FACTORY-BEAN";

  private static singletonVisitor: EnterpriseFizzBuzzDocumentVisitorImpl | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createVisitor(): IEnterpriseFizzBuzzDocumentVisitor {
    const visitor = new EnterpriseFizzBuzzDocumentVisitorImpl();
    console.debug(
      `[DocumentVisitorFactoryBean] Enterprise document visitor created: ` +
      `visitor=[${visitor.getVisitorName()} v${visitor.getVisitorVersion()}], ` +
      `factory=[${EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION}]`,
    );
    return visitor;
  }

  static createSingletonVisitor(): IEnterpriseFizzBuzzDocumentVisitor {
    if (EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.singletonVisitor === null) {
      EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.singletonVisitor =
        new EnterpriseFizzBuzzDocumentVisitorImpl();
    }
    return EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.singletonVisitor;
  }

  static getVisitor(): IEnterpriseFizzBuzzDocumentVisitor | null {
    return EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.singletonVisitor;
  }

  static resetFactory(): void {
    EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.singletonVisitor = null;
    EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static isFactoryInitialized(): boolean {
    return EnterpriseFizzBuzzDocumentVisitorFactoryBeanFactory.factoryInitialized;
  }
}
