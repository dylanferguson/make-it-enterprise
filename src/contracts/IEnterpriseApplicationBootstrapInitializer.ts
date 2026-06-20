export interface IEnterpriseApplicationBootstrapInitializer {
  initializeApplicationContext(): void;
  destroyApplicationContext(): void;
  getBootstrapInitializerName(): string;
  getBootstrapInitializerVersion(): string;
  getBootstrapInitializerStatus(): string;
  getDeploymentDescriptorPaths(): readonly string[];
  isContextInitialized(): boolean;
  getApplicationContextName(): string;
  getApplicationContextVersion(): string;
}
