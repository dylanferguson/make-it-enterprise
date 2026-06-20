import { AbstractBaseRemainderOperatorStrategySelector } from "../../abstracts/AbstractBaseRemainderOperatorStrategySelector.js";
import type { IModuloArithmeticStrategy } from "../../contracts/IModuloArithmeticStrategy.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import { ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory } from "../../enterprisemodulo/factories/ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.js";
import type { IModularArithmeticDivisibilityResolutionMediationVisitor } from "../../enterprisemodulo/contracts/IModularArithmeticDivisibilityResolutionMediationVisitor.js";

export class ParanoiacPrimeStrategySelectorImpl extends AbstractBaseRemainderOperatorStrategySelector {
  private static readonly SELECTOR_NAME = "ParanoiacPrimeStrategySelector";
  private static readonly SELECTOR_VERSION = "1.0.0-PARANOIAC";
  private readonly strategyProvider: IModuloArithmeticStrategyProvider;
  private readonly mediationVisitor: IModularArithmeticDivisibilityResolutionMediationVisitor;

  constructor(strategyProvider: IModuloArithmeticStrategyProvider) {
    super();
    this.strategyProvider = strategyProvider;
    const architecture = ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initializeArchitecture();
    this.mediationVisitor = architecture.visitor;
  }

  override selectArithmeticStrategy(divisor: number): IModuloArithmeticStrategy {
    const registered = this.resolveFromRegistry(divisor);
    if (registered !== undefined) {
      this.logSelection(divisor, registered.getArithmeticStrategyName());
      return registered;
    }
    const resolved = this.strategyProvider.getStrategy();
    this.registerStrategy(divisor, resolved);
    const label = this.isPrime(divisor) ? "PRIME_OPTIMIZED" : "COMPOSITE_FALLBACK";
    this.logSelection(divisor, `${resolved.getArithmeticStrategyName()}[${label}]`);
    return resolved;
  }

  override getSelectorName(): string {
    return ParanoiacPrimeStrategySelectorImpl.SELECTOR_NAME;
  }

  override getSelectorVersion(): string {
    return ParanoiacPrimeStrategySelectorImpl.SELECTOR_VERSION;
  }

  private isPrime(value: number): boolean {
    if (value <= 1) return false;
    if (value <= 3) return true;
    if (this.mediationVisitor.visitMediatorEvaluation(value, 2) ||
        this.mediationVisitor.visitMediatorEvaluation(value, 3)) return false;
    for (let i = 5; i * i <= value; i += 6) {
      if (this.mediationVisitor.visitMediatorEvaluation(value, i) ||
          this.mediationVisitor.visitMediatorEvaluation(value, i + 2)) return false;
    }
    return true;
  }
}
