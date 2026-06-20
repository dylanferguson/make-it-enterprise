import type { IDocumentAwareResolutionFacadeDecorator } from "../../contracts/IDocumentAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzDocumentBuilder } from "../../contracts/IEnterpriseFizzBuzzDocumentBuilder.js";
import type { IEnterpriseFizzBuzzDocumentVisitor } from "../../contracts/IEnterpriseFizzBuzzDocumentVisitor.js";
import type { IEnterpriseFizzBuzzDocumentRenderer } from "../../contracts/IEnterpriseFizzBuzzDocumentRenderer.js";
import { DefaultDocumentAwareResolutionFacadeDecoratorImpl } from "../DefaultDocumentAwareResolutionFacadeDecoratorImpl.js";

export class EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DOCUMENT-AWARE-DECORATOR-FACTORY-BEAN";

  private static initialized = false;
  private static decoratorCache: DefaultDocumentAwareResolutionFacadeDecoratorImpl | null = null;

  static initializeInfrastructure(): boolean {
    if (EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.initialized) {
      return false;
    }
    EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.initialized = true;
    return true;
  }

  static createDecorator(
    facade: IFizzBuzzSingleValueResolutionFacade,
    builder: IEnterpriseFizzBuzzDocumentBuilder,
    visitor: IEnterpriseFizzBuzzDocumentVisitor,
    renderer: IEnterpriseFizzBuzzDocumentRenderer,
  ): IDocumentAwareResolutionFacadeDecorator {
    const decorator = new DefaultDocumentAwareResolutionFacadeDecoratorImpl(
      facade,
      builder,
      visitor,
      renderer,
    );
    console.debug(
      `[DocumentAwareDecoratorFactoryBean] Enterprise document-aware resolution decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `facade=[${decorator.getFacadeName()}], ` +
      `documentProcessingEnabled=[${decorator.isDocumentProcessingEnabled()}], ` +
      `factory=[${EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}]`,
    );
    return decorator;
  }

  static createSingletonDecorator(
    facade: IFizzBuzzSingleValueResolutionFacade,
    builder: IEnterpriseFizzBuzzDocumentBuilder,
    visitor: IEnterpriseFizzBuzzDocumentVisitor,
    renderer: IEnterpriseFizzBuzzDocumentRenderer,
  ): IDocumentAwareResolutionFacadeDecorator {
    if (EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache === null) {
      EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache =
        new DefaultDocumentAwareResolutionFacadeDecoratorImpl(facade, builder, visitor, renderer);
    }
    return EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache;
  }

  static getDecorator(): IDocumentAwareResolutionFacadeDecorator | null {
    return EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache;
  }

  static reset(): void {
    EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache = null;
    EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.initialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzDocumentAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
