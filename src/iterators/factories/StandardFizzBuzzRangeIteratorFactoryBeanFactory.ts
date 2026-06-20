import { StandardFizzBuzzRangeIteratorImpl } from "../impl/StandardFizzBuzzRangeIteratorImpl.js";
import type { IFizzBuzzRangeIterator } from "../contracts/IFizzBuzzRangeIterator.js";

const FACTORY_BEAN_FACTORY_NAME = "StandardFizzBuzzRangeIteratorFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-ITERATOR-FACTORY-BEAN-FACTORY";

let singletonIterator: IFizzBuzzRangeIterator | null = null;

export class StandardFizzBuzzRangeIteratorFactoryBeanFactory {
  static createIterator(
    rangeStart: number,
    rangeEnd: number,
    innerResolver: (value: number) => string,
    singleton: boolean = false,
  ): IFizzBuzzRangeIterator {
    const iterator = new StandardFizzBuzzRangeIteratorImpl(rangeStart, rangeEnd, innerResolver);
    if (singleton) {
      singletonIterator = iterator;
    }
    console.debug(
      `[${FACTORY_BEAN_FACTORY_NAME}] Created iterator for range [${rangeStart}, ${rangeEnd}] ` +
      `(singleton=${singleton}, name=${iterator.getIteratorName()} v${iterator.getIteratorVersion()})`,
    );
    return iterator;
  }

  static getSingletonIterator(): IFizzBuzzRangeIterator | null {
    return singletonIterator;
  }

  static resetSingletonIterator(): void {
    singletonIterator = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
