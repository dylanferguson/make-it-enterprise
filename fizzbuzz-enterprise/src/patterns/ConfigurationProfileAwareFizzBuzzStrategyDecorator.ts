import type { IFizzBuzzStrategy } from "../contracts/IFizzBuzzStrategy.js";
import type { FizzBuzzConfigurationProfile } from "../enterprise/FizzBuzzConfigurationProfile.js";

export class ConfigurationProfileAwareFizzBuzzStrategyDecorator implements IFizzBuzzStrategy {
  private static readonly DECORATOR_NAME = "ConfigurationProfileAwareFizzBuzzStrategyDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-PROFILE-AWARE";

  private readonly decoratedStrategy: IFizzBuzzStrategy;
  private readonly activeProfile: FizzBuzzConfigurationProfile;
  private readonly profileOverrides: Map<string, number> = new Map();

  constructor(
    decoratedStrategy: IFizzBuzzStrategy,
    activeProfile: FizzBuzzConfigurationProfile,
  ) {
    this.decoratedStrategy = decoratedStrategy;
    this.activeProfile = activeProfile;
    this.initializeProfileOverrides();
  }

  getDecoratedStrategy(): IFizzBuzzStrategy {
    return this.decoratedStrategy;
  }

  getDecoratorName(): string {
    return ConfigurationProfileAwareFizzBuzzStrategyDecorator.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return ConfigurationProfileAwareFizzBuzzStrategyDecorator.DECORATOR_VERSION;
  }

  getActiveProfile(): FizzBuzzConfigurationProfile {
    return this.activeProfile;
  }

  evaluate(value: number): string | null {
    return this.decoratedStrategy.evaluate(value);
  }

  getPriority(): number {
    const modifier = this.profileOverrides.get("priorityModifier");
    if (modifier !== undefined) {
      return this.decoratedStrategy.getPriority() + modifier;
    }
    return this.decoratedStrategy.getPriority();
  }

  private initializeProfileOverrides(): void {
    switch (this.activeProfile) {
      case "ENTERPRISE_STRICT":
        this.profileOverrides.set("priorityModifier", 10);
        break;
      case "ENTERPRISE_LITE":
        this.profileOverrides.set("priorityModifier", -5);
        break;
      case "ENTERPRISE_OBSERVABILITY":
        this.profileOverrides.set("priorityModifier", 0);
        break;
      case "ENTERPRISE_FULL":
      default:
        this.profileOverrides.set("priorityModifier", 5);
        break;
    }
  }
}
