export interface ICorbaNamingService {
  getNamingServiceName(): string;
  getNamingServiceVersion(): string;
  resolve(name: string): unknown;
  bind(name: string, obj: unknown): void;
  unbind(name: string): void;
  list(): readonly string[];
}
