export interface IObjectFactory<T> {
  createInstance(...args: unknown[]): T;
  getObjectType(): string;
  isSingleton(): boolean;
  getFactoryQualifier(): string;
}
