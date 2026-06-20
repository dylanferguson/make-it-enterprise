export interface IFizzBuzzEnterpriseApplicationContext {
  initialize(): void;
  destroy(): void;
  getApplicationContextName(): string;
  getApplicationContextVersion(): string;
  getDeploymentDescriptorPath(): string;
  getApplicationContextStatus(): string;
  isInitialized(): boolean;
  refresh(): void;
  getRegisteredComponentNames(): readonly string[];
  hasComponent(componentName: string): boolean;
}
