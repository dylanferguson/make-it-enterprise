import type { IPropertyPlaceholderConfigurer } from "../contracts/IPropertyPlaceholderConfigurer.js";

export abstract class AbstractBasePropertyPlaceholderConfigurer implements IPropertyPlaceholderConfigurer {
  protected readonly properties: Map<string, string> = new Map();
  private readonly configurerName: string;
  private static readonly PLACEHOLDER_PATTERN = /\$\{([^:}]+)(?::([^}]*))?\}/g;

  constructor(configurerName: string) {
    this.configurerName = configurerName;
  }

  abstract loadDefaultProperties(): void;

  resolvePlaceholder(key: string): string | null {
    return this.properties.get(key) ?? null;
  }

  resolvePlaceholderOrDefault(key: string, defaultValue: string): string {
    return this.properties.get(key) ?? defaultValue;
  }

  resolvePlaceholdersInString(template: string): string {
    return template.replace(
      AbstractBasePropertyPlaceholderConfigurer.PLACEHOLDER_PATTERN,
      (_match: string, key: string, defaultValue?: string) => {
        const resolved = this.properties.get(key);
        if (resolved !== undefined) {
          return resolved;
        }
        if (defaultValue !== undefined) {
          return defaultValue;
        }
        throw new Error(
          `[${this.configurerName}] Cannot resolve placeholder: ${key}`,
        );
      },
    );
  }

  setProperty(key: string, value: string): void {
    this.properties.set(key, value);
  }

  getProperty(key: string): string | null {
    return this.properties.get(key) ?? null;
  }

  getPropertyOrDefault(key: string, defaultValue: string): string {
    return this.properties.get(key) ?? defaultValue;
  }

  loadFromRecord(properties: Record<string, string>): void {
    for (const [key, value] of Object.entries(properties)) {
      this.properties.set(key, value);
    }
  }

  getConfiguredPropertyKeys(): readonly string[] {
    return Array.from(this.properties.keys());
  }

  getConfigurerName(): string {
    return this.configurerName;
  }
}
