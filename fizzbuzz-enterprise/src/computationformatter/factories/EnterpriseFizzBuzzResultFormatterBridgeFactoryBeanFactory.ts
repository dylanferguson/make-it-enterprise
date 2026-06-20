import type { IEnterpriseFizzBuzzResultFormattingVisitor } from "../contracts/IEnterpriseFizzBuzzResultFormattingVisitor.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzResultFormatterBridge } from "../contracts/IEnterpriseFizzBuzzResultFormatterBridge.js";
import { AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl } from "../abstract/AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl.js";
import { StandardEnterpriseFizzBuzzResultFormatterBridgeImpl } from "../impl/StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.js";
import { FlyweightCachingResultFormatterBridgeDecoratorImpl } from "../impl/FlyweightCachingResultFormatterBridgeDecoratorImpl.js";
import { StandardEnterpriseFizzBuzzResultFormattingVisitorImpl } from "../visitors/StandardEnterpriseFizzBuzzResultFormattingVisitorImpl.js";

export class EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN-FACTORY";

  private static bridge: IEnterpriseFizzBuzzResultFormatterBridge | null = null;
  private static flyweightBridge: IEnterpriseFizzBuzzResultFormatterBridge | null = null;
  private static factoryBeanInitialized = false;

  static initializeFactoryBeanInfrastructure(): boolean {
    if (EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.factoryBeanInitialized) {
      return false;
    }
    console.debug(
      `[${EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Factory bean infrastructure initialization commenced`,
    );
    EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.factoryBeanInitialized = true;
    return true;
  }

  static createFormatterBridge(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    visitors: readonly IEnterpriseFizzBuzzResultFormattingVisitor[],
  ): IEnterpriseFizzBuzzResultFormatterBridge {
    EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.initializeFactoryBeanInfrastructure();
    const bridge = new StandardEnterpriseFizzBuzzResultFormatterBridgeImpl(wrappedFacade, visitors);
    EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.bridge = bridge;
    console.debug(
      `[${EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
      `Formatter bridge created: ` +
      `bridge=[${bridge.getBridgeName()} v${bridge.getBridgeVersion()}], ` +
      `visitorCount=[${visitors.length}], ` +
      `implementationType=[${bridge.getBridgeImplementationType()}]`,
    );
    return bridge;
  }

  static createFlyweightCachingFormatterBridge(
    bridge: AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl,
  ): IEnterpriseFizzBuzzResultFormatterBridge {
    const flyweightDecorated = new FlyweightCachingResultFormatterBridgeDecoratorImpl(bridge);
    EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.flyweightBridge = flyweightDecorated;
    console.debug(
      `[${EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
      `Flyweight caching formatter bridge decorator created: ` +
      `decorator=[${flyweightDecorated.getBridgeName()} v${flyweightDecorated.getBridgeVersion()}], ` +
      `wrappedBridge=[${bridge.getBridgeName()}]`,
    );
    return flyweightDecorated;
  }

  static createDefaultVisitors(): readonly IEnterpriseFizzBuzzResultFormattingVisitor[] {
    return [
      new StandardEnterpriseFizzBuzzResultFormattingVisitorImpl(),
    ];
  }

  static getBridge(): IEnterpriseFizzBuzzResultFormatterBridge | null {
    return EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.bridge;
  }

  static getFlyweightBridge(): IEnterpriseFizzBuzzResultFormatterBridge | null {
    return EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.flyweightBridge;
  }

  static isFactoryBeanInitialized(): boolean {
    return EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.factoryBeanInitialized;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
