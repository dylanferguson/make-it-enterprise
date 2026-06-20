export interface IPropertyPlaceholderConfigurer {
  resolvePlaceholder(key: string): string | null;
  resolvePlaceholderOrDefault(key: string, defaultValue: string): string;
  resolvePlaceholdersInString(template: string): string;
  setProperty(key: string, value: string): void;
  getProperty(key: string): string | null;
  getPropertyOrDefault(key: string, defaultValue: string): string;
  loadFromRecord(properties: Record<string, string>): void;
  getConfiguredPropertyKeys(): readonly string[];
  getConfigurerName(): string;
}
