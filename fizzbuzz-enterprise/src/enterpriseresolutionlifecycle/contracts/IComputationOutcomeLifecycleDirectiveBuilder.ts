export interface IComputationOutcomeLifecycleDirectiveBuilder {
  getBuilderName(): string;
  getBuilderVersion(): string;
  withVisitorRegistrationEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder;
  withValidationEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder;
  withChainOfResponsibilityEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder;
  withLifecycleStateTrackingEnabled(enabled: boolean): IComputationOutcomeLifecycleDirectiveBuilder;
  withOrchestratorDescriptor(descriptor: string): IComputationOutcomeLifecycleDirectiveBuilder;
  build(): IComputationOutcomeLifecycleDirectiveConfiguration;
}

export interface IComputationOutcomeLifecycleDirectiveConfiguration {
  isVisitorRegistrationEnabled: boolean;
  isValidationEnabled: boolean;
  isChainOfResponsibilityEnabled: boolean;
  isLifecycleStateTrackingEnabled: boolean;
  orchestratorDescriptor: string;
  toConfigurationDescriptor(): string;
}
