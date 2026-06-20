import type { IJndiInitialContext } from "./IJndiInitialContext.js";

export interface IJndiContextFactory {
  getContextFactoryName(): string;
  getContextFactoryVersion(): string;
  getInitialContext(environment: Record<string, string>): IJndiInitialContext;
}
