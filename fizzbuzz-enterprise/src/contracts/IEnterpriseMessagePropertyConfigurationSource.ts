export interface IEnterpriseMessagePropertyConfigurationSource {
  getPropertyValue(propertyKey: string): string | null;
  getSourceName(): string;
  getSourcePriority(): number;
  isPropertyResolvable(propertyKey: string): boolean;
}
