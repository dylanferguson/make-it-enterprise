import type { IEnterpriseFizzBuzzDocumentBuilder } from "../../contracts/IEnterpriseFizzBuzzDocumentBuilder.js";
import { EnterpriseFizzBuzzDocumentBuilderImpl } from "../EnterpriseFizzBuzzDocumentBuilderImpl.js";

export class EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DOCUMENT-BUILDER-FACTORY-BEAN";

  private static singletonBuilder: EnterpriseFizzBuzzDocumentBuilderImpl | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createBuilder(): IEnterpriseFizzBuzzDocumentBuilder {
    const builder = new EnterpriseFizzBuzzDocumentBuilderImpl();
    console.debug(
      `[DocumentBuilderFactoryBean] Enterprise document builder created: ` +
      `builder=[${builder.getBuilderName()} v${builder.getBuilderVersion()}], ` +
      `factory=[${EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.FACTORY_BEAN_VERSION}]`,
    );
    return builder;
  }

  static createSingletonBuilder(): IEnterpriseFizzBuzzDocumentBuilder {
    if (EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.singletonBuilder === null) {
      EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.singletonBuilder =
        new EnterpriseFizzBuzzDocumentBuilderImpl();
    }
    return EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.singletonBuilder;
  }

  static getBuilder(): IEnterpriseFizzBuzzDocumentBuilder | null {
    return EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.singletonBuilder;
  }

  static resetFactory(): void {
    EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.singletonBuilder = null;
    EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static isFactoryInitialized(): boolean {
    return EnterpriseFizzBuzzDocumentBuilderFactoryBeanFactory.factoryInitialized;
  }
}
