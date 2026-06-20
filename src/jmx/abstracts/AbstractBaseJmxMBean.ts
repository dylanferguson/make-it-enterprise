import type { IJmxObjectName } from "../contracts/IJmxObjectName.js";
import type { IJmxMBeanRegistration } from "../contracts/IJmxMBeanRegistration.js";

export abstract class AbstractBaseJmxMBean implements IJmxMBeanRegistration {
  private static readonly MBEAN_DEFAULT_NAME = "AbstractBaseJmxMBean";
  private static readonly MBEAN_DEFAULT_VERSION = "1.0.0-JMX-MBEAN";

  protected readonly mbeanName: string;
  protected readonly mbeanType: string;
  protected readonly mbeanObjectName: IJmxObjectName;
  protected registered: boolean = false;
  protected serverName: string | null = null;

  constructor(mbeanName: string, mbeanObjectName: IJmxObjectName, mbeanType: string) {
    this.mbeanName = mbeanName;
    this.mbeanObjectName = mbeanObjectName;
    this.mbeanType = mbeanType;
  }

  getMBeanName(): string {
    return this.mbeanName;
  }

  getMBeanObjectName(): IJmxObjectName {
    return this.mbeanObjectName;
  }

  preRegister(serverName: string): void {
    this.serverName = serverName;
  }

  postRegister(registrationSuccess: boolean): void {
    this.registered = registrationSuccess;
  }

  preDeregister(): void {
    this.registered = false;
  }

  postDeregister(): void {
    this.serverName = null;
  }

  isRegistered(): boolean {
    return this.registered;
  }

  protected getMBeanBaseName(): string {
    return AbstractBaseJmxMBean.MBEAN_DEFAULT_NAME;
  }

  protected getMBeanBaseVersion(): string {
    return AbstractBaseJmxMBean.MBEAN_DEFAULT_VERSION;
  }
}
