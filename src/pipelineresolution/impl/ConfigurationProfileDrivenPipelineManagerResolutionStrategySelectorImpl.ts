import type { IPipelineManagerResolutionStrategy } from "../contracts/IPipelineManagerResolutionStrategy.js";
import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";
import { AbstractBasePipelineManagerResolutionStrategySelector } from "../abstracts/AbstractBasePipelineManagerResolutionStrategySelector.js";

export const PipelineManagerResolutionStrategyConfigurationProfileName = {
  STANDARD: "STANDARD",
  SERVICE_LOCATOR_AWARE: "SERVICE_LOCATOR_AWARE",
} as const;

export type PipelineManagerResolutionStrategyConfigurationProfileName =
  (typeof PipelineManagerResolutionStrategyConfigurationProfileName)[keyof typeof PipelineManagerResolutionStrategyConfigurationProfileName];

export class ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl
  extends AbstractBasePipelineManagerResolutionStrategySelector
{
  private static readonly SELECTOR_NAME = "ConfigurationProfileDrivenPipelineManagerResolutionStrategySelector";
  private static readonly SELECTOR_VERSION = "1.0.0-PIPELINE-RESOLUTION-SELECTOR";

  private readonly activeProfile: PipelineManagerResolutionStrategyConfigurationProfileName;

  constructor(
    activeProfile: PipelineManagerResolutionStrategyConfigurationProfileName = "STANDARD",
  ) {
    super();
    this.activeProfile = activeProfile;
  }

  override selectPipelineManagerResolutionStrategy(): IPipelineManagerResolutionStrategy {
    if (this.activeProfile === "SERVICE_LOCATOR_AWARE") {
      const strategy = this.registeredStrategies.get("SERVICE_LOCATOR");
      if (strategy !== undefined && strategy.canResolve()) {
        return strategy;
      }
    }
    if (this.activeProfile === "STANDARD") {
      const strategy = this.registeredStrategies.get("DIRECT");
      if (strategy !== undefined) {
        return strategy;
      }
    }
    const fallbackKey = this.activeProfile === "SERVICE_LOCATOR_AWARE" ? "DIRECT" : "SERVICE_LOCATOR";
    const fallback = this.registeredStrategies.get(fallbackKey);
    if (fallback !== undefined && fallback.canResolve()) {
      return fallback;
    }
    const allStrategies = this.getRegisteredStrategyNames();
    for (const name of allStrategies) {
      const strategy = this.registeredStrategies.get(name);
      if (strategy !== undefined && strategy.canResolve()) {
        return strategy;
      }
    }
    throw new Error(
      `[${ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl.SELECTOR_NAME}] ` +
      `No strategy available: profile=[${this.activeProfile}], ` +
      `registered=[${allStrategies.join(", ")}]`,
    );
  }

  override getSelectorName(): string {
    return ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl.SELECTOR_NAME;
  }

  override getSelectorVersion(): string {
    return ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl.SELECTOR_VERSION;
  }
}
