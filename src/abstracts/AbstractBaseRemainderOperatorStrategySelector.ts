import type { IRemainderOperatorStrategySelector } from "../contracts/IRemainderOperatorStrategySelector.js";
import type { IModuloArithmeticStrategy } from "../contracts/IModuloArithmeticStrategy.js";

export abstract class AbstractBaseRemainderOperatorStrategySelector
  implements IRemainderOperatorStrategySelector
{
  protected readonly strategyRegistry: Map<number, IModuloArithmeticStrategy> = new Map();

  abstract selectArithmeticStrategy(divisor: number): IModuloArithmeticStrategy;
  abstract getSelectorName(): string;
  abstract getSelectorVersion(): string;

  protected resolveFromRegistry(divisor: number): IModuloArithmeticStrategy | undefined {
    return this.strategyRegistry.get(divisor);
  }

  protected registerStrategy(divisor: number, strategy: IModuloArithmeticStrategy): void {
    this.strategyRegistry.set(divisor, strategy);
  }

  protected logSelection(divisor: number, strategyName: string): void {
    console.debug(
      `[${this.getSelectorName()}:${this.getSelectorVersion()}] ` +
      `Selected strategy [${strategyName}] for divisor [${divisor}]`,
    );
  }
}
