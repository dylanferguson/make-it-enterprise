import type { IMessageDrivenBean, IMessageDrivenContext, IMessageDrivenBeanContainer, IJmsTransactionConfiguration } from "../contracts/IMessageDrivenBean.js";
import type { IJmsMessageListener } from "../contracts/IJmsMessageListener.js";
import type { IJmsMessage } from "../contracts/IJmsMessage.js";

export abstract class AbstractBaseMessageDrivenBean implements IMessageDrivenBean {
  private readonly beanName: string;
  private readonly beanVersion: string;
  private readonly jndiName: string;
  protected messageDrivenContext: IMessageDrivenContext | null;
  protected messageListener: IJmsMessageListener | null;
  protected processedMessageCount: number;

  constructor(beanName: string, beanVersion: string, jndiName: string) {
    this.beanName = beanName;
    this.beanVersion = beanVersion;
    this.jndiName = jndiName;
    this.messageDrivenContext = null;
    this.messageListener = null;
    this.processedMessageCount = 0;
  }

  abstract onMessage(message: IJmsMessage): void;
  abstract ejbCreate(): void;
  abstract ejbRemove(): void;
  abstract ejbActivate(): void;
  abstract ejbPassivate(): void;

  getBeanName(): string { return this.beanName; }
  getBeanVersion(): string { return this.beanVersion; }
  getJndiName(): string { return this.jndiName; }

  setMessageListener(listener: IJmsMessageListener): void { this.messageListener = listener; }

  setMessageDrivenContext(context: IMessageDrivenContext): void {
    this.messageDrivenContext = context;
  }
}

export abstract class AbstractBaseMessageDrivenContext implements IMessageDrivenContext {
  private readonly contextName: string;
  private readonly ejbContainer: IMessageDrivenBeanContainer;
  private readonly transactionConfiguration: IJmsTransactionConfiguration;
  private rollbackOnly: boolean;

  constructor(contextName: string, ejbContainer: IMessageDrivenBeanContainer, transactionConfiguration: IJmsTransactionConfiguration) {
    this.contextName = contextName;
    this.ejbContainer = ejbContainer;
    this.transactionConfiguration = transactionConfiguration;
    this.rollbackOnly = false;
  }

  getMessageDrivenContextName(): string { return this.contextName; }
  getEjbContainer(): IMessageDrivenBeanContainer { return this.ejbContainer; }
  getTransactionConfiguration(): IJmsTransactionConfiguration { return this.transactionConfiguration; }
  getTimerService(): object | null { return null; }
  setRollbackOnly(): void { this.rollbackOnly = true; }
  getRollbackOnly(): boolean { return this.rollbackOnly; }
  getUserTransaction(): object | null { return null; }
}

export abstract class AbstractBaseMessageDrivenBeanContainer implements IMessageDrivenBeanContainer {
  private readonly containerName: string;
  private readonly containerVersion: string;
  private running: boolean;
  protected deployedBeans: Map<string, IMessageDrivenBean>;
  protected readonly transactionConfiguration: IJmsTransactionConfiguration;

  constructor(containerName: string, containerVersion: string, transactionConfiguration: IJmsTransactionConfiguration) {
    this.containerName = containerName;
    this.containerVersion = containerVersion;
    this.running = false;
    this.deployedBeans = new Map();
    this.transactionConfiguration = transactionConfiguration;
  }

  abstract deployMessageDrivenBean(bean: IMessageDrivenBean): void;
  abstract undeployMessageDrivenBean(beanName: string): void;
  abstract initializeContainer(): void;
  abstract shutdownContainer(): void;

  getContainerName(): string { return this.containerName; }
  getContainerVersion(): string { return this.containerVersion; }
  getDeployedBean(beanName: string): IMessageDrivenBean | null { return this.deployedBeans.get(beanName) ?? null; }
  getDeployedBeanNames(): readonly string[] { return Array.from(this.deployedBeans.keys()); }
  getDeployedBeanCount(): number { return this.deployedBeans.size; }
  isContainerRunning(): boolean { return this.running; }
  getContainerTransactionConfiguration(): IJmsTransactionConfiguration { return this.transactionConfiguration; }

  protected setRunning(running: boolean): void { this.running = running; }
}

export abstract class AbstractBaseJmsTransactionConfiguration implements IJmsTransactionConfiguration {
  private readonly configName: string;
  private readonly configVersion: string;
  private readonly transacted: boolean;
  private readonly acknowledgementMode: string;
  private readonly transactionTimeout: number;
  private readonly containerManagedTransaction: boolean;
  private readonly transactionAttribute: string;

  constructor(configName: string, configVersion: string, transacted: boolean, acknowledgementMode: string, transactionTimeout: number, containerManagedTransaction: boolean, transactionAttribute: string) {
    this.configName = configName;
    this.configVersion = configVersion;
    this.transacted = transacted;
    this.acknowledgementMode = acknowledgementMode;
    this.transactionTimeout = transactionTimeout;
    this.containerManagedTransaction = containerManagedTransaction;
    this.transactionAttribute = transactionAttribute;
  }

  getTransactionConfigurationName(): string { return this.configName; }
  getTransactionConfigurationVersion(): string { return this.configVersion; }
  isTransacted(): boolean { return this.transacted; }
  getAcknowledgementMode(): string { return this.acknowledgementMode; }
  getTransactionTimeout(): number { return this.transactionTimeout; }
  isContainerManagedTransaction(): boolean { return this.containerManagedTransaction; }
  getTransactionAttribute(): string { return this.transactionAttribute; }
}
