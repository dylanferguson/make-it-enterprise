import type { IFizzBuzzEnterpriseApplicationContext } from "../contracts/IFizzBuzzEnterpriseApplicationContext.js";

export abstract class AbstractBaseFizzBuzzEnterpriseApplicationContext
  implements IFizzBuzzEnterpriseApplicationContext
{
  protected static readonly APPLICATION_CONTEXT_FRAMEWORK_VERSION = "1.0.0-ENTERPRISE-APPLICATION-CONTEXT-FRAMEWORK";
  private static readonly DEFAULT_CONTEXT_NAME = "FizzBuzzEnterpriseApplicationContext";
  private static readonly DEFAULT_CONTEXT_VERSION = "1.0.0";
  private static readonly DEFAULT_DEPLOYMENT_DESCRIPTOR_PATH = "META-INF/ejb-jar.xml";
  private static readonly CONTEXT_STATE_UNINITIALIZED = "UNINITIALIZED";
  private static readonly CONTEXT_STATE_INITIALIZED = "INITIALIZED";
  private static readonly CONTEXT_STATE_DESTROYED = "DESTROYED";
  private static readonly CONTEXT_STATE_REFRESHING = "REFRESHING";
  private static readonly CONTEXT_STATE_FAILED = "FAILED";

  private readonly applicationContextName: string;
  private readonly applicationContextVersion: string;
  private readonly deploymentDescriptorPath: string;
  private contextStatus: string = AbstractBaseFizzBuzzEnterpriseApplicationContext.CONTEXT_STATE_UNINITIALIZED;
  private contextInitialized: boolean = false;
  private contextInitializationTimestamp: number = 0;
  protected readonly registeredComponents: Map<string, object> = new Map();

  constructor(
    applicationContextName: string = AbstractBaseFizzBuzzEnterpriseApplicationContext.DEFAULT_CONTEXT_NAME,
    applicationContextVersion: string = AbstractBaseFizzBuzzEnterpriseApplicationContext.DEFAULT_CONTEXT_VERSION,
    deploymentDescriptorPath: string = AbstractBaseFizzBuzzEnterpriseApplicationContext.DEFAULT_DEPLOYMENT_DESCRIPTOR_PATH,
  ) {
    this.applicationContextName = applicationContextName;
    this.applicationContextVersion = applicationContextVersion;
    this.deploymentDescriptorPath = deploymentDescriptorPath;
  }

  abstract initialize(): void;
  abstract destroy(): void;
  abstract refresh(): void;

  getApplicationContextName(): string {
    return this.applicationContextName;
  }

  getApplicationContextVersion(): string {
    return this.applicationContextVersion;
  }

  getDeploymentDescriptorPath(): string {
    return this.deploymentDescriptorPath;
  }

  getApplicationContextStatus(): string {
    return this.contextStatus;
  }

  isInitialized(): boolean {
    return this.contextInitialized;
  }

  getRegisteredComponentNames(): readonly string[] {
    return [...this.registeredComponents.keys()];
  }

  hasComponent(componentName: string): boolean {
    return this.registeredComponents.has(componentName);
  }

  getContextInitializationTimestamp(): number {
    return this.contextInitializationTimestamp;
  }

  protected markInitialized(): void {
    this.contextInitialized = true;
    this.contextInitializationTimestamp = Date.now();
    this.contextStatus = AbstractBaseFizzBuzzEnterpriseApplicationContext.CONTEXT_STATE_INITIALIZED;
  }

  protected markDestroyed(): void {
    this.contextInitialized = false;
    this.contextStatus = AbstractBaseFizzBuzzEnterpriseApplicationContext.CONTEXT_STATE_DESTROYED;
  }

  protected markRefreshing(): void {
    this.contextStatus = AbstractBaseFizzBuzzEnterpriseApplicationContext.CONTEXT_STATE_REFRESHING;
  }

  protected markFailed(): void {
    this.contextInitialized = false;
    this.contextStatus = AbstractBaseFizzBuzzEnterpriseApplicationContext.CONTEXT_STATE_FAILED;
  }

  protected assertNotInitialized(): void {
    if (this.contextInitialized) {
      throw new Error(
        `[${this.getApplicationContextName()}] Application context is already initialized. Call destroy() or refresh() first.`,
      );
    }
  }

  protected assertInitialized(): void {
    if (!this.contextInitialized) {
      throw new Error(
        `[${this.getApplicationContextName()}] Application context is not initialized. Call initialize() first.`,
      );
    }
  }

  protected getApplicationContextFrameworkVersion(): string {
    return AbstractBaseFizzBuzzEnterpriseApplicationContext.APPLICATION_CONTEXT_FRAMEWORK_VERSION;
  }

  protected registerComponent(componentName: string, component: object): void {
    this.registeredComponents.set(componentName, component);
  }

  protected unregisterComponent(componentName: string): void {
    this.registeredComponents.delete(componentName);
  }

  protected clearAllComponents(): void {
    this.registeredComponents.clear();
  }
}
