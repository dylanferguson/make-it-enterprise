import type {
  IComputationOutcomeLifecycleDirectiveBuilder,
  IComputationOutcomeLifecycleDirectiveConfiguration,
} from "../contracts/IComputationOutcomeLifecycleDirectiveBuilder.js";

export class DefaultComputationOutcomeLifecycleDirectiveBuilderImpl
  implements IComputationOutcomeLifecycleDirectiveBuilder
{
  private readonly _builderName: string;
  private readonly _builderVersion: string;
  private _visitorRegistrationEnabled = true;
  private _validationEnabled = true;
  private _chainOfResponsibilityEnabled = true;
  private _lifecycleStateTrackingEnabled = true;
  private _orchestratorDescriptor = "DEFAULT";

  constructor(builderName: string, builderVersion: string) {
    this._builderName = builderName;
    this._builderVersion = builderVersion;
  }

  getBuilderName(): string {
    return this._builderName;
  }

  getBuilderVersion(): string {
    return this._builderVersion;
  }

  withVisitorRegistrationEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder {
    this._visitorRegistrationEnabled = enabled;
    return this;
  }

  withValidationEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder {
    this._validationEnabled = enabled;
    return this;
  }

  withChainOfResponsibilityEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder {
    this._chainOfResponsibilityEnabled = enabled;
    return this;
  }

  withLifecycleStateTrackingEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder {
    this._lifecycleStateTrackingEnabled = enabled;
    return this;
  }

  withOrchestratorDescriptor(descriptor: string): IComputationOutcomeLifecycleDirectiveBuilder {
    this._orchestratorDescriptor = descriptor;
    return this;
  }

  build(): IComputationOutcomeLifecycleDirectiveConfiguration {
    return {
      isVisitorRegistrationEnabled: this._visitorRegistrationEnabled,
      isValidationEnabled: this._validationEnabled,
      isChainOfResponsibilityEnabled: this._chainOfResponsibilityEnabled,
      isLifecycleStateTrackingEnabled: this._lifecycleStateTrackingEnabled,
      orchestratorDescriptor: this._orchestratorDescriptor,
      toConfigurationDescriptor: () =>
        `DirectiveConfig:` +
        `visitorRegistration=${this._visitorRegistrationEnabled},` +
        `validation=${this._validationEnabled},` +
        `chainOfResponsibility=${this._chainOfResponsibilityEnabled},` +
        `stateTracking=${this._lifecycleStateTrackingEnabled},` +
        `descriptor=${this._orchestratorDescriptor}`,
    };
  }
}
