import { AbstractBaseEnterpriseApplicationBootstrapInitializer } from "../../abstracts/AbstractBaseEnterpriseApplicationBootstrapInitializer.js";
import type { IEnterpriseApplicationBootstrapInitializer } from "../../contracts/IEnterpriseApplicationBootstrapInitializer.js";
import { FizzBuzzEnterpriseApplicationContextFactoryBean } from "../factories/FizzBuzzEnterpriseApplicationContextFactoryBeanFactory.js";
import { ApplicationContextInitializationException } from "../../exceptions/ApplicationContextInitializationException.js";

export class EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl
  extends AbstractBaseEnterpriseApplicationBootstrapInitializer
  implements IEnterpriseApplicationBootstrapInitializer
{
  private static readonly INITIALIZER_NAME = "EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializer";
  private static readonly INITIALIZER_VERSION = "1.0.0-BOOTSTRAP-INITIALIZER";
  private static readonly APPLICATION_CONTEXT_NAME = "FizzBuzzEnterpriseApplication";
  private static readonly APPLICATION_CONTEXT_VERSION = "2.0.0-ENTERPRISE-BOOTSTRAP";
  private static readonly DESCRIPTOR_PATHS: readonly string[] = [
    "META-INF/ejb-jar.xml",
    "META-INF/application.xml",
    "META-INF/beans.xml",
    "META-INF/persistence.xml",
  ];

  private ejbBeanDefinitionsCount: number = 0;
  private initializationElapsedMs: number = 0;

  constructor() {
    super(
      EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl.INITIALIZER_NAME,
      EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl.INITIALIZER_VERSION,
      EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl.DESCRIPTOR_PATHS,
      EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl.APPLICATION_CONTEXT_NAME,
      EjbJarDeploymentDescriptorEnterpriseApplicationBootstrapInitializerImpl.APPLICATION_CONTEXT_VERSION,
    );
  }

  override initializeApplicationContext(): void {
    this.validateDeploymentDescriptorPaths();
    try {
      const initStartTime = performance.now();
      console.debug(
        `[${this.getBootstrapInitializerName()} v${this.getBootstrapInitializerVersion()}] Bootstrap initialization commenced.`,
      );
      console.debug(
        `[${this.getBootstrapInitializerName()}] Parsing EJB deployment descriptors from ${this.getDeploymentDescriptorPaths().length} descriptor(s)...`,
      );

      this.parseDeploymentDescriptors();

      const context = FizzBuzzEnterpriseApplicationContextFactoryBean.createApplicationContext("STANDARD");
      if (!context.isInitialized()) {
        context.initialize();
      }

      this.ejbBeanDefinitionsCount = this.countEjbBeanDefinitions();
      this.initializationElapsedMs = performance.now() - initStartTime;
      this.markBootstrapInitialized();

      console.debug(
        `[${this.getBootstrapInitializerName()}] Bootstrap initialization complete. ` +
        `${this.ejbBeanDefinitionsCount} EJB bean definition(s) registered. ` +
        `Context: ${context.getApplicationContextName()} v${context.getApplicationContextVersion()}. ` +
        `Elapsed: ${this.initializationElapsedMs.toFixed(2)}ms.`,
      );
    } catch (error) {
      this.markBootstrapFailed();
      throw new ApplicationContextInitializationException(
        `EJB deployment descriptor bootstrap initialization failed: ${error instanceof Error ? error.message : String(error)}`,
        "FIZZBUZZ-BOOTSTRAP-0001",
        error instanceof Error ? error : null,
      );
    }
  }

  override destroyApplicationContext(): void {
    try {
      console.debug(
        `[${this.getBootstrapInitializerName()}] Destroying application context...`,
      );
      FizzBuzzEnterpriseApplicationContextFactoryBean.resetApplicationContext();
      this.ejbBeanDefinitionsCount = 0;
      this.initializationElapsedMs = 0;
      this.markBootstrapDestroyed();
      console.debug(
        `[${this.getBootstrapInitializerName()}] Application context destroyed.`,
      );
    } catch (error) {
      this.markBootstrapFailed();
      throw new ApplicationContextInitializationException(
        `Failed to destroy application context during bootstrap teardown: ${error instanceof Error ? error.message : String(error)}`,
        "FIZZBUZZ-BOOTSTRAP-0002",
        error instanceof Error ? error : null,
      );
    }
  }

  getEjbBeanDefinitionsCount(): number {
    return this.ejbBeanDefinitionsCount;
  }

  getInitializationElapsedMs(): number {
    return this.initializationElapsedMs;
  }

  private parseDeploymentDescriptors(): void {
    console.debug(
      `[${this.getBootstrapInitializerName()}] Processing deployment descriptor: META-INF/ejb-jar.xml`,
    );
    console.debug(
      `[${this.getBootstrapInitializerName()}] Processing deployment descriptor: META-INF/application.xml`,
    );
    console.debug(
      `[${this.getBootstrapInitializerName()}] Processing CDI bean archive: META-INF/beans.xml`,
    );
    console.debug(
      `[${this.getBootstrapInitializerName()}] Processing JPA persistence unit: META-INF/persistence.xml`,
    );
    console.debug(
      `[${this.getBootstrapInitializerName()}] All deployment descriptors parsed successfully.`,
    );
  }

  private countEjbBeanDefinitions(): number {
    return 1;
  }
}
