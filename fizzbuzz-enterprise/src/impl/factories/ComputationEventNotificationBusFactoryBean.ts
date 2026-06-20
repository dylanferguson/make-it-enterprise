import type { IComputationEventNotificationBus } from "../../contracts/IComputationEventNotificationBus.js";
import type { IComputationEventNotificationBusFactory } from "../../contracts/IComputationEventNotificationBusFactory.js";
import type { IEnterpriseNamingContext } from "../../contracts/IEnterpriseNamingContext.js";
import type { ISloMetricsCollector } from "../../contracts/ISloMetricsCollector.js";
import { ComputationEventNotificationBusImpl } from "../bus/ComputationEventNotificationBusImpl.js";
import { SloMetricsComputationEventListenerImpl } from "../listeners/SloMetricsComputationEventListenerImpl.js";
import { AuditTrailComputationEventListenerImpl } from "../listeners/AuditTrailComputationEventListenerImpl.js";

export class ComputationEventNotificationBusFactoryBeanImpl
  implements IComputationEventNotificationBusFactory
{
  private static readonly FACTORY_BEAN_NAME = "ComputationEventNotificationBusFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE";

  private readonly namingContext: IEnterpriseNamingContext;
  private readonly sloMetricsCollector: ISloMetricsCollector;

  constructor(
    namingContext: IEnterpriseNamingContext,
    sloMetricsCollector: ISloMetricsCollector,
  ) {
    this.namingContext = namingContext;
    this.sloMetricsCollector = sloMetricsCollector;
  }

  createNotificationBus(): IComputationEventNotificationBus {
    console.debug(
      `[${ComputationEventNotificationBusFactoryBeanImpl.FACTORY_BEAN_NAME}:${ComputationEventNotificationBusFactoryBeanImpl.FACTORY_BEAN_VERSION}] ` +
      "Creating ComputationEventNotificationBus",
    );
    const bus = new ComputationEventNotificationBusImpl();
    const sloListener = new SloMetricsComputationEventListenerImpl(this.sloMetricsCollector);
    const auditListener = new AuditTrailComputationEventListenerImpl(this.namingContext);
    bus.registerListener(sloListener);
    bus.registerListener(auditListener);
    return bus;
  }

  getFactoryBeanName(): string {
    return ComputationEventNotificationBusFactoryBeanImpl.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return ComputationEventNotificationBusFactoryBeanImpl.FACTORY_BEAN_VERSION;
  }
}

export class ComputationEventNotificationBusFactoryBeanFactory {
  static createFactoryBean(
    namingContext: IEnterpriseNamingContext,
    sloMetricsCollector: ISloMetricsCollector,
  ): ComputationEventNotificationBusFactoryBeanImpl {
    return new ComputationEventNotificationBusFactoryBeanImpl(
      namingContext,
      sloMetricsCollector,
    );
  }
}
