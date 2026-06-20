import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../../contracts/IRangeCalculator.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import type { IStrategyRegistry } from "../../contracts/IStrategyRegistry.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";

export class FizzBuzzConfigurationContext {
  private divisibilityEvaluator: IDivisibilityEvaluator | null = null;
  private outputFormatter: IFizzBuzzOutputFormatter | null = null;
  private strategyFactory: IFizzBuzzStrategyFactory | null = null;
  private valueResolver: ICompositeValueResolver | null = null;
  private rangeCalculator: IRangeCalculator | null = null;
  private moduloArithmeticStrategyProvider: IModuloArithmeticStrategyProvider | null = null;
  private strategyRegistry: IStrategyRegistry | null = null;
  private applicationVersion: string = "1.0.0";
  private applicationName: string = "FizzBuzzEnterpriseEdition";

  withDivisibilityEvaluator(evaluator: IDivisibilityEvaluator): this {
    this.divisibilityEvaluator = evaluator;
    return this;
  }

  withOutputFormatter(formatter: IFizzBuzzOutputFormatter): this {
    this.outputFormatter = formatter;
    return this;
  }

  withStrategyFactory(factory: IFizzBuzzStrategyFactory): this {
    this.strategyFactory = factory;
    return this;
  }

  withValueResolver(resolver: ICompositeValueResolver): this {
    this.valueResolver = resolver;
    return this;
  }

  withRangeCalculator(calculator: IRangeCalculator): this {
    this.rangeCalculator = calculator;
    return this;
  }

  withModuloArithmeticStrategyProvider(provider: IModuloArithmeticStrategyProvider): this {
    this.moduloArithmeticStrategyProvider = provider;
    return this;
  }

  withStrategyRegistry(registry: IStrategyRegistry): this {
    this.strategyRegistry = registry;
    return this;
  }

  withApplicationVersion(version: string): this {
    this.applicationVersion = version;
    return this;
  }

  withApplicationName(name: string): this {
    this.applicationName = name;
    return this;
  }

  build(): IConfigurationContextSnapshot {
    if (this.divisibilityEvaluator === null) {
      throw new Error("DivisibilityEvaluator must be configured");
    }
    if (this.outputFormatter === null) {
      throw new Error("OutputFormatter must be configured");
    }
    if (this.strategyFactory === null) {
      throw new Error("StrategyFactory must be configured");
    }
    if (this.valueResolver === null) {
      throw new Error("ValueResolver must be configured");
    }
    if (this.rangeCalculator === null) {
      throw new Error("RangeCalculator must be configured");
    }
    if (this.moduloArithmeticStrategyProvider === null) {
      throw new Error("ModuloArithmeticStrategyProvider must be configured");
    }
    if (this.strategyRegistry === null) {
      throw new Error("StrategyRegistry must be configured");
    }
    return new ConfigurationContextSnapshotImpl(
      this.divisibilityEvaluator,
      this.outputFormatter,
      this.strategyFactory,
      this.valueResolver,
      this.rangeCalculator,
      this.moduloArithmeticStrategyProvider,
      this.strategyRegistry,
      this.applicationVersion,
      this.applicationName,
    );
  }
}

export interface IConfigurationContextSnapshot {
  getDivisibilityEvaluator(): IDivisibilityEvaluator;
  getOutputFormatter(): IFizzBuzzOutputFormatter;
  getStrategyFactory(): IFizzBuzzStrategyFactory;
  getValueResolver(): ICompositeValueResolver;
  getRangeCalculator(): IRangeCalculator;
  getModuloArithmeticStrategyProvider(): IModuloArithmeticStrategyProvider;
  getStrategyRegistry(): IStrategyRegistry;
  getApplicationVersion(): string;
  getApplicationName(): string;
}

class ConfigurationContextSnapshotImpl implements IConfigurationContextSnapshot {
  private readonly divisibilityEvaluator: IDivisibilityEvaluator;
  private readonly outputFormatter: IFizzBuzzOutputFormatter;
  private readonly strategyFactory: IFizzBuzzStrategyFactory;
  private readonly valueResolver: ICompositeValueResolver;
  private readonly rangeCalculator: IRangeCalculator;
  private readonly moduloArithmeticStrategyProvider: IModuloArithmeticStrategyProvider;
  private readonly strategyRegistry: IStrategyRegistry;
  private readonly applicationVersion: string;
  private readonly applicationName: string;

  constructor(
    divisibilityEvaluator: IDivisibilityEvaluator,
    outputFormatter: IFizzBuzzOutputFormatter,
    strategyFactory: IFizzBuzzStrategyFactory,
    valueResolver: ICompositeValueResolver,
    rangeCalculator: IRangeCalculator,
    moduloArithmeticStrategyProvider: IModuloArithmeticStrategyProvider,
    strategyRegistry: IStrategyRegistry,
    applicationVersion: string,
    applicationName: string,
  ) {
    this.divisibilityEvaluator = divisibilityEvaluator;
    this.outputFormatter = outputFormatter;
    this.strategyFactory = strategyFactory;
    this.valueResolver = valueResolver;
    this.rangeCalculator = rangeCalculator;
    this.moduloArithmeticStrategyProvider = moduloArithmeticStrategyProvider;
    this.strategyRegistry = strategyRegistry;
    this.applicationVersion = applicationVersion;
    this.applicationName = applicationName;
  }

  getDivisibilityEvaluator(): IDivisibilityEvaluator { return this.divisibilityEvaluator; }
  getOutputFormatter(): IFizzBuzzOutputFormatter { return this.outputFormatter; }
  getStrategyFactory(): IFizzBuzzStrategyFactory { return this.strategyFactory; }
  getValueResolver(): ICompositeValueResolver { return this.valueResolver; }
  getRangeCalculator(): IRangeCalculator { return this.rangeCalculator; }
  getModuloArithmeticStrategyProvider(): IModuloArithmeticStrategyProvider { return this.moduloArithmeticStrategyProvider; }
  getStrategyRegistry(): IStrategyRegistry { return this.strategyRegistry; }
  getApplicationVersion(): string { return this.applicationVersion; }
  getApplicationName(): string { return this.applicationName; }
}
