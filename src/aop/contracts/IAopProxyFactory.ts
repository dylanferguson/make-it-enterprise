import type { IAspectWeaver } from "./IAspectWeaver.js";

export interface IAopProxyFactory {
  getProxyFactoryName(): string;
  getProxyFactoryVersion(): string;
  createProxy<T extends object>(target: T, weaver: IAspectWeaver): T;
  getUnderlyingTarget<T extends object>(proxy: T): T | null;
}
