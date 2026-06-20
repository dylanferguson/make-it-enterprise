import type { IEjbJndiBinding } from "../contracts/IEjbJndiBinding.js";
import type { IEjbHome } from "../contracts/IEjbHome.js";
import { DefaultEjbJndiBindingImpl } from "../impl/DefaultEjbJndiBindingImpl.js";

export class EjbJndiBindingFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EjbJndiBindingFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-EJB-JNDI-BINDING-FACTORY-BEAN";

  static getFactoryBeanName(): string {
    return EjbJndiBindingFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EjbJndiBindingFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static createBinding(
    jndiName: string,
    homeInterface: string,
    remoteInterface: string,
    ejbClass: string,
  ): IEjbJndiBinding {
    return new DefaultEjbJndiBindingImpl(jndiName, homeInterface, remoteInterface, ejbClass);
  }

  static registerBindingWithJndi(
    home: IEjbHome,
    binding: IEjbJndiBinding,
    jndiContext: { bind: (name: string, obj: unknown) => void },
  ): void {
    jndiContext.bind(binding.getJndiName(), home);
    console.debug(
      `[${EjbJndiBindingFactoryBeanFactory.FACTORY_BEAN_NAME}] EJB JNDI binding registered: ` +
      `jndiName=[${binding.getJndiName()}], ` +
      `homeInterface=[${binding.getHomeInterfaceClassName()}], ` +
      `remoteInterface=[${binding.getRemoteInterfaceClassName()}], ` +
      `ejbClass=[${binding.getEjbClassName()}], ` +
      `home=[${home.getHomeName()} v${home.getHomeVersion()}]`,
    );
  }
}
