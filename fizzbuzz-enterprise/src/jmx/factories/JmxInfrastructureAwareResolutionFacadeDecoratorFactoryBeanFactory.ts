import type { IJmxMBeanServer } from "../contracts/IJmxMBeanServer.js";
import type { IComputationPipelineMonitoringMBean } from "../contracts/IComputationPipelineMonitoringMBean.js";
import type { IJmxInfrastructureAwareResolutionFacadeDecorator } from "../contracts/IJmxInfrastructureAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { JmxInfrastructureAwareResolutionFacadeDecoratorImpl } from "../impl/JmxInfrastructureAwareResolutionFacadeDecoratorImpl.js";
import { JmxMBeanServerFactoryBeanFactory } from "./JmxMBeanServerFactoryBeanFactory.js";
import { ComputationPipelineMonitoringMBeanFactoryBeanFactory } from "./ComputationPipelineMonitoringMBeanFactoryBeanFactory.js";

export class JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JMX-DECORATOR-FACTORY-BEAN";

  private static decoratorSingleton: IJmxInfrastructureAwareResolutionFacadeDecorator | null = null;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    autoInitializeInfrastructure: boolean = true,
  ): IJmxInfrastructureAwareResolutionFacadeDecorator {
    if (JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton === null) {
      let jmxServer: IJmxMBeanServer;
      let monitoringMBean: IComputationPipelineMonitoringMBean;

      if (autoInitializeInfrastructure) {
        jmxServer = JmxMBeanServerFactoryBeanFactory.createMBeanServer();
        monitoringMBean =
          ComputationPipelineMonitoringMBeanFactoryBeanFactory.createMonitoringMBean();
      } else {
        const existingServer = JmxMBeanServerFactoryBeanFactory.getMBeanServer();
        const existingMBean = ComputationPipelineMonitoringMBeanFactoryBeanFactory.getMonitoringMBean();
        if (existingServer === null || existingMBean === null) {
          throw new Error(
            `[${JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
            `JMX infrastructure not initialized. Server=[${existingServer !== null ? "initialized" : "null"}], ` +
            `MBean=[${existingMBean !== null ? "initialized" : "null"}]`,
          );
        }
        jmxServer = existingServer;
        monitoringMBean = existingMBean;
      }

      JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton =
        new JmxInfrastructureAwareResolutionFacadeDecoratorImpl(
          wrappedFacade,
          monitoringMBean,
          jmxServer,
        );
    }
    return JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton!;
  }

  static getDecorator(): IJmxInfrastructureAwareResolutionFacadeDecorator | null {
    return JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton;
  }

  static isDecoratorInitialized(): boolean {
    return JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton !== null;
  }

  static resetDecorator(): void {
    JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return JmxInfrastructureAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
