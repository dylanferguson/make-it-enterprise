import type { IFizzBuzzSessionManager } from "./IFizzBuzzSessionManager.js";

export interface IFizzBuzzSessionManagerFactory {
  createSessionManager(): IFizzBuzzSessionManager;
  getSessionManagerType(): string;
}
