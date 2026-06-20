import type { IEnterpriseApplicationBootstrapInitializer } from "../contracts/IEnterpriseApplicationBootstrapInitializer.js";

export abstract class AbstractBaseEnterpriseApplicationBootstrapInitializer
  implements IEnterpriseApplicationBootstrapInitializer
{
  protected static readonly BOOTSTRAP_FRAMEWORK_VERSION = "1.0.0-BOOTSTRAP-FRAMEWORK";
  private static readonly BOOTSTRAP_STATUS_UNINITIALIZED = "UNINITIALIZED";
  private static readonly BOOTSTRAP_STATUS_INITIALIZED = "INITIALIZED";
  private static readonly BOOTSTRAP_STATUS_DESTROYED = "DESTROYED";
  private static readonly BOOTSTRAP_STATUS_FAILED = "FAILED";

  private readonly bootstrapInitializerName: string;
  private readonly bootstrapInitializerVersion: string;
  private bootstrapStatus: string = AbstractBaseEnterpriseApplicationBootstrapInitializer.BOOTSTRAP_STATUS_UNINITIALIZED;
  private contextInitialized: boolean = false;
  private readonly deploymentDescriptorPaths: readonly string[];
  private readonly applicationContextName: string;
  private readonly applicationContextVersion: string;

  constructor(
    bootstrapInitializerName: string,
    bootstrapInitializerVersion: string,
    deploymentDescriptorPaths: readonly string[],
    applicationContextName: string,
    applicationContextVersion: string,
  ) {
    this.bootstrapInitializerName = bootstrapInitializerName;
    this.bootstrapInitializerVersion = bootstrapInitializerVersion;
    this.deploymentDescriptorPaths = deploymentDescriptorPaths;
    this.applicationContextName = applicationContextName;
    this.applicationContextVersion = applicationContextVersion;
  }

  abstract initializeApplicationContext(): void;
  abstract destroyApplicationContext(): void;

  getBootstrapInitializerName(): string {
    return this.bootstrapInitializerName;
  }

  getBootstrapInitializerVersion(): string {
    return this.bootstrapInitializerVersion;
  }

  getBootstrapInitializerStatus(): string {
    return this.bootstrapStatus;
  }

  getDeploymentDescriptorPaths(): readonly string[] {
    return [...this.deploymentDescriptorPaths];
  }

  isContextInitialized(): boolean {
    return this.contextInitialized;
  }

  getApplicationContextName(): string {
    return this.applicationContextName;
  }

  getApplicationContextVersion(): string {
    return this.applicationContextVersion;
  }

  protected markBootstrapInitialized(): void {
    this.contextInitialized = true;
    this.bootstrapStatus = AbstractBaseEnterpriseApplicationBootstrapInitializer.BOOTSTRAP_STATUS_INITIALIZED;
  }

  protected markBootstrapDestroyed(): void {
    this.contextInitialized = false;
    this.bootstrapStatus = AbstractBaseEnterpriseApplicationBootstrapInitializer.BOOTSTRAP_STATUS_DESTROYED;
  }

  protected markBootstrapFailed(): void {
    this.contextInitialized = false;
    this.bootstrapStatus = AbstractBaseEnterpriseApplicationBootstrapInitializer.BOOTSTRAP_STATUS_FAILED;
  }

  protected validateDeploymentDescriptorPaths(): void {
    if (this.deploymentDescriptorPaths.length === 0) {
      throw new Error(
        `[${this.getBootstrapInitializerName()}] No deployment descriptor paths configured. At least one descriptor is required.`,
      );
    }
    for (const path of this.deploymentDescriptorPaths) {
      if (path.trim().length === 0) {
        throw new Error(
          `[${this.getBootstrapInitializerName()}] Empty deployment descriptor path detected.`,
        );
      }
    }
  }

  protected getBootstrapFrameworkVersion(): string {
    return AbstractBaseEnterpriseApplicationBootstrapInitializer.BOOTSTRAP_FRAMEWORK_VERSION;
  }
}
