import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationPipelineMonitoringMBean } from "./IComputationPipelineMonitoringMBean.js";

export interface IJmxInfrastructureAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getMonitoringMBean(): IComputationPipelineMonitoringMBean;
  getMBeanServerDescriptor(): string;
  isJmxInfrastructureEngaged(): boolean;
}
