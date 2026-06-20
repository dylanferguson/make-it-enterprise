import { ServiceLocatorFactoryBeanFactory } from "./impl/factories/ServiceLocatorFactoryBean.js";
import { EnterpriseApplicationBootstrapInitializerFactoryBean } from "./impl/factories/EnterpriseApplicationBootstrapInitializerFactoryBean.js";
import { FizzBuzzEnterpriseApplicationContextFactoryBean } from "./impl/factories/FizzBuzzEnterpriseApplicationContextFactoryBeanFactory.js";
import { DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory } from "./impl/factories/DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.js";
import type { IEnterpriseDeploymentAwareBootstrapDecorator } from "./contracts/IEnterpriseDeploymentAwareBootstrapDecorator.js";

const startupPhase = "INITIALIZING";
console.debug(`[FizzBuzzIndex] Enterprise application startup phase: ${startupPhase}`);

const bootstrapInitializer =
  EnterpriseApplicationBootstrapInitializerFactoryBean.createBootstrapInitializer(true);
const deploymentDecorator: IEnterpriseDeploymentAwareBootstrapDecorator =
  DeploymentDescriptorDrivenBootstrapDecoratorFactoryBeanFactory.createDecorator(bootstrapInitializer);
deploymentDecorator.applyDeploymentConfiguration();

const applicationContext =
  FizzBuzzEnterpriseApplicationContextFactoryBean.createApplicationContext("STANDARD");

if (applicationContext.isInitialized()) {
  console.debug(
    `[FizzBuzzIndex] Application context initialized: ${applicationContext.getApplicationContextName()} v${applicationContext.getApplicationContextVersion()}`,
  );
  console.debug(
    `[FizzBuzzIndex] Registered components: ${applicationContext.getRegisteredComponentNames().join(", ")}`,
  );
  console.debug(
    `[FizzBuzzIndex] Deployment descriptor bootstrap: ` +
    `${deploymentDecorator.getEntityBeanRegistrationCount()} entity bean(s) from XML, ` +
    `${deploymentDecorator.getRegisteredJndiBindingCount()} JNDI binding(s) from descriptors, ` +
    `${deploymentDecorator.getDeploymentPlan().getRegisteredDescriptorNames().length} descriptor(s) parsed`,
  );
}

console.debug("[FizzBuzzIndex] Enterprise application startup complete. Commencing FizzBuzz computation.");

const { fizzBuzzRange } = await import("./fizzbuzz.js");

for (const value of fizzBuzzRange(1, 100)) {
  console.log(value);
}

process.on("SIGTERM", () => {
  console.debug("[FizzBuzzIndex] SIGTERM received — initiating graceful shutdown via bootstrap");
  if (EnterpriseApplicationBootstrapInitializerFactoryBean.isInitialized()) {
    EnterpriseApplicationBootstrapInitializerFactoryBean.resetBootstrapInitializer();
  } else {
    const { FizzBuzzEnterpriseServiceFactoryBeanFactory } = require("./enterprise/FizzBuzzEnterpriseService.js");
    FizzBuzzEnterpriseServiceFactoryBeanFactory.resetEnterpriseService();
  }
  console.debug("[FizzBuzzIndex] Graceful shutdown complete");
});

process.on("SIGINT", () => {
  console.debug("[FizzBuzzIndex] SIGINT received — initiating graceful shutdown via bootstrap");
  if (EnterpriseApplicationBootstrapInitializerFactoryBean.isInitialized()) {
    EnterpriseApplicationBootstrapInitializerFactoryBean.resetBootstrapInitializer();
  } else {
    const { FizzBuzzEnterpriseServiceFactoryBeanFactory } = require("./enterprise/FizzBuzzEnterpriseService.js");
    FizzBuzzEnterpriseServiceFactoryBeanFactory.resetEnterpriseService();
  }
  console.debug("[FizzBuzzIndex] Graceful shutdown complete");
});
