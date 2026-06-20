import { AbstractBaseModuloArithmeticCommand } from "../abstracts/AbstractBaseModuloArithmeticCommand.js";
import { FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory } from "../../impl/factories/FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.js";

export class DelegatingResolverModuloArithmeticCommandImpl extends AbstractBaseModuloArithmeticCommand {
  private static readonly COMMAND_NAME = "DelegatingResolverModuloArithmeticCommand";
  private static readonly COMMAND_VERSION = "1.0.0-RESOLVER-DELEGATING-COMMAND";

  private readonly computationContext: string;

  constructor(computationContext?: string) {
    super();
    this.computationContext = computationContext ?? "ModuloArithmeticCommandDelegation";
  }

  override execute(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    const resolver = FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.createResolver();
    return resolver.resolveModuloResult(dividend, divisor, this.computationContext);
  }

  override getCommandName(): string {
    return DelegatingResolverModuloArithmeticCommandImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return DelegatingResolverModuloArithmeticCommandImpl.COMMAND_VERSION;
  }
}
