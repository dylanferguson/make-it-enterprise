import type { IEnterpriseFizzBuzzDocumentRenderer } from "../../contracts/IEnterpriseFizzBuzzDocumentRenderer.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import { EnterpriseFizzBuzzDocumentRendererImpl } from "../EnterpriseFizzBuzzDocumentRendererImpl.js";

export class EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DOCUMENT-RENDERER-FACTORY-BEAN";

  private static singletonRenderer: EnterpriseFizzBuzzDocumentRendererImpl | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createRenderer(): IEnterpriseFizzBuzzDocumentRenderer {
    const renderer = new EnterpriseFizzBuzzDocumentRendererImpl();
    console.debug(
      `[DocumentRendererFactoryBean] Enterprise document renderer created: ` +
      `renderer=[${renderer.getRendererName()} v${renderer.getRendererVersion()}], ` +
      `factory=[${EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.FACTORY_BEAN_VERSION}]`,
    );
    return renderer;
  }

  static createSingletonRenderer(): IEnterpriseFizzBuzzDocumentRenderer {
    if (EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.singletonRenderer === null) {
      EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.singletonRenderer =
        new EnterpriseFizzBuzzDocumentRendererImpl();
    }
    return EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.singletonRenderer;
  }

  static getRenderer(): IEnterpriseFizzBuzzDocumentRenderer | null {
    return EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.singletonRenderer;
  }

  static resetFactory(): void {
    EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.singletonRenderer = null;
    EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static isFactoryInitialized(): boolean {
    return EnterpriseFizzBuzzDocumentRendererFactoryBeanFactory.factoryInitialized;
  }
}
