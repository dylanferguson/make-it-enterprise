import type { IAspectWeaver } from "../contracts/IAspectWeaver.js";
import type { IAopProxyFactory } from "../contracts/IAopProxyFactory.js";

export abstract class AbstractBaseAopProxyFactory implements IAopProxyFactory {
  private readonly proxyFactoryName: string;
  private readonly proxyFactoryVersion: string;

  constructor(proxyFactoryName: string, proxyFactoryVersion: string) {
    this.proxyFactoryName = proxyFactoryName;
    this.proxyFactoryVersion = proxyFactoryVersion;
  }

  getProxyFactoryName(): string {
    return this.proxyFactoryName;
  }

  getProxyFactoryVersion(): string {
    return this.proxyFactoryVersion;
  }

  abstract createProxy<T extends object>(target: T, weaver: IAspectWeaver): T;
  abstract getUnderlyingTarget<T extends object>(proxy: T): T | null;
}
