import type { IEjbHome } from "../contracts/IEjbHome.js";

export abstract class AbstractBaseEjbHome implements IEjbHome {
  private readonly homeName: string;
  private readonly homeVersion: string;
  private readonly jndiBindingName: string;

  constructor(homeName: string, homeVersion: string, jndiBindingName: string) {
    this.homeName = homeName;
    this.homeVersion = homeVersion;
    this.jndiBindingName = jndiBindingName;
  }

  getHomeName(): string {
    return this.homeName;
  }

  getHomeVersion(): string {
    return this.homeVersion;
  }

  getJndiBindingName(): string {
    return this.jndiBindingName;
  }

  abstract create(): import("../contracts/IEjbObject.js").IEjbObject;
  abstract remove(handle: string): void;
}
