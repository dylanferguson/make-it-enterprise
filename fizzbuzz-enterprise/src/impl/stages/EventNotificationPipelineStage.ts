import type { IPipelineStage } from "../../contracts/IPipelineStage.js";
import type { IPipelineContext } from "../../contracts/IPipelineContext.js";
import type { IComputationEventNotificationBus } from "../../contracts/IComputationEventNotificationBus.js";
import type { IComputationEvent } from "../../contracts/IComputationEvent.js";
import { AbstractBasePipelineStage } from "../../abstracts/AbstractBasePipelineStage.js";

export class EventNotificationPipelineStage extends AbstractBasePipelineStage<number, string> {
  private static readonly STAGE_NAME = "EventNotificationPipelineStage";
  private static readonly STAGE_VERSION = "1.0.0-ENTERPRISE";
  private static readonly STAGE_PRIORITY = 50;

  private readonly eventBus: IComputationEventNotificationBus;

  constructor(eventBus: IComputationEventNotificationBus) {
    super();
    this.eventBus = eventBus;
  }

  override execute(input: number, context: IPipelineContext, nextStage: IPipelineStage<number, string> | null): string {
    this.preStageExecution(input);
    const stageStartTime = performance.now();
    const event: IComputationEvent = {
      getEventType: () => "PIPELINE_VALUE_RESOLVED",
      getEventTimestamp: () => performance.now(),
      getEventSequenceNumber: () => this.getInvocationCount(),
      getSourceIdentifier: () => EventNotificationPipelineStage.STAGE_NAME,
      getEventPayload: () => ({
        value: input,
        pipelineExecutionId: context.getExecutionId(),
        pipelineName: "EnterpriseFizzBuzzValueResolutionPipeline",
      }),
    };
    this.eventBus.publishEvent(event);
    const nextResult = this.handleNext(input, context, nextStage);
    this.postStageExecution(input, nextResult, stageStartTime);
    return nextResult;
  }

  override getStageName(): string {
    return EventNotificationPipelineStage.STAGE_NAME;
  }

  override getStageVersion(): string {
    return EventNotificationPipelineStage.STAGE_VERSION;
  }

  override getStagePriority(): number {
    return EventNotificationPipelineStage.STAGE_PRIORITY;
  }

  override canHandle(input: number): boolean {
    return true;
  }
}
