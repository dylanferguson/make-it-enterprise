import { AbstractBaseLifecycleManagedBean } from "../../abstracts/AbstractBaseLifecycleManagedBean.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";

export class FizzBuzzResolverLifecycleManagedBeanImpl extends AbstractBaseLifecycleManagedBean {
  private static readonly BEAN_NAME = "FizzBuzzResolverLifecycleManagedBean";
  private static readonly BEAN_VERSION = "1.0.0-RESOLVER";
  private readonly valueResolver: ICompositeValueResolver;
  private warm = false;

  constructor(valueResolver: ICompositeValueResolver) {
    super(FizzBuzzResolverLifecycleManagedBeanImpl.BEAN_NAME, FizzBuzzResolverLifecycleManagedBeanImpl.BEAN_VERSION);
    this.valueResolver = valueResolver;
  }

  doInitialize(): void {
    console.debug(`[${FizzBuzzResolverLifecycleManagedBeanImpl.BEAN_NAME}] Initializing resolver lifecycle bean`);
  }

  doStart(): void {
    console.debug(`[${FizzBuzzResolverLifecycleManagedBeanImpl.BEAN_NAME}] Warming up value resolver`);
    this.valueResolver.resolve(1);
    this.valueResolver.resolve(3);
    this.valueResolver.resolve(5);
    this.valueResolver.resolve(15);
    this.warm = true;
  }

  doStop(): void {
    console.debug(`[${FizzBuzzResolverLifecycleManagedBeanImpl.BEAN_NAME}] Stopping resolver lifecycle bean`);
    this.warm = false;
  }

  doDestroy(): void {
    console.debug(`[${FizzBuzzResolverLifecycleManagedBeanImpl.BEAN_NAME}] Destroying resolver lifecycle bean`);
  }

  isWarm(): boolean {
    return this.warm;
  }
}
