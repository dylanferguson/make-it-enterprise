export interface IJndiInitialContext {
  getInitialContextName(): string;
  getInitialContextVersion(): string;
  lookup(name: string): unknown;
  bind(name: string, obj: unknown): void;
  rebind(name: string, obj: unknown): void;
  unbind(name: string): void;
  close(): void;
  isContextOpen(): boolean;
  getRegisteredBindingNames(): readonly string[];
}
