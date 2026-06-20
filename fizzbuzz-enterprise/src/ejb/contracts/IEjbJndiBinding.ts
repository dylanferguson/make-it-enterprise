export interface IEjbJndiBinding {
  getBindingName(): string;
  getBindingVersion(): string;
  getJndiName(): string;
  getHomeInterfaceClassName(): string;
  getRemoteInterfaceClassName(): string;
  getEjbClassName(): string;
}
