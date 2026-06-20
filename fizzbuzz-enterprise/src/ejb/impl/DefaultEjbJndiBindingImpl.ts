import type { IEjbJndiBinding } from "../contracts/IEjbJndiBinding.js";

export class DefaultEjbJndiBindingImpl implements IEjbJndiBinding {
  private static readonly BINDING_NAME = "DefaultEjbJndiBinding";
  private static readonly BINDING_VERSION = "1.0.0-EJB-JNDI-BINDING";

  private readonly jndiName: string;
  private readonly homeInterfaceClassName: string;
  private readonly remoteInterfaceClassName: string;
  private readonly ejbClassName: string;

  constructor(
    jndiName: string,
    homeInterfaceClassName: string,
    remoteInterfaceClassName: string,
    ejbClassName: string,
  ) {
    this.jndiName = jndiName;
    this.homeInterfaceClassName = homeInterfaceClassName;
    this.remoteInterfaceClassName = remoteInterfaceClassName;
    this.ejbClassName = ejbClassName;
  }

  getBindingName(): string {
    return DefaultEjbJndiBindingImpl.BINDING_NAME;
  }

  getBindingVersion(): string {
    return DefaultEjbJndiBindingImpl.BINDING_VERSION;
  }

  getJndiName(): string {
    return this.jndiName;
  }

  getHomeInterfaceClassName(): string {
    return this.homeInterfaceClassName;
  }

  getRemoteInterfaceClassName(): string {
    return this.remoteInterfaceClassName;
  }

  getEjbClassName(): string {
    return this.ejbClassName;
  }
}
