import type { ICorbaNamingService } from "../contracts/ICorbaNamingService.js";

export abstract class AbstractBaseCorbaNamingService implements ICorbaNamingService {
  private readonly namingServiceName: string;
  private readonly namingServiceVersion: string;
  protected readonly bindings: Map<string, unknown>;

  constructor(namingServiceName: string, namingServiceVersion: string) {
    this.namingServiceName = namingServiceName;
    this.namingServiceVersion = namingServiceVersion;
    this.bindings = new Map<string, unknown>();
  }

  getNamingServiceName(): string {
    return this.namingServiceName;
  }

  getNamingServiceVersion(): string {
    return this.namingServiceVersion;
  }

  abstract resolve(name: string): unknown;

  bind(name: string, obj: unknown): void {
    this.bindings.set(name, obj);
  }

  unbind(name: string): void {
    this.bindings.delete(name);
  }

  list(): readonly string[] {
    return Array.from(this.bindings.keys());
  }
}
