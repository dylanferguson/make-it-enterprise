import { AbstractBaseServiceLocator } from "../../abstracts/AbstractBaseServiceLocator.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../../contracts/IRangeCalculator.js";
import { ModuloDivisibilityEvaluatorImpl } from "../evaluators/ModuloDivisibilityEvaluatorImpl.js";
import { FizzBuzzOutputFormatterImpl } from "../formatters/FizzBuzzOutputFormatterImpl.js";
import { FizzBuzzStrategyFactoryImpl } from "../factories/FizzBuzzStrategyFactoryImpl.js";
import { FizzBuzzHandlerChain } from "../handlers/FizzBuzzHandlerChain.js";
import { CompositeValueResolverImpl } from "../resolvers/CompositeValueResolverImpl.js";
import { FizzBuzzRangeCalculatorImpl } from "../calculators/FizzBuzzRangeCalculatorImpl.js";

export class ServiceLocatorImpl extends AbstractBaseServiceLocator {
  private divisibilityEvaluator: IDivisibilityEvaluator | null = null;
  private outputFormatter: IFizzBuzzOutputFormatter | null = null;
  private strategyFactory: IFizzBuzzStrategyFactory | null = null;
  private valueResolver: ICompositeValueResolver | null = null;
  private rangeCalculator: IRangeCalculator | null = null;

  override initialize(): void {
    this.divisibilityEvaluator = new ModuloDivisibilityEvaluatorImpl();
    this.outputFormatter = new FizzBuzzOutputFormatterImpl();
    this.strategyFactory = new FizzBuzzStrategyFactoryImpl(
      this.divisibilityEvaluator,
      this.outputFormatter,
    );

    const handlerChain = new FizzBuzzHandlerChain(
      this.strategyFactory,
      this.outputFormatter,
    );

    this.valueResolver = new CompositeValueResolverImpl(handlerChain.getHead());
    this.rangeCalculator = new FizzBuzzRangeCalculatorImpl(this.valueResolver);
  }

  override getDivisibilityEvaluator(): IDivisibilityEvaluator {
    this.ensureInitialized();
    return this.divisibilityEvaluator!;
  }

  override getOutputFormatter(): IFizzBuzzOutputFormatter {
    this.ensureInitialized();
    return this.outputFormatter!;
  }

  override getStrategyFactory(): IFizzBuzzStrategyFactory {
    this.ensureInitialized();
    return this.strategyFactory!;
  }

  override getValueResolver(): ICompositeValueResolver {
    this.ensureInitialized();
    return this.valueResolver!;
  }

  override getRangeCalculator(): IRangeCalculator {
    this.ensureInitialized();
    return this.rangeCalculator!;
  }
}
