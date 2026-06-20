import type { IJmxObjectName } from "../contracts/IJmxObjectName.js";
import type { IJmxMBeanServer } from "../contracts/IJmxMBeanServer.js";
import type { IJmxMBeanRegistration } from "../contracts/IJmxMBeanRegistration.js";

export abstract class AbstractBaseJmxMBeanServer implements IJmxMBeanServer {
  private static readonly MBEAN_SERVER_DEFAULT_NAME = "AbstractBaseJmxMBeanServer";
  private static readonly MBEAN_SERVER_DEFAULT_VERSION = "1.0.0-JMX-SERVER";
  private static readonly MBEAN_SERVER_VENDOR = "FizzBuzzEnterprisePlatform";
  private static readonly MBEAN_SERVER_SPEC_VERSION = "1.4-JMX-SPEC";

  protected readonly serverName: string;
  protected readonly serverVersion: string;

  constructor(serverName: string = AbstractBaseJmxMBeanServer.MBEAN_SERVER_DEFAULT_NAME) {
    this.serverName = serverName;
    this.serverVersion = AbstractBaseJmxMBeanServer.MBEAN_SERVER_DEFAULT_VERSION;
  }

  getServerName(): string {
    return this.serverName;
  }

  getServerVersion(): string {
    return this.serverVersion;
  }

  getServerVendor(): string {
    return AbstractBaseJmxMBeanServer.MBEAN_SERVER_VENDOR;
  }

  getServerSpecificationVersion(): string {
    return AbstractBaseJmxMBeanServer.MBEAN_SERVER_SPEC_VERSION;
  }

  abstract registerMBean(mbean: IJmxMBeanRegistration, objectName: IJmxObjectName): void;
  abstract unregisterMBean(objectName: IJmxObjectName): boolean;
  abstract getMBean(objectName: IJmxObjectName): IJmxMBeanRegistration | null;
  abstract getMBeansByDomain(domain: string): readonly IJmxMBeanRegistration[];
  abstract getAllMBeanObjectNames(): readonly IJmxObjectName[];
  abstract isRegistered(objectName: IJmxObjectName): boolean;
  abstract getMBeanCount(): number;
}
