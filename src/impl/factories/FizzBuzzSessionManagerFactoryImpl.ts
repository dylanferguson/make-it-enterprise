import type { IFizzBuzzSessionManager } from "../../contracts/IFizzBuzzSessionManager.js";
import type { IFizzBuzzSessionManagerFactory } from "../../contracts/IFizzBuzzSessionManagerFactory.js";
import { FizzBuzzSessionManagerImpl } from "../session/FizzBuzzSessionManagerImpl.js";

export class FizzBuzzSessionManagerFactoryImpl implements IFizzBuzzSessionManagerFactory {
  private static singletonInstance: IFizzBuzzSessionManager | null = null;

  createSessionManager(): IFizzBuzzSessionManager {
    if (FizzBuzzSessionManagerFactoryImpl.singletonInstance === null) {
      FizzBuzzSessionManagerFactoryImpl.singletonInstance = new FizzBuzzSessionManagerImpl();
    }
    return FizzBuzzSessionManagerFactoryImpl.singletonInstance;
  }

  getSessionManagerType(): string {
    return "FizzBuzzSessionManagerFactoryImpl:DefaultSessionManager";
  }

  static resetSessionManager(): void {
    FizzBuzzSessionManagerFactoryImpl.singletonInstance = null;
  }
}
