import { FizzBuzzResourceAdapterImpl } from "../resource/FizzBuzzResourceAdapterImpl.js";
import type { IResourceAdapter } from "../../contracts/IResourceAdapter.js";

export class FizzBuzzResourceAdapterFactoryBean {
  private static instance: IResourceAdapter | null = null;

  static createResourceAdapter(): IResourceAdapter {
    if (FizzBuzzResourceAdapterFactoryBean.instance === null) {
      FizzBuzzResourceAdapterFactoryBean.instance = new FizzBuzzResourceAdapterImpl();
    }
    return FizzBuzzResourceAdapterFactoryBean.instance;
  }

  static resetResourceAdapter(): void {
    if (FizzBuzzResourceAdapterFactoryBean.instance !== null) {
      FizzBuzzResourceAdapterFactoryBean.instance.stop();
      FizzBuzzResourceAdapterFactoryBean.instance = null;
    }
  }
}

export class FizzBuzzResourceAdapterFactoryBeanFactory {
  static createFactoryBean(): FizzBuzzResourceAdapterFactoryBean {
    return new FizzBuzzResourceAdapterFactoryBean();
  }
}
