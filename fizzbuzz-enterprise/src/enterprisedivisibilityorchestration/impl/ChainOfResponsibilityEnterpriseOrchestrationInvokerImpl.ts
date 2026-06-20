import { AbstractBaseEnterpriseDivisibilityOrchestrationInvoker } from "../abstracts/AbstractBaseEnterpriseDivisibilityOrchestrationInvoker.js";

export class ChainOfResponsibilityEnterpriseOrchestrationInvokerImpl
  extends AbstractBaseEnterpriseDivisibilityOrchestrationInvoker
{
  private static readonly INVOKER_NAME = "ChainOfResponsibilityEnterpriseOrchestrationInvoker";
  private static readonly INVOKER_VERSION = "1.0.0-INVOKER-CHAIN-OF-RESPONSIBILITY";

  constructor() {
    super(
      ChainOfResponsibilityEnterpriseOrchestrationInvokerImpl.INVOKER_NAME,
      ChainOfResponsibilityEnterpriseOrchestrationInvokerImpl.INVOKER_VERSION,
    );
  }

  override invoke(value: number): string {
    const command = this.checkCommand();
    return command.execute(value);
  }
}
