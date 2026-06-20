import type { IFizzBuzzComputationCommandInvoker } from "../contracts/IFizzBuzzComputationCommandInvoker.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import { DefaultFizzBuzzComputationCommandInvokerImpl } from "../impl/DefaultFizzBuzzComputationCommandInvokerImpl.js";
import { FizzBuzzValueComputationCommandImpl } from "../impl/FizzBuzzValueComputationCommandImpl.js";
import { FizzBuzzRangeComputationCommandImpl } from "../impl/FizzBuzzRangeComputationCommandImpl.js";
import type { IEnterpriseFizzBuzzPublicApiSessionFacade } from "../../enterprisefacade/contracts/IEnterpriseFizzBuzzPublicApiSessionFacade.js";

let invoker: IFizzBuzzComputationCommandInvoker | null = null;

export class FizzBuzzComputationCommandFactoryBeanFactory {
  static createInvoker(): IFizzBuzzComputationCommandInvoker {
    if (invoker === null) {
      invoker = new DefaultFizzBuzzComputationCommandInvokerImpl(
        "DefaultFizzBuzzCommandInvoker",
        "1.0.0-INVOKER",
        true,
      );
      invoker.registerCommandType("FIZZBUZZ_VALUE_COMMAND");
      invoker.registerCommandType("FIZZBUZZ_RANGE_COMMAND");
    }
    return invoker;
  }

  static getInvoker(): IFizzBuzzComputationCommandInvoker | null {
    return invoker;
  }

  static createValueCommand(
    value: number,
    facade: IEnterpriseFizzBuzzPublicApiSessionFacade,
  ): IFizzBuzzComputationCommand<number> {
    return new FizzBuzzValueComputationCommandImpl(value, facade);
  }

  static createRangeCommand(
    start: number,
    end: number,
    facade: IEnterpriseFizzBuzzPublicApiSessionFacade,
  ): IFizzBuzzComputationCommand<[number, number]> {
    return new FizzBuzzRangeComputationCommandImpl(start, end, facade);
  }
}
