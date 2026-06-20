import { AbstractBaseEnterpriseMessagePropertyConfigurationSource } from "../../abstracts/AbstractBaseEnterpriseMessagePropertyConfigurationSource.js";
import type { IEnterpriseDeploymentPlan } from "../../contracts/IEnterpriseDeploymentPlan.js";
import { DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory } from "../factories/DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.js";

export class DeploymentDescriptorMessagePropertyConfigurationSourceImpl extends AbstractBaseEnterpriseMessagePropertyConfigurationSource {
  protected override readonly sourceName = "DeploymentDescriptorMessagePropertyConfigurationSource";
  protected override readonly sourcePriority = 50;

  private static readonly MESSAGE_PROPERTY_PREFIX = "message.template.codec.";

  private deploymentPlan: IEnterpriseDeploymentPlan | null = null;
  private deploymentPlanResolutionAttempted = false;

  override getPropertyValue(propertyKey: string): string | null {
    if (!propertyKey.startsWith(DeploymentDescriptorMessagePropertyConfigurationSourceImpl.MESSAGE_PROPERTY_PREFIX)) {
      return null;
    }
    const plan = this.resolveDeploymentPlan();
    if (plan === null) {
      return null;
    }
    const descriptorNames = plan.getRegisteredDescriptorNames();
    if (descriptorNames.length === 0) {
      return null;
    }
    return null;
  }

  private resolveDeploymentPlan(): IEnterpriseDeploymentPlan | null {
    if (!this.deploymentPlanResolutionAttempted) {
      this.deploymentPlanResolutionAttempted = true;
      try {
        const decorator = DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.getDecorator();
        if (decorator !== null) {
          this.deploymentPlan = decorator.getDeploymentPlan();
        }
      } catch {
        this.deploymentPlan = null;
      }
    }
    return this.deploymentPlan;
  }
}
