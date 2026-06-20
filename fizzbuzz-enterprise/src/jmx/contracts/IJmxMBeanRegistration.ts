import type { IJmxObjectName } from "./IJmxObjectName.js";

export interface IJmxMBeanRegistration {
  getMBeanName(): string;
  getMBeanObjectName(): IJmxObjectName;
  preRegister(serverName: string): void;
  postRegister(registrationSuccess: boolean): void;
  preDeregister(): void;
  postDeregister(): void;
}
