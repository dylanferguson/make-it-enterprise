import type { IFizzBuzzComputedOutcomeEntityHome } from "../entities/IFizzBuzzComputedOutcomeEntityHome.js";
import { FizzBuzzComputedOutcomeEntityHomeImpl } from "../entities/FizzBuzzComputedOutcomeEntityHomeImpl.js";

const FACTORY_BEAN_NAME = "EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-ENTITY-HOME-FACTORY-BEAN";

let entityHomeInstance: IFizzBuzzComputedOutcomeEntityHome | null = null;

export class EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory {
  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }

  static createEntityHome(): IFizzBuzzComputedOutcomeEntityHome {
    if (entityHomeInstance === null) {
      entityHomeInstance = new FizzBuzzComputedOutcomeEntityHomeImpl();
      console.debug(
        `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] ` +
        `Enterprise entity home created: ` +
        `home=[${entityHomeInstance.getHomeName()} v${entityHomeInstance.getHomeVersion()}], ` +
        `supportedEntity=[${entityHomeInstance.getSupportedEntityName()}]`,
      );
    }
    return entityHomeInstance;
  }

  static getEntityHome(): IFizzBuzzComputedOutcomeEntityHome | null {
    return entityHomeInstance;
  }

  static isHomeInitialized(): boolean {
    return entityHomeInstance !== null;
  }

  static resetHome(): void {
    entityHomeInstance = null;
    console.debug(
      `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] Entity home reset`,
    );
  }
}
