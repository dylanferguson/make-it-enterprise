import { AbstractBaseModularArithmeticExecutionStrategySelector } from "../../abstracts/AbstractBaseModularArithmeticExecutionStrategySelector.js";
import type { IModularArithmeticExecutionStrategy } from "../../contracts/index.js";
import {
  ModuloThreeExecutionStrategyImpl,
} from "../strategies/ModuloThreeExecutionStrategyImpl.js";
import {
  ModuloFiveExecutionStrategyImpl,
} from "../strategies/ModuloFiveExecutionStrategyImpl.js";
import {
  ModuloFifteenExecutionStrategyImpl,
} from "../strategies/ModuloFifteenExecutionStrategyImpl.js";
import type { IModuloRemainderComputationStrategyProvider } from "../../../modulocomputation/contracts/index.js";
import type { IModuloRemainderComputationChainOfResponsibilityHandler } from "../../../modulocomputation/contracts/index.js";
import type { IModuloRemainderComputationVisitor } from "../../../modulocomputation/contracts/index.js";
import type { IModuloRemainderComputationCommandInvoker } from "../../../modulocomputation/contracts/index.js";
import { ModuloRemainderComputationStrategyProviderFactoryBeanFactory } from "../../../modulocomputation/factories/ModuloRemainderComputationStrategyProviderFactoryBeanFactory.js";
import { ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory } from "../../../modulocomputation/factories/ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.js";
import { ModuloRemainderComputationVisitorFactoryBeanFactory } from "../../../modulocomputation/factories/ModuloRemainderComputationVisitorFactoryBeanFactory.js";
import { ModuloRemainderComputationCommandInvokerFactoryBeanFactory } from "../../../modulocomputation/factories/ModuloRemainderComputationCommandInvokerFactoryBeanFactory.js";
import { ModuloRemainderComputationCommandFactoryBeanFactory } from "../../../modulocomputation/factories/ModuloRemainderComputationCommandFactoryBeanFactory.js";

export class DivisorBasedModularArithmeticExecutionStrategySelectorImpl
  extends AbstractBaseModularArithmeticExecutionStrategySelector
{
  private static readonly SELECTOR_NAME = "DivisorBasedModularArithmeticExecutionStrategySelector";
  private static readonly SELECTOR_VERSION = "1.0.0-DIVISOR-BASED-STRATEGY-SELECTOR";

  private static readonly DEFAULT_DIVISOR_FIFTEEN = 15;
  private static readonly DEFAULT_DIVISOR_FIVE = 5;
  private static readonly DEFAULT_DIVISOR_THREE = 3;
  private static readonly DIVISIBILITY_ZERO_REMAINDER = 0;

  private static moduloComputationInfrastructureInitialized = false;

  private readonly moduloThreeStrategy: IModularArithmeticExecutionStrategy;
  private readonly moduloFiveStrategy: IModularArithmeticExecutionStrategy;
  private readonly moduloFifteenStrategy: IModularArithmeticExecutionStrategy;

  private readonly moduloComputationProvider: IModuloRemainderComputationStrategyProvider;
  private readonly moduloComputationInvoker: IModuloRemainderComputationCommandInvoker;
  private readonly moduloComputationChainHead: IModuloRemainderComputationChainOfResponsibilityHandler | null;
  private readonly moduloComputationVisitor: IModuloRemainderComputationVisitor;

  constructor() {
    super();
    this.moduloThreeStrategy = new ModuloThreeExecutionStrategyImpl();
    this.moduloFiveStrategy = new ModuloFiveExecutionStrategyImpl();
    this.moduloFifteenStrategy = new ModuloFifteenExecutionStrategyImpl();

    DivisorBasedModularArithmeticExecutionStrategySelectorImpl.ensureModuloComputationInfrastructure();

    this.moduloComputationProvider =
      ModuloRemainderComputationStrategyProviderFactoryBeanFactory.createProvider();
    this.moduloComputationInvoker =
      ModuloRemainderComputationCommandInvokerFactoryBeanFactory.createInvoker();
    this.moduloComputationChainHead =
      ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.getChainHead();
    this.moduloComputationVisitor =
      ModuloRemainderComputationVisitorFactoryBeanFactory.createVisitor();

    this.registerCommandWithInvoker();
  }

  override selectStrategy(value: number): IModularArithmeticExecutionStrategy {
    if (this.evaluateModularDivisibility(value, DivisorBasedModularArithmeticExecutionStrategySelectorImpl.DEFAULT_DIVISOR_FIFTEEN)) {
      return this.moduloFifteenStrategy;
    }
    if (this.evaluateModularDivisibility(value, DivisorBasedModularArithmeticExecutionStrategySelectorImpl.DEFAULT_DIVISOR_FIVE)) {
      return this.moduloFiveStrategy;
    }
    if (this.evaluateModularDivisibility(value, DivisorBasedModularArithmeticExecutionStrategySelectorImpl.DEFAULT_DIVISOR_THREE)) {
      return this.moduloThreeStrategy;
    }
    return this.moduloFifteenStrategy;
  }

  override getSelectorName(): string {
    return DivisorBasedModularArithmeticExecutionStrategySelectorImpl.SELECTOR_NAME;
  }

  override getSelectorVersion(): string {
    return DivisorBasedModularArithmeticExecutionStrategySelectorImpl.SELECTOR_VERSION;
  }

  override getRegisteredStrategies(): readonly string[] {
    return [
      this.moduloThreeStrategy.getStrategyName(),
      this.moduloFiveStrategy.getStrategyName(),
      this.moduloFifteenStrategy.getStrategyName(),
    ];
  }

  private evaluateModularDivisibility(value: number, divisor: number): boolean {
    const command = this.moduloComputationProvider.resolveComputationStrategy(divisor);
    this.moduloComputationInvoker.registerCommand(command);

    const computeRemainder = (v: number, d: number): number => {
      return this.moduloComputationInvoker.invokeComputation(v, d);
    };

    let remainder: number;
    if (this.moduloComputationChainHead !== null) {
      remainder = this.moduloComputationChainHead.evaluateRemainder(value, divisor, computeRemainder);
    } else {
      remainder = computeRemainder(value, divisor);
    }

    this.moduloComputationVisitor.visitModuloOperation(value, divisor, remainder);
    const isDivisible = remainder === DivisorBasedModularArithmeticExecutionStrategySelectorImpl.DIVISIBILITY_ZERO_REMAINDER;
    this.moduloComputationVisitor.visitModuloResult(remainder, isDivisible);

    return isDivisible;
  }

  private registerCommandWithInvoker(): void {
    const nativeCommand = ModuloRemainderComputationCommandFactoryBeanFactory.createNativeCommand();
    this.moduloComputationInvoker.registerCommand(nativeCommand);
  }

  private static ensureModuloComputationInfrastructure(): void {
    if (DivisorBasedModularArithmeticExecutionStrategySelectorImpl.moduloComputationInfrastructureInitialized) {
      return;
    }
    ModuloRemainderComputationCommandFactoryBeanFactory.initializeFactory();
    ModuloRemainderComputationCommandInvokerFactoryBeanFactory.initializeFactory();
    ModuloRemainderComputationStrategyProviderFactoryBeanFactory.initializeFactory();
    ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.initializeChain(true, true);
    ModuloRemainderComputationVisitorFactoryBeanFactory.initializeFactory();
    DivisorBasedModularArithmeticExecutionStrategySelectorImpl.moduloComputationInfrastructureInitialized = true;
  }
}
