import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseModuloArithmeticConfigurationProvider } from "./IEnterpriseModuloArithmeticConfigurationProvider.js";

export interface IConfigurationAwareResolutionFacadeDecorator extends IFizzBuzzSingleValueResolutionFacade {
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getConfigurationProvider(): IEnterpriseModuloArithmeticConfigurationProvider;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getDecoratorConfigurationProfile(): string;
}
