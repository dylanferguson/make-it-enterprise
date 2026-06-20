import type { IJmxMBeanServer } from "../contracts/IJmxMBeanServer.js";
import type { IJmxObjectName } from "../contracts/IJmxObjectName.js";
import type { IComputationPipelineMonitoringMBean } from "../contracts/IComputationPipelineMonitoringMBean.js";
import type { IJmxInfrastructureAwareResolutionFacadeDecorator } from "../contracts/IJmxInfrastructureAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzManagementMBean } from "../../contracts/IFizzBuzzManagementMBean.js";
import { DefaultJmxObjectNameImpl } from "../impl/DefaultJmxObjectNameImpl.js";
import { JmxMBeanServerFactoryBeanFactory } from "./JmxMBeanServerFactoryBeanFactory.js";
import { ComputationPipelineMonitoringMBeanFactoryBeanFactory } from "./ComputationPipelineMonitoringMBeanFactoryBeanFactory.js";
import { JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory } from "./JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.js";

export class JmxInfrastructureFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "JmxInfrastructureFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JMX-INFRASTRUCTURE-FACTORY-BEAN";

  private static infrastructureInitialized: boolean = false;

  static initializeJmxInfrastructure(
    managementMBean: IFizzBuzzManagementMBean,
  ): boolean {
    if (JmxInfrastructureFactoryBeanFactory.infrastructureInitialized) {
      return false;
    }

    const jmxServer = JmxMBeanServerFactoryBeanFactory.createMBeanServer();
    const monitoringMBean = ComputationPipelineMonitoringMBeanFactoryBeanFactory.createMonitoringMBean();

    const managementObjectName = new DefaultJmxObjectNameImpl("FizzBuzz", {
      type: "FizzBuzzManagement",
      name: managementMBean.getMBeanName(),
    });

    const managementMBeanRegistration = {
      getMBeanName: () => managementMBean.getMBeanName(),
      getMBeanObjectName: () => managementObjectName,
      preRegister: (serverName: string) => {},
      postRegister: (success: boolean) => {},
      preDeregister: () => {},
      postDeregister: () => {},
    };

    try {
      jmxServer.registerMBean(managementMBeanRegistration, managementObjectName);
    } catch (error) {
      console.debug(
        `[JMXInfrastructure] MBean registration skipped (already registered): ` +
        `objectName=[${managementObjectName.getCanonicalName()}]`,
      );
    }

    const monitoringObjectName = new DefaultJmxObjectNameImpl("FizzBuzz", {
      type: "ComputationPipelineMonitoring",
      name: monitoringMBean.getMBeanName(),
    });

    const monitoringMBeanRegistration = {
      getMBeanName: () => monitoringMBean.getMBeanName(),
      getMBeanObjectName: () => monitoringObjectName,
      preRegister: (serverName: string) => {},
      postRegister: (success: boolean) => {},
      preDeregister: () => {},
      postDeregister: () => {},
    };

    try {
      jmxServer.registerMBean(monitoringMBeanRegistration, monitoringObjectName);
    } catch (error) {
      console.debug(
        `[JMXInfrastructure] Monitoring MBean registration skipped (already registered): ` +
        `objectName=[${monitoringObjectName.getCanonicalName()}]`,
      );
    }

    JmxInfrastructureFactoryBeanFactory.infrastructureInitialized = true;

    return true;
  }

  static isInfrastructureInitialized(): boolean {
    return JmxInfrastructureFactoryBeanFactory.infrastructureInitialized;
  }

  static getJmxServer(): IJmxMBeanServer | null {
    return JmxMBeanServerFactoryBeanFactory.getMBeanServer();
  }

  static getMonitoringMBean(): IComputationPipelineMonitoringMBean | null {
    return ComputationPipelineMonitoringMBeanFactoryBeanFactory.getMonitoringMBean();
  }

  static resetInfrastructure(): void {
    JmxInfrastructureFactoryBeanFactory.infrastructureInitialized = false;
    JmxMBeanServerFactoryBeanFactory.resetMBeanServer();
    ComputationPipelineMonitoringMBeanFactoryBeanFactory.resetMonitoringMBean();
    JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.resetDecorator();
  }

  static getFactoryBeanName(): string {
    return JmxInfrastructureFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return JmxInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
