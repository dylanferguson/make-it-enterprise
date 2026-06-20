import type { IEnterpriseDeploymentPlan } from "./IEnterpriseDeploymentPlan.js";
import type { IEnterpriseApplicationBootstrapInitializer } from "./IEnterpriseApplicationBootstrapInitializer.js";

export interface IEnterpriseDeploymentAwareBootstrapDecorator {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getDecoratedInitializer(): IEnterpriseApplicationBootstrapInitializer;
  getDeploymentPlan(): IEnterpriseDeploymentPlan;
  applyDeploymentConfiguration(): boolean;
  getEntityBeanRegistrationCount(): number;
  getRegisteredJndiBindingCount(): number;
}
