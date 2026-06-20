import type { IPipelineStage } from "../../contracts/IPipelineStage.js";
import type { IPipelineContext } from "../../contracts/IPipelineContext.js";
import type { IEnterpriseInterceptorChain } from "../../contracts/IEnterpriseInterceptor.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IEnterpriseInterceptor } from "../../contracts/IEnterpriseInterceptor.js";
import { AbstractBasePipelineStage } from "../../abstracts/AbstractBasePipelineStage.js";
import { EnterpriseInterceptorChainImpl } from "../interceptors/enterprise/EnterpriseInterceptorChainImpl.js";

export class InterceptorInvocationPipelineStage extends AbstractBasePipelineStage<number, string> {
  private static readonly STAGE_NAME = "InterceptorInvocationPipelineStage";
  private static readonly STAGE_VERSION = "1.0.0-ENTERPRISE";
  private static readonly STAGE_PRIORITY = 90;

  private readonly interceptors: IEnterpriseInterceptor[];
  private readonly resolver: ICompositeValueResolver;

  constructor(interceptors: IEnterpriseInterceptor[], resolver: ICompositeValueResolver) {
    super();
    this.interceptors = interceptors;
    this.resolver = resolver;
  }

  override execute(input: number, context: IPipelineContext, nextStage: IPipelineStage<number, string> | null): string {
    this.preStageExecution(input);
    const stageStartTime = performance.now();
    const interceptorChain: IEnterpriseInterceptorChain = new EnterpriseInterceptorChainImpl(
      this.interceptors,
      this.resolver,
    );
    const result = interceptorChain.proceed(input);
    this.postStageExecution(input, result, stageStartTime);
    context.setAttribute("interceptorChain.result", result);
    context.setAttribute("interceptorChain.remainingCount", interceptorChain.getRemainingInterceptorCount());
    return result;
  }

  override getStageName(): string {
    return InterceptorInvocationPipelineStage.STAGE_NAME;
  }

  override getStageVersion(): string {
    return InterceptorInvocationPipelineStage.STAGE_VERSION;
  }

  override getStagePriority(): number {
    return InterceptorInvocationPipelineStage.STAGE_PRIORITY;
  }

  override canHandle(input: number): boolean {
    return Number.isFinite(input);
  }
}
