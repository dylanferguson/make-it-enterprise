import type { IModuloArithmeticCommandInvoker } from "../contracts/IModuloArithmeticCommandInvoker.js";
import { StandardModuloArithmeticCommandInvokerImpl } from "../impl/StandardModuloArithmeticCommandInvokerImpl.js";
import { DelegatingResolverModuloArithmeticCommandImpl } from "../impl/DelegatingResolverModuloArithmeticCommandImpl.js";

export class ModuloArithmeticCommandInvokerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "ModuloArithmeticCommandInvokerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-MODULO-COMMAND-INVOKER-FACTORY";

  private static invokerSingleton: IModuloArithmeticCommandInvoker | null = null;
  private static commandSingleton: DelegatingResolverModuloArithmeticCommandImpl | null = null;

  static createInvoker(): IModuloArithmeticCommandInvoker {
    if (ModuloArithmeticCommandInvokerFactoryBeanFactory.invokerSingleton === null) {
      ModuloArithmeticCommandInvokerFactoryBeanFactory.invokerSingleton =
        new StandardModuloArithmeticCommandInvokerImpl();
      ModuloArithmeticCommandInvokerFactoryBeanFactory.commandSingleton =
        new DelegatingResolverModuloArithmeticCommandImpl("ModuloArithmeticCommandInvokerInfrastructure");
    }
    return ModuloArithmeticCommandInvokerFactoryBeanFactory.invokerSingleton;
  }

  static getInvoker(): IModuloArithmeticCommandInvoker | null {
    return ModuloArithmeticCommandInvokerFactoryBeanFactory.invokerSingleton;
  }

  static getCommand(): DelegatingResolverModuloArithmeticCommandImpl | null {
    return ModuloArithmeticCommandInvokerFactoryBeanFactory.commandSingleton;
  }

  static getFactoryBeanFactoryName(): string {
    return ModuloArithmeticCommandInvokerFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return ModuloArithmeticCommandInvokerFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
