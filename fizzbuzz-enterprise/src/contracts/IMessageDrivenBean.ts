import type { IJmsMessageListener } from "./IJmsMessageListener.js";
import type { IJmsMessage } from "./IJmsMessage.js";

export interface IMessageDrivenBean {
  getBeanName(): string;
  getBeanVersion(): string;
  getJndiName(): string;
  setMessageListener(listener: IJmsMessageListener): void;
  ejbCreate(): void;
  ejbRemove(): void;
  ejbActivate(): void;
  ejbPassivate(): void;
  setMessageDrivenContext(context: IMessageDrivenContext): void;
  onMessage(message: IJmsMessage): void;
}

export interface IMessageDrivenContext {
  getMessageDrivenContextName(): string;
  getEjbContainer(): IMessageDrivenBeanContainer;
  getTransactionConfiguration(): IJmsTransactionConfiguration;
  getTimerService(): object | null;
  setRollbackOnly(): void;
  getRollbackOnly(): boolean;
  getUserTransaction(): object | null;
}

export interface IMessageDrivenBeanContainer {
  getContainerName(): string;
  getContainerVersion(): string;
  deployMessageDrivenBean(bean: IMessageDrivenBean): void;
  undeployMessageDrivenBean(beanName: string): void;
  getDeployedBean(beanName: string): IMessageDrivenBean | null;
  getDeployedBeanNames(): readonly string[];
  getDeployedBeanCount(): number;
  initializeContainer(): void;
  shutdownContainer(): void;
  isContainerRunning(): boolean;
  getContainerTransactionConfiguration(): IJmsTransactionConfiguration;
}

export interface IJmsTransactionConfiguration {
  getTransactionConfigurationName(): string;
  getTransactionConfigurationVersion(): string;
  isTransacted(): boolean;
  getAcknowledgementMode(): string;
  getTransactionTimeout(): number;
  isContainerManagedTransaction(): boolean;
  getTransactionAttribute(): string;
}
