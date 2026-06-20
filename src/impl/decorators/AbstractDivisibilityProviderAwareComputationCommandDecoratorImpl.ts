import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import { DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory } from "../../divisibility/factories/DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.js";
import type { IDivisibilityModuloEvaluationStrategyProvider } from "../../divisibility/contracts/IDivisibilityModuloEvaluationStrategyProvider.js";
import { DivisibilityModuloEvaluationChainHandlerVisitorImpl } from "../../divisibility/visitors/DivisibilityModuloEvaluationChainHandlerVisitorImpl.js";
import { ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory } from "../../enterprisemodulo/factories/ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.js";
import type { IModularArithmeticDivisibilityResolutionMediationVisitor } from "../../enterprisemodulo/contracts/IModularArithmeticDivisibilityResolutionMediationVisitor.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl
  extends AbstractBaseFizzBuzzComputationCommandDecorator
{
  private static readonly DECORATOR_NAME = "AbstractDivisibilityProviderAwareComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-ABSTRACT-DIVISIBILITY-PROVIDER-AWARE";
  private static readonly COMMAND_NAME = "AbstractDivisibilityProviderAwareFizzBuzzCommand";
  private static readonly COMMAND_VERSION = "1.0.0-PROVIDER-AWARE-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_ABSTRACT_DIVISIBILITY_PROVIDER_RESOLUTION";

  private readonly divisibilityStrategyProvider: IDivisibilityModuloEvaluationStrategyProvider;
  private readonly chainVisitor: DivisibilityModuloEvaluationChainHandlerVisitorImpl;
  private readonly mediationVisitor: IModularArithmeticDivisibilityResolutionMediationVisitor;
  private providerResolutionCount: number = 0;

  constructor(wrappedCommand: IFizzBuzzComputationCommand) {
    super(wrappedCommand);
    this.divisibilityStrategyProvider =
      DivisibilityModuloEvaluationStrategyProviderFactoryBeanFactory.initializeProviderInfrastructure();
    this.chainVisitor = new DivisibilityModuloEvaluationChainHandlerVisitorImpl();
    const architecture = ModularArithmeticDivisibilityResolutionMediatorArchitectureFactoryBeanFactory.initializeArchitecture();
    this.mediationVisitor = architecture.visitor;
    this.initializeBootstrapValidation();
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const value = request.getRequestedValue();
    this.providerResolutionCount++;

    let resolvedByDivisibilityProvider = false;
    if (this.mediationVisitor.visitMediatorEvaluation(value, 3) ||
        this.mediationVisitor.visitMediatorEvaluation(value, 5)) {
      const divisors: number[] = [];
      if (this.mediationVisitor.visitMediatorEvaluation(value, 3)) divisors.push(3);
      if (this.mediationVisitor.visitMediatorEvaluation(value, 5)) divisors.push(5);
      if (this.mediationVisitor.visitMediatorEvaluation(value, 15)) divisors.push(15);

      for (const divisor of divisors) {
        const factoryBean = this.divisibilityStrategyProvider.resolveFactoryBean(divisor);
        if (factoryBean !== null) {
          const chainHandler = factoryBean.createChainHandler();
          const visited = this.chainVisitor.visitChainHandler(chainHandler);
          if (visited) {
            resolvedByDivisibilityProvider = true;
          }
        }
      }
    }

    const response = this.wrappedCommand.execute(request);

    if (resolvedByDivisibilityProvider) {
      const augmentedResponse = new FizzBuzzComputationResponseImpl(
        value,
        response.getComputedResult(),
        `abstract-divisibility-provider:${request.getRequestId()}`,
        request.getRequestId(),
      );
      augmentedResponse.setComputationDurationMs(response.getComputationDurationMs());
      augmentedResponse.setResponseStatusCode(response.getResponseStatusCode());
      return augmentedResponse;
    }

    return response;
  }

  override getCommandName(): string {
    return AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  getProviderResolutionCount(): number {
    return this.providerResolutionCount;
  }

  getDivisibilityStrategyProvider(): IDivisibilityModuloEvaluationStrategyProvider {
    return this.divisibilityStrategyProvider;
  }

  getChainVisitor(): DivisibilityModuloEvaluationChainHandlerVisitorImpl {
    return this.chainVisitor;
  }

  private initializeBootstrapValidation(): void {
    const registeredDivisors = this.divisibilityStrategyProvider.getRegisteredDivisors();
    const chainVisitorName = this.chainVisitor.getVisitorName();
    const mediationVisitorName = this.mediationVisitor.getVisitorName();
    console.debug(
      `[${AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl.DECORATOR_NAME} v${AbstractDivisibilityProviderAwareComputationCommandDecoratorImpl.DECORATOR_VERSION}] ` +
      `Bootstrap validation complete: ` +
      `provider=[${this.divisibilityStrategyProvider.getProviderName()} v${this.divisibilityStrategyProvider.getProviderVersion()}], ` +
      `registeredDivisors=[${registeredDivisors.join(", ")}], ` +
      `chainVisitor=[${chainVisitorName}], ` +
      `mediationVisitor=[${mediationVisitorName}]`,
    );
  }
}
