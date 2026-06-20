import type { IJmxObjectName } from "./IJmxObjectName.js";
import type { IJmxMBeanRegistration } from "./IJmxMBeanRegistration.js";

export interface IJmxMBeanServer {
  registerMBean(mbean: IJmxMBeanRegistration, objectName: IJmxObjectName): void;
  unregisterMBean(objectName: IJmxObjectName): boolean;
  getMBean(objectName: IJmxObjectName): IJmxMBeanRegistration | null;
  getMBeansByDomain(domain: string): readonly IJmxMBeanRegistration[];
  getAllMBeanObjectNames(): readonly IJmxObjectName[];
  isRegistered(objectName: IJmxObjectName): boolean;
  getMBeanCount(): number;
  getServerName(): string;
  getServerVersion(): string;
  getServerVendor(): string;
  getServerSpecificationVersion(): string;
}
