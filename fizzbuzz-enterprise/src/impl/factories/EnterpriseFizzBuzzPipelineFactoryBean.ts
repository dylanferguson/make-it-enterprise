import type { IPipeline } from "../../contracts/IPipeline.js";
import type { IPipelineStage } from "../../contracts/IPipelineStage.js";
import type { IFizzBuzzComputationMediator } from "../../contracts/IFizzBuzzComputationMediator.js";
import type { IComputationEventNotificationBus } from "../../contracts/IComputationEventNotificationBus.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IEnterpriseInterceptor } from "../../contracts/IEnterpriseInterceptor.js";
import type { IResultPostProcessorChain } from "../../contracts/IResultPostProcessorChain.js";
import { EnterpriseFizzBuzzPipelineImpl } from "../pipeline/EnterpriseFizzBuzzPipelineImpl.js";
import { ValueResolutionDelegationPipelineStage } from "../stages/ValueResolutionDelegationPipelineStage.js";
import { EventNotificationPipelineStage } from "../stages/EventNotificationPipelineStage.js";
import { InterceptorInvocationPipelineStage } from "../stages/InterceptorInvocationPipelineStage.js";
import { ResultPostProcessingPipelineStage } from "../stages/ResultPostProcessingPipelineStage.js";

export enum FizzBuzzPipelineConfigurationProfile {
  FULL = "FULL",
  MINIMAL = "MINIMAL",
  OBSERVABLE = "OBSERVABLE",
}

export class EnterpriseFizzBuzzPipelineFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzPipelineFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0";

  private readonly mediator: IFizzBuzzComputationMediator;
  private readonly eventBus: IComputationEventNotificationBus;
  private readonly interceptors: IEnterpriseInterceptor[];
  private readonly resolver: ICompositeValueResolver;
  private readonly postProcessorChain: IResultPostProcessorChain;
  private readonly configurationProfile: FizzBuzzPipelineConfigurationProfile;
  private pipeline: IPipeline<number, string> | null = null;

  constructor(
    mediator: IFizzBuzzComputationMediator,
    eventBus: IComputationEventNotificationBus,
    interceptors: IEnterpriseInterceptor[],
    resolver: ICompositeValueResolver,
    postProcessorChain: IResultPostProcessorChain,
    configurationProfile: FizzBuzzPipelineConfigurationProfile = FizzBuzzPipelineConfigurationProfile.FULL,
  ) {
    this.mediator = mediator;
    this.eventBus = eventBus;
    this.interceptors = interceptors;
    this.resolver = resolver;
    this.postProcessorChain = postProcessorChain;
    this.configurationProfile = configurationProfile;
  }

  createPipeline(): IPipeline<number, string> {
    if (this.pipeline === null) {
      console.debug(
        `[${EnterpriseFizzBuzzPipelineFactoryBean.FACTORY_BEAN_NAME}] Creating pipeline with profile: ${this.configurationProfile}`,
      );
      this.pipeline = new EnterpriseFizzBuzzPipelineImpl();
      this.configureStages(this.pipeline);
    }
    return this.pipeline;
  }

  resetPipeline(): void {
    this.pipeline = null;
  }

  getFactoryBeanName(): string {
    return EnterpriseFizzBuzzPipelineFactoryBean.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzPipelineFactoryBean.FACTORY_BEAN_VERSION;
  }

  private configureStages(pipeline: IPipeline<number, string>): void {
    switch (this.configurationProfile) {
      case FizzBuzzPipelineConfigurationProfile.MINIMAL:
        this.configureMinimalStages(pipeline);
        break;
      case FizzBuzzPipelineConfigurationProfile.OBSERVABLE:
        this.configureObservableStages(pipeline);
        break;
      case FizzBuzzPipelineConfigurationProfile.FULL:
      default:
        this.configureFullStages(pipeline);
        break;
    }
  }

  private configureMinimalStages(pipeline: IPipeline<number, string>): void {
    pipeline.addStage(new ValueResolutionDelegationPipelineStage(this.mediator));
  }

  private configureObservableStages(pipeline: IPipeline<number, string>): void {
    pipeline.addStage(new ValueResolutionDelegationPipelineStage(this.mediator));
    pipeline.addStage(new EventNotificationPipelineStage(this.eventBus));
  }

  private configureFullStages(pipeline: IPipeline<number, string>): void {
    pipeline.addStage(new InterceptorInvocationPipelineStage(this.interceptors, this.resolver));
    pipeline.addStage(new ValueResolutionDelegationPipelineStage(this.mediator));
    pipeline.addStage(new EventNotificationPipelineStage(this.eventBus));
    pipeline.addStage(new ResultPostProcessingPipelineStage(this.postProcessorChain));
  }
}

export class EnterpriseFizzBuzzPipelineFactoryBeanFactory {
  static createFactoryBean(
    mediator: IFizzBuzzComputationMediator,
    eventBus: IComputationEventNotificationBus,
    interceptors: IEnterpriseInterceptor[],
    resolver: ICompositeValueResolver,
    postProcessorChain: IResultPostProcessorChain,
    configurationProfile: FizzBuzzPipelineConfigurationProfile = FizzBuzzPipelineConfigurationProfile.FULL,
  ): EnterpriseFizzBuzzPipelineFactoryBean {
    return new EnterpriseFizzBuzzPipelineFactoryBean(
      mediator,
      eventBus,
      interceptors,
      resolver,
      postProcessorChain,
      configurationProfile,
    );
  }
}
