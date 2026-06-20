import type { IRemainderOperatorDelegationService } from "./IRemainderOperatorDelegationService.js";

export interface IRemainderOperatorDelegationServiceFactoryBean {
  createDelegationService(): IRemainderOperatorDelegationService;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
}

export interface IRemainderOperatorDelegationServiceFactoryBeanFactory {
  createFactoryBean(name?: string): IRemainderOperatorDelegationServiceFactoryBean;
}
