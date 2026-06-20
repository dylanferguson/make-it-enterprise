import { AbstractBaseLifecycleManagedBean } from "../../abstracts/AbstractBaseLifecycleManagedBean.js";
import type { IEnterpriseApplicationContext } from "../../contracts/IEnterpriseApplicationContext.js";

export class FizzBuzzContainerManagedBeanImpl extends AbstractBaseLifecycleManagedBean {
  private static readonly BEAN_NAME = "FizzBuzzContainerManagedBean";
  private static readonly BEAN_VERSION = "1.0.0-CONTAINER-MANAGED";
  private readonly applicationContext: IEnterpriseApplicationContext;
  private initialized = false;

  constructor(applicationContext: IEnterpriseApplicationContext) {
    super(FizzBuzzContainerManagedBeanImpl.BEAN_NAME, FizzBuzzContainerManagedBeanImpl.BEAN_VERSION);
    this.applicationContext = applicationContext;
  }

  doInitialize(): void {
    console.debug(`[${FizzBuzzContainerManagedBeanImpl.BEAN_NAME}] Initializing container-managed bean`);
    const serviceLocator = this.applicationContext.getServiceLocator();
    serviceLocator.getValueResolver();
    this.initialized = true;
  }

  doStart(): void {
    console.debug(`[${FizzBuzzContainerManagedBeanImpl.BEAN_NAME}] Starting container-managed bean`);
    const healthAggregator = this.applicationContext.getHealthCheckAggregator();
    const systemHealthy = healthAggregator.isSystemHealthy();
    const unhealthyComponents = healthAggregator.getUnhealthyComponents();
    if (!systemHealthy && unhealthyComponents.length > 0) {
      console.warn(
        `[${FizzBuzzContainerManagedBeanImpl.BEAN_NAME}] Unhealthy components during startup: ${unhealthyComponents.join(", ")}`,
      );
    }
  }

  doStop(): void {
    console.debug(`[${FizzBuzzContainerManagedBeanImpl.BEAN_NAME}] Stopping container-managed bean`);
  }

  doDestroy(): void {
    console.debug(`[${FizzBuzzContainerManagedBeanImpl.BEAN_NAME}] Destroying container-managed bean`);
    this.initialized = false;
  }

  isContainerInitialized(): boolean {
    return this.initialized;
  }
}
