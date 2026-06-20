import { FizzBuzzResolutionFacadeFactoryBeanFactory } from "./impl/factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";
import type {
  IFizzBuzzSingleValueResolutionFacade,
} from "./contracts/IFizzBuzzSingleValueResolutionFacade.js";
import {
  FizzBuzzResolutionFacadeConfigurationProfile,
} from "./impl/factories/FizzBuzzResolutionFacadeFactoryBeanFactory.js";

const resolutionFacade: IFizzBuzzSingleValueResolutionFacade =
  FizzBuzzResolutionFacadeFactoryBeanFactory.createResolutionFacade(
    FizzBuzzResolutionFacadeConfigurationProfile.STANDARD,
  );

export function fizzBuzzValue(value: number): string {
  return resolutionFacade.resolveValue(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  return resolutionFacade.resolveRange(start, end);
}
