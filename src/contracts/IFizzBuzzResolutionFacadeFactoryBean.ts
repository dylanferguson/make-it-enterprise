import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";

export interface IFizzBuzzResolutionFacadeFactoryBean {
  createResolutionFacade(): IFizzBuzzSingleValueResolutionFacade;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  getResolutionFacadeConfigurationProfile(): string;
}
