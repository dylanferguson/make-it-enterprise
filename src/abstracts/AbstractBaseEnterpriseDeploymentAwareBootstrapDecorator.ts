import type { IEnterpriseDeploymentAwareBootstrapDecorator } from "../contracts/IEnterpriseDeploymentAwareBootstrapDecorator.js";
import type { IEnterpriseApplicationBootstrapInitializer } from "../contracts/IEnterpriseApplicationBootstrapInitializer.js";
import type { IEnterpriseDeploymentPlan } from "../contracts/IEnterpriseDeploymentPlan.js";

export abstract class AbstractBaseEnterpriseDeploymentAwareBootstrapDecorator
  implements IEnterpriseDeploymentAwareBootstrapDecorator
{
  private readonly decoratorName: string;
  private readonly decoratorVersion: string;
  protected readonly decoratedInitializer: IEnterpriseApplicationBootstrapInitializer;
  protected deploymentPlan: IEnterpriseDeploymentPlan | null = null;

  constructor(
    decoratorName: string,
    decoratorVersion: string,
    decoratedInitializer: IEnterpriseApplicationBootstrapInitializer,
  ) {
    this.decoratorName = decoratorName;
    this.decoratorVersion = decoratorVersion;
    this.decoratedInitializer = decoratedInitializer;
  }

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }

  getDecoratedInitializer(): IEnterpriseApplicationBootstrapInitializer {
    return this.decoratedInitializer;
  }

  getDeploymentPlan(): IEnterpriseDeploymentPlan {
    if (this.deploymentPlan === null) {
      throw new Error(
        `[${this.decoratorName}] Deployment plan not initialized. Call applyDeploymentConfiguration() first.`,
      );
    }
    return this.deploymentPlan;
  }

  abstract applyDeploymentConfiguration(): boolean;
  abstract getEntityBeanRegistrationCount(): number;
  abstract getRegisteredJndiBindingCount(): number;
}
