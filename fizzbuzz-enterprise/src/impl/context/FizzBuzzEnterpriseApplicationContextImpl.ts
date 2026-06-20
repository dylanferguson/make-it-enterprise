import { AbstractBaseFizzBuzzEnterpriseApplicationContext } from "../../abstracts/AbstractBaseFizzBuzzEnterpriseApplicationContext.js";
import type { IFizzBuzzEnterpriseApplicationContext } from "../../contracts/IFizzBuzzEnterpriseApplicationContext.js";
import type { IEnterpriseDeploymentAwareBootstrapDecorator } from "../../contracts/IEnterpriseDeploymentAwareBootstrapDecorator.js";
import { ApplicationContextInitializationException } from "../../exceptions/ApplicationContextInitializationException.js";
import { FizzBuzzResolutionFacadeFactoryBeanFactory } from "../factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";
import { ServiceLocatorFactoryBeanFactory } from "../factories/ServiceLocatorFactoryBean.js";
import { FizzBuzzEnterpriseServiceFactoryBeanFactory } from "../../enterprise/FizzBuzzEnterpriseService.js";
import { DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory } from "../factories/DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.js";

export class FizzBuzzEnterpriseApplicationContextImpl
  extends AbstractBaseFizzBuzzEnterpriseApplicationContext
  implements IFizzBuzzEnterpriseApplicationContext
{
  private static readonly CONTEXT_IMPL_NAME = "FizzBuzzEnterpriseApplicationContextImpl";
  private static readonly CONTEXT_IMPL_VERSION = "1.0.0-CONTEXT-IMPL";
  private static readonly EJB_JAR_DESCRIPTOR = "META-INF/ejb-jar.xml";
  private static readonly APPLICATION_DESCRIPTOR = "META-INF/application.xml";
  private static readonly BEANS_DESCRIPTOR = "META-INF/beans.xml";
  private static readonly PERSISTENCE_DESCRIPTOR = "META-INF/persistence.xml";
  private static readonly COMPONENT_SERVICE_LOCATOR = "FizzBuzzServiceLocator";
  private static readonly COMPONENT_ENTERPRISE_SERVICE = "FizzBuzzEnterpriseService";
  private static readonly COMPONENT_RESOLUTION_FACADE = "FizzBuzzResolutionFacade";

  private serviceLocatorFactoryBean: ReturnType<typeof ServiceLocatorFactoryBeanFactory.createFactoryBean> | null = null;

  constructor() {
    super(
      FizzBuzzEnterpriseApplicationContextImpl.CONTEXT_IMPL_NAME,
      FizzBuzzEnterpriseApplicationContextImpl.CONTEXT_IMPL_VERSION,
      FizzBuzzEnterpriseApplicationContextImpl.EJB_JAR_DESCRIPTOR,
    );
  }

  override initialize(): void {
    this.assertNotInitialized();
    try {
      const deploymentDecorator =
        DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.getDecorator();

      console.debug(
        `[${this.getApplicationContextName()} v${this.getApplicationContextVersion()}] Initializing FizzBuzz Enterprise Application Context...`,
      );
      console.debug(
        `[${this.getApplicationContextName()}] Deployment descriptors: ${this.resolveDeploymentDescriptorPaths().join(", ")}`,
      );
      if (deploymentDecorator !== null) {
        console.debug(
          `[${this.getApplicationContextName()}] Descriptor-driven bootstrap: ` +
          `${deploymentDecorator.getEntityBeanRegistrationCount()} entity bean(s), ` +
          `${deploymentDecorator.getRegisteredJndiBindingCount()} JNDI binding(s)`,
        );
      }

      this.initializeDeploymentDescriptorPhase(deploymentDecorator);
      this.initializeServiceLocator();
      this.initializeEnterpriseService();
      this.initializeResolutionFacade();
      this.initializeEnterpriseInfrastructureMonitor();

      this.markInitialized();
      console.debug(
        `[${this.getApplicationContextName()}] Application context initialized successfully. Registered ${this.registeredComponents.size} components.`,
      );
    } catch (error) {
      this.markFailed();
      throw new ApplicationContextInitializationException(
        `Failed to initialize FizzBuzz Enterprise Application Context: ${error instanceof Error ? error.message : String(error)}`,
        "FIZZBUZZ-APPLICATION-CONTEXT-0002",
        error instanceof Error ? error : null,
      );
    }
  }

  override destroy(): void {
    this.assertInitialized();
    try {
      console.debug(
        `[${this.getApplicationContextName()}] Destroying FizzBuzz Enterprise Application Context...`,
      );

      FizzBuzzResolutionFacadeFactoryBeanFactory.resetResolutionFacade();
      FizzBuzzEnterpriseServiceFactoryBeanFactory.resetEnterpriseService();

      this.clearAllComponents();
      this.markDestroyed();

      console.debug(
        `[${this.getApplicationContextName()}] Application context destroyed successfully.`,
      );
    } catch (error) {
      this.markFailed();
      throw new ApplicationContextInitializationException(
        `Failed to destroy FizzBuzz Enterprise Application Context: ${error instanceof Error ? error.message : String(error)}`,
        "FIZZBUZZ-APPLICATION-CONTEXT-0003",
        error instanceof Error ? error : null,
      );
    }
  }

  override refresh(): void {
    this.markRefreshing();
    if (this.isInitialized()) {
      this.destroy();
    }
    this.initialize();
  }

  private   initializeDeploymentDescriptorPhase(
    deploymentDecorator: IEnterpriseDeploymentAwareBootstrapDecorator | null,
  ): void {
    console.debug(
      `[${this.getApplicationContextName()}] Phase 0/5: Bootstrap deployment descriptor configuration...`,
    );
    if (deploymentDecorator !== null) {
      const plan = deploymentDecorator.getDeploymentPlan();
      for (const descriptorName of plan.getRegisteredDescriptorNames()) {
        this.registerComponent(
          `DeploymentDescriptor:${descriptorName}`,
          { descriptorName } as object,
        );
        console.debug(
          `[${this.getApplicationContextName()}] Registered descriptor: ${descriptorName} (${plan.getParsedDescriptor(descriptorName)?.children.length ?? 0} child elements)`,
        );
      }
      this.registerComponent(
        "EnterpriseDeploymentPlan",
        plan as unknown as object,
      );
    }
  }

  initializeServiceLocator(): void {
    console.debug(`[${this.getApplicationContextName()}] Phase 1/4: Initializing ServiceLocator...`);
    this.serviceLocatorFactoryBean = ServiceLocatorFactoryBeanFactory.createFactoryBean(
      "FizzBuzzEnterpriseApplicationContextServiceLocatorFactoryBean",
    );
    const serviceLocator = this.serviceLocatorFactoryBean.createServiceLocator();
    this.registerComponent(
      FizzBuzzEnterpriseApplicationContextImpl.COMPONENT_SERVICE_LOCATOR,
      serviceLocator as unknown as object,
    );
    console.debug(`[${this.getApplicationContextName()}] ServiceLocator initialized.`);
  }

  private initializeEnterpriseService(): void {
    console.debug(`[${this.getApplicationContextName()}] Phase 2/4: Initializing EnterpriseService...`);
    const enterpriseService =
      FizzBuzzEnterpriseServiceFactoryBeanFactory.createEnterpriseService();
    this.registerComponent(
      FizzBuzzEnterpriseApplicationContextImpl.COMPONENT_ENTERPRISE_SERVICE,
      enterpriseService,
    );
    console.debug(`[${this.getApplicationContextName()}] EnterpriseService initialized.`);
  }

  private initializeResolutionFacade(): void {
    console.debug(`[${this.getApplicationContextName()}] Phase 3/4: Initializing ResolutionFacade...`);
    const resolutionFacade =
      FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade("STANDARD");
    this.registerComponent(
      FizzBuzzEnterpriseApplicationContextImpl.COMPONENT_RESOLUTION_FACADE,
      resolutionFacade as unknown as object,
    );
    console.debug(`[${this.getApplicationContextName()}] ResolutionFacade initialized.`);
  }

  private initializeEnterpriseInfrastructureMonitor(): void {
    console.debug(`[${this.getApplicationContextName()}] Phase 4/4: Validating enterprise infrastructure...`);
    const lifecycleManager = FizzBuzzEnterpriseServiceFactoryBeanFactory.getLifecycleManager();
    if (lifecycleManager !== null) {
      this.registerComponent("FizzBuzzLifecycleManager", lifecycleManager);
      console.debug(
        `[${this.getApplicationContextName()}] LifecycleManager registered with ${lifecycleManager.getManagedBeanNames().length} managed beans.`,
      );
    }
    const resourceAdapter = FizzBuzzEnterpriseServiceFactoryBeanFactory.getResourceAdapter();
    if (resourceAdapter !== null) {
      this.registerComponent("FizzBuzzResourceAdapter", resourceAdapter);
      console.debug(
        `[${this.getApplicationContextName()}] ResourceAdapter registered: ${resourceAdapter.getResourceAdapterName()}.`,
      );
    }
    console.debug(`[${this.getApplicationContextName()}] Enterprise infrastructure validation complete.`);
  }

  private resolveDeploymentDescriptorPaths(): readonly string[] {
    return [
      FizzBuzzEnterpriseApplicationContextImpl.EJB_JAR_DESCRIPTOR,
      FizzBuzzEnterpriseApplicationContextImpl.APPLICATION_DESCRIPTOR,
      FizzBuzzEnterpriseApplicationContextImpl.BEANS_DESCRIPTOR,
      FizzBuzzEnterpriseApplicationContextImpl.PERSISTENCE_DESCRIPTOR,
    ];
  }
}
