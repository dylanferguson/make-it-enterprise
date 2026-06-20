import { DefaultBatchJobExecutionMonitorImpl } from "../impl/DefaultBatchJobExecutionMonitorImpl.js";

export class FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MONITOR-FACTORY-BEAN";

  private static monitorInstance: DefaultBatchJobExecutionMonitorImpl | null = null;

  static createMonitor(): DefaultBatchJobExecutionMonitorImpl {
    if (FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.monitorInstance === null) {
      FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.monitorInstance =
        new DefaultBatchJobExecutionMonitorImpl();
    }
    return FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.monitorInstance;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    FizzBuzzBatchJobExecutionMonitorFactoryBeanFactory.monitorInstance = null;
  }
}
