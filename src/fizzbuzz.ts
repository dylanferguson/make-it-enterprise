import { ServiceLocatorFactory } from "./impl/factories/ServiceLocatorFactoryImpl.js";

const serviceLocator = ServiceLocatorFactory.createServiceLocator();

export function fizzBuzzValue(value: number): string {
  const resolver = serviceLocator.getValueResolver();
  return resolver.resolve(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  const calculator = serviceLocator.getRangeCalculator();
  return calculator.calculateRange(start, end);
}
