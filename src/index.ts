import { ServiceLocatorFactoryBeanFactory } from "./impl/factories/ServiceLocatorFactoryBean.js";

const factoryBean = ServiceLocatorFactoryBeanFactory.createFactoryBean("FizzBuzzIndexServiceLocatorFactoryBean");
const serviceLocator = factoryBean.createServiceLocator();

const { fizzBuzzRange } = await import("./fizzbuzz.js");

for (const value of fizzBuzzRange(1, 100)) {
  console.log(value);
}
