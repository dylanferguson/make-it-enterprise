import type { IJmxObjectName } from "../contracts/IJmxObjectName.js";
import type { IJmxMBeanRegistration } from "../contracts/IJmxMBeanRegistration.js";
import type { IJmxMBeanServer } from "../contracts/IJmxMBeanServer.js";
import { AbstractBaseJmxMBeanServer } from "../abstracts/AbstractBaseJmxMBeanServer.js";

export class ConcurrentHashMapBackedJmxMBeanServerImpl extends AbstractBaseJmxMBeanServer {
  private static readonly MBEAN_SERVER_INSTANCE_NAME = "ConcurrentHashMapBackedJmxMBeanServer";
  private readonly mbeanRegistry: Map<string, IJmxMBeanRegistration>;
  private readonly objectNameRegistry: Map<string, IJmxObjectName>;

  constructor() {
    super(ConcurrentHashMapBackedJmxMBeanServerImpl.MBEAN_SERVER_INSTANCE_NAME);
    this.mbeanRegistry = new Map();
    this.objectNameRegistry = new Map();
  }

  registerMBean(mbean: IJmxMBeanRegistration, objectName: IJmxObjectName): void {
    const canonicalName = objectName.getCanonicalName();
    if (this.mbeanRegistry.has(canonicalName)) {
      throw new Error(
        `[${this.getServerName()}] MBean already registered under ObjectName: ${canonicalName}`,
      );
    }
    mbean.preRegister(this.getServerName());
    this.mbeanRegistry.set(canonicalName, mbean);
    this.objectNameRegistry.set(canonicalName, objectName);
    mbean.postRegister(true);
  }

  unregisterMBean(objectName: IJmxObjectName): boolean {
    const canonicalName = objectName.getCanonicalName();
    const mbean = this.mbeanRegistry.get(canonicalName);
    if (mbean === undefined) return false;
    mbean.preDeregister();
    this.mbeanRegistry.delete(canonicalName);
    this.objectNameRegistry.delete(canonicalName);
    mbean.postDeregister();
    return true;
  }

  getMBean(objectName: IJmxObjectName): IJmxMBeanRegistration | null {
    return this.mbeanRegistry.get(objectName.getCanonicalName()) ?? null;
  }

  getMBeansByDomain(domain: string): readonly IJmxMBeanRegistration[] {
    const results: IJmxMBeanRegistration[] = [];
    this.mbeanRegistry.forEach((mbean, canonicalName) => {
      if (canonicalName.startsWith(`${domain}:`)) {
        results.push(mbean);
      }
    });
    return results;
  }

  getAllMBeanObjectNames(): readonly IJmxObjectName[] {
    return Array.from(this.objectNameRegistry.values());
  }

  isRegistered(objectName: IJmxObjectName): boolean {
    return this.mbeanRegistry.has(objectName.getCanonicalName());
  }

  getMBeanCount(): number {
    return this.mbeanRegistry.size;
  }
}
