import { AbstractBaseEnterpriseApplicationBootstrapInitializer } from "../../abstracts/AbstractBaseEnterpriseApplicationBootstrapInitializer.js";
import type { IEnterpriseApplicationBootstrapInitializer } from "../../contracts/IEnterpriseApplicationBootstrapInitializer.js";
import { FizzBuzzEnterpriseApplicationContextFactoryBean } from "../factories/FizzBuzzEnterpriseApplicationContextFactoryBeanFactory.js";
import { DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory } from "../factories/DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.js";
import type { IEnterpriseDeploymentAwareBootstrapDecorator } from "../../contracts/IEnterpriseDeploymentAwareBootstrapDecorator.js";
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
  private deploymentDecorator: IEnterpriseDeploymentAwareBootstrapDecorator | null = null;

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

      this.deploymentDecorator =
        DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.createDecorator(this);
      this.deploymentDecorator.applyDeploymentConfiguration();

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
        `${this.ejbBeanDefinitionsCount} EJB bean definition(s) registered ` +
        `(${this.deploymentDecorator.getEntityBeanRegistrationCount()} from XML descriptors). ` +
        `${this.deploymentDecorator.getRegisteredJndiBindingCount()} JNDI binding(s) established. ` +
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
    const plan = this.deploymentDecorator?.getDeploymentPlan();
    const descriptorNames = plan?.getRegisteredDescriptorNames() ?? [];
    for (const name of descriptorNames) {
      console.debug(
        `[${this.getBootstrapInitializerName()}] Processing deployment descriptor: ${name} ` +
        `[${plan?.getParsedDescriptor(name)?.tagName ?? "unknown"}]`,
      );
    }
    console.debug(
      `[${this.getBootstrapInitializerName()}] Deployment descriptor parsing complete. ` +
      `${descriptorNames.length} descriptor(s) processed.`,
    );
  }

  private countEjbBeanDefinitions(): number {
    return this.deploymentDecorator?.getEntityBeanRegistrationCount() ?? 1;
  }
}
