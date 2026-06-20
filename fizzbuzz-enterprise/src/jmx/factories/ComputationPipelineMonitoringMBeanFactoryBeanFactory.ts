import type { IComputationPipelineMonitoringMBean } from "../contracts/IComputationPipelineMonitoringMBean.js";
import { ComputationPipelineMonitoringMBeanImpl } from "../impl/ComputationPipelineMonitoringMBeanImpl.js";

export class ComputationPipelineMonitoringMBeanFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationPipelineMonitoringMBeanFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PIPELINE-MONITORING-MBEAN-FACTORY-BEAN";

  private static monitoringMBeanSingleton: IComputationPipelineMonitoringMBean | null = null;

  static createMonitoringMBean(): IComputationPipelineMonitoringMBean {
    if (ComputationPipelineMonitoringMBeanFactoryBeanFactory.monitoringMBeanSingleton === null) {
      ComputationPipelineMonitoringMBeanFactoryBeanFactory.monitoringMBeanSingleton =
        new ComputationPipelineMonitoringMBeanImpl();
    }
    return ComputationPipelineMonitoringMBeanFactoryBeanFactory.monitoringMBeanSingleton;
  }

  static getMonitoringMBean(): IComputationPipelineMonitoringMBean | null {
    return ComputationPipelineMonitoringMBeanFactoryBeanFactory.monitoringMBeanSingleton;
  }

  static isMonitoringMBeanInitialized(): boolean {
    return ComputationPipelineMonitoringMBeanFactoryBeanFactory.monitoringMBeanSingleton !== null;
  }

  static resetMonitoringMBean(): void {
    ComputationPipelineMonitoringMBeanFactoryBeanFactory.monitoringMBeanSingleton = null;
  }

  static getFactoryBeanName(): string {
    return ComputationPipelineMonitoringMBeanFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationPipelineMonitoringMBeanFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
