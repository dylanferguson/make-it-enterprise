import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationPipelineMonitoringMBean } from "../contracts/IComputationPipelineMonitoringMBean.js";
import type { IJmxInfrastructureAwareResolutionFacadeDecorator } from "../contracts/IJmxInfrastructureAwareResolutionFacadeDecorator.js";
import type { IJmxMBeanServer } from "../contracts/IJmxMBeanServer.js";

export class JmxInfrastructureAwareResolutionFacadeDecoratorImpl
  implements IJmxInfrastructureAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "JmxInfrastructureAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-JMX-DECORATOR";

  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly monitoringMBean: IComputationPipelineMonitoringMBean;
  private readonly jmxMBeanServer: IJmxMBeanServer;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    monitoringMBean: IComputationPipelineMonitoringMBean,
    jmxMBeanServer: IJmxMBeanServer,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.monitoringMBean = monitoringMBean;
    this.jmxMBeanServer = jmxMBeanServer;
  }

  resolveValue(value: number): string {
    const startTime = Date.now();
    try {
      const result = this.wrappedFacade.resolveValue(value);
      const durationMs = Date.now() - startTime;
      this.monitoringMBean.recordSingleValueResolution(value, durationMs);
      return result;
    } catch (error) {
      const durationMs = Date.now() - startTime;
      this.monitoringMBean.recordResolutionFailure(
        value,
        error instanceof Error ? error.message : "Unknown error",
      );
      throw error;
    }
  }

  resolveRange(start: number, end: number): readonly string[] {
    const startTime = Date.now();
    try {
      const results = this.wrappedFacade.resolveRange(start, end);
      const durationMs = Date.now() - startTime;
      this.monitoringMBean.recordRangeResolution(start, end, durationMs, results.length);
      return results;
    } catch (error) {
      throw error;
    }
  }

  getFacadeName(): string {
    return `${JmxInfrastructureAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}[delegate=${this.wrappedFacade.getFacadeName()}]`;
  }

  getFacadeVersion(): string {
    return JmxInfrastructureAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getMonitoringMBean(): IComputationPipelineMonitoringMBean {
    return this.monitoringMBean;
  }

  getMBeanServerDescriptor(): string {
    return `${this.jmxMBeanServer.getServerName()} v${this.jmxMBeanServer.getServerVersion()}`;
  }

  isJmxInfrastructureEngaged(): boolean {
    return this.jmxMBeanServer.getMBeanCount() > 0;
  }
}
