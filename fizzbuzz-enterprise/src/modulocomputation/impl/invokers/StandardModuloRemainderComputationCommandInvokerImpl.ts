import type { IModuloRemainderComputationCommandInvoker, IModuloRemainderComputationCommand } from "../../contracts/index.js";
import { AbstractBaseModuloRemainderComputationCommandInvoker } from "../../abstracts/AbstractBaseModuloRemainderComputationCommandInvoker.js";

export class StandardModuloRemainderComputationCommandInvokerImpl
  extends AbstractBaseModuloRemainderComputationCommandInvoker
{
  private static readonly INVOKER_NAME = "StandardModuloRemainderComputationCommandInvoker";
  private static readonly INVOKER_VERSION = "1.0.0-STANDARD-INVOKER";

  private static readonly DEFAULT_DIVISOR_FALLBACK_STRATEGY_ENABLED = true;
  private static readonly FALLBACK_DIVISOR = 1;

  constructor() {
    super(
      StandardModuloRemainderComputationCommandInvokerImpl.INVOKER_NAME,
      StandardModuloRemainderComputationCommandInvokerImpl.INVOKER_VERSION,
    );
  }

  invokeComputation(value: number, divisor: number): number {
    const command = this.resolveCommandForDivisor(divisor);
    return command.executeComputation(value, divisor);
  }

  private resolveCommandForDivisor(divisor: number): IModuloRemainderComputationCommand {
    const commands = Array.from(this.registeredCommands.values());
    if (commands.length > 0) {
      return commands[0]!;
    }
    throw new Error(
      `[StandardModuloRemainderComputationCommandInvoker] No registered commands available for divisor=[${divisor}]`,
    );
  }
}
