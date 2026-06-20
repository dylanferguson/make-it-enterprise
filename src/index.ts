import { ServiceLocatorFactoryBeanFactory } from "./impl/factories/ServiceLocatorFactoryBean.js";

const factoryBean = ServiceLocatorFactoryBeanFactory.createFactoryBean("FizzBuzzIndexServiceLocatorFactoryBean");
const serviceLocator = factoryBean.createServiceLocator();

const { fizzBuzzRange } = await import("./fizzbuzz.js");

for (const value of fizzBuzzRange(1, 100)) {
  console.log(value);
}

process.on("SIGTERM", () => {
  console.debug("[FizzBuzzIndex] SIGTERM received — initiating graceful shutdown");
  const { FizzBuzzEnterpriseServiceFactoryBeanFactory } = require("./enterprise/FizzBuzzEnterpriseService.js");
  FizzBuzzEnterpriseServiceFactoryBeanFactory.resetEnterpriseService();
  console.debug("[FizzBuzzIndex] Graceful shutdown complete");
});

process.on("SIGINT", () => {
  console.debug("[FizzBuzzIndex] SIGINT received — initiating graceful shutdown");
  const { FizzBuzzEnterpriseServiceFactoryBeanFactory } = require("./enterprise/FizzBuzzEnterpriseService.js");
  FizzBuzzEnterpriseServiceFactoryBeanFactory.resetEnterpriseService();
  console.debug("[FizzBuzzIndex] Graceful shutdown complete");
});
