import { AbstractBaseFizzBuzzComputationCommand } from "../../abstracts/AbstractBaseFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IEnterpriseComputationStrategySelectionChain } from "../../contracts/IEnterpriseComputationStrategySelectionChain.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategySelectionVisitor } from "../../contracts/IEnterpriseComputationStrategySelectionVisitor.js";
import type { IEnterpriseComputationStrategyExecutionCommandFactory } from "../../contracts/IEnterpriseComputationStrategyExecutionCommandFactory.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "../../contracts/IEnterpriseComputationStrategyExecutionCommand.js";
import type { IEnterpriseComputationStrategyExecutionInterceptorChain } from "../../contracts/IEnterpriseComputationStrategyExecutionInterceptorChain.js";
import { EnterpriseComputationStrategySelectionContextImpl } from "../evaluation/EnterpriseComputationStrategySelectionContextImpl.js";

export class EnterpriseComputationStrategySelectorImpl extends AbstractBaseFizzBuzzComputationCommand {
  private static readonly COMMAND_NAME = "EnterpriseComputationStrategySelector";
  private static readonly COMMAND_VERSION = "1.0.0-STRATEGY-SELECTOR";
  private static readonly COMMAND_GROUP = "ENTERPRISE_STRATEGY_SELECTION";

  private readonly selectionChain: IEnterpriseComputationStrategySelectionChain;
  private readonly executionCommandFactory: IEnterpriseComputationStrategyExecutionCommandFactory;
  private readonly interceptorChain: IEnterpriseComputationStrategyExecutionInterceptorChain;
  private readonly visitors: IEnterpriseComputationStrategySelectionVisitor[];
  private readonly delegatedBaseCommand: IFizzBuzzComputationCommand;

  constructor(
    delegatedBaseCommand: IFizzBuzzComputationCommand,
    selectionChain: IEnterpriseComputationStrategySelectionChain,
    executionCommandFactory: IEnterpriseComputationStrategyExecutionCommandFactory,
    interceptorChain: IEnterpriseComputationStrategyExecutionInterceptorChain,
    visitors: IEnterpriseComputationStrategySelectionVisitor[] = [],
  ) {
    super();
    this.delegatedBaseCommand = delegatedBaseCommand;
    this.selectionChain = selectionChain;
    this.executionCommandFactory = executionCommandFactory;
    this.interceptorChain = interceptorChain;
    this.visitors = visitors;
  }

  getCommandName(): string {
    return EnterpriseComputationStrategySelectorImpl.COMMAND_NAME;
  }

  getCommandVersion(): string {
    return EnterpriseComputationStrategySelectorImpl.COMMAND_VERSION;
  }

  getCommandGroup(): string {
    return EnterpriseComputationStrategySelectorImpl.COMMAND_GROUP;
  }

  canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    const context = this.createSelectionContext(request);
    this.dispatchVisitors(context);
    this.applyInterceptorsPre(context);
    const startTime = performance.now();
    const headHandler = this.selectionChain.resolveStrategy(context);
    if (headHandler !== null) {
      headHandler.handleStrategySelection(context);
    }
    context.setSelectionDurationMs(performance.now() - startTime);
    const executionCommand = this.executionCommandFactory.createExecutionCommand(context);
    const response = executionCommand.executeWithStrategy(this.delegatedBaseCommand, context);
    this.applyInterceptorsPost(context, executionCommand);
    return response;
  }

  private createSelectionContext(request: IFizzBuzzComputationRequest): IEnterpriseComputationStrategySelectionContext {
    const contextId = `sel:ctx:${request.getRequestedValue()}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
    return new EnterpriseComputationStrategySelectionContextImpl(request, contextId, "STANDARD");
  }

  private dispatchVisitors(context: IEnterpriseComputationStrategySelectionContext): void {
    for (const visitor of this.visitors) {
      visitor.visitContext(context);
      const handlers = this.selectionChain.getHandlers();
      for (const handler of handlers) {
        visitor.visitHandler(handler);
      }
    }
  }

  private applyInterceptorsPre(context: IEnterpriseComputationStrategySelectionContext): void {
    const interceptors = this.interceptorChain.getInterceptors();
    for (const interceptor of interceptors) {
      interceptor.preExecution(context);
    }
  }

  private applyInterceptorsPost(
    context: IEnterpriseComputationStrategySelectionContext,
    executionCommand: IEnterpriseComputationStrategyExecutionCommand,
  ): void {
    const interceptors = this.interceptorChain.getInterceptors();
    for (const interceptor of interceptors) {
      interceptor.postExecution(context, executionCommand);
    }
  }

  getSelectionChain(): IEnterpriseComputationStrategySelectionChain {
    return this.selectionChain;
  }

  getDelegatedBaseCommand(): IFizzBuzzComputationCommand {
    return this.delegatedBaseCommand;
  }
}
