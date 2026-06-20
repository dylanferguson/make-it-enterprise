import { AbstractBaseEnterpriseDivisibilityOrchestrationStrategyResolver } from "../abstracts/AbstractBaseEnterpriseDivisibilityOrchestrationStrategyResolver.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";
import type { IEnterpriseDivisibilityOrchestrationCommand } from "../contracts/IEnterpriseDivisibilityOrchestrationCommand.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationTemplateMethod } from "../contracts/IEnterpriseDivisibilityOrchestrationTemplateMethod.js";
import { ModuloEvaluationEnterpriseOrchestrationCommandImpl } from "./ModuloEvaluationEnterpriseOrchestrationCommandImpl.js";

export class DivisorBasedEnterpriseOrchestrationStrategyResolverImpl
  extends AbstractBaseEnterpriseDivisibilityOrchestrationStrategyResolver
{
  private static readonly RESOLVER_NAME = "DivisorBasedEnterpriseOrchestrationStrategyResolver";
  private static readonly RESOLVER_VERSION = "1.0.0-STRATEGY-RESOLVER-PATTERN";

  private readonly invoker: IEnterpriseDivisibilityOrchestrationInvoker;
  private readonly innerFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly orchestrationTemplate: IEnterpriseDivisibilityOrchestrationTemplateMethod;
  private readonly commandRegistry: Map<number, ModuloEvaluationEnterpriseOrchestrationCommandImpl> = new Map();

  constructor(
    invoker: IEnterpriseDivisibilityOrchestrationInvoker,
    innerFacade: IFizzBuzzSingleValueResolutionFacade,
    orchestrationTemplate: IEnterpriseDivisibilityOrchestrationTemplateMethod,
  ) {
    super(
      DivisorBasedEnterpriseOrchestrationStrategyResolverImpl.RESOLVER_NAME,
      DivisorBasedEnterpriseOrchestrationStrategyResolverImpl.RESOLVER_VERSION,
    );
    this.invoker = invoker;
    this.innerFacade = innerFacade;
    this.orchestrationTemplate = orchestrationTemplate;
  }

  override resolveInvoker(): IEnterpriseDivisibilityOrchestrationInvoker {
    return this.invoker;
  }

  override resolveCommandForDivisor(divisor: number): IEnterpriseDivisibilityOrchestrationCommand {
    let command = this.commandRegistry.get(divisor);
    if (command === undefined) {
      command = new ModuloEvaluationEnterpriseOrchestrationCommandImpl(
        this.innerFacade,
        this.orchestrationTemplate,
        divisor,
        divisor === 3 ? "Fizz" : divisor === 5 ? "Buzz" : `DivisibleBy${divisor}`,
      );
      this.commandRegistry.set(divisor, command);
    }
    return command;
  }
}
