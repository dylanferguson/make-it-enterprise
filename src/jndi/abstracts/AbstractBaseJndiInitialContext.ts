import type { IJndiInitialContext } from "../contracts/IJndiInitialContext.js";

export abstract class AbstractBaseJndiInitialContext implements IJndiInitialContext {
  private readonly contextName: string;
  private readonly contextVersion: string;
  protected readonly bindings: Map<string, unknown>;
  protected open: boolean;

  constructor(
    contextName: string,
    contextVersion: string,
  ) {
    this.contextName = contextName;
    this.contextVersion = contextVersion;
    this.bindings = new Map<string, unknown>();
    this.open = true;
  }

  getInitialContextName(): string {
    return this.contextName;
  }

  getInitialContextVersion(): string {
    return this.contextVersion;
  }

  abstract lookup(name: string): unknown;

  bind(name: string, obj: unknown): void {
    if (!this.open) {
      throw new Error(`[${this.contextName}] JNDI context is closed, cannot bind: ${name}`);
    }
    this.bindings.set(name, obj);
  }

  rebind(name: string, obj: unknown): void {
    this.bindings.set(name, obj);
  }

  unbind(name: string): void {
    this.bindings.delete(name);
  }

  close(): void {
    this.open = false;
  }

  isContextOpen(): boolean {
    return this.open;
  }

  getRegisteredBindingNames(): readonly string[] {
    return Array.from(this.bindings.keys());
  }
}
