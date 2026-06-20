import { FizzBuzzEnterpriseServiceFactoryBeanFactory } from "./enterprise/FizzBuzzEnterpriseService.js";

const enterpriseService = FizzBuzzEnterpriseServiceFactoryBeanFactory.createEnterpriseService();

export function fizzBuzzValue(value: number): string {
  return enterpriseService.resolveValue(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  return enterpriseService.calculateRange(start, end);
}
