import { AbstractBaseComputationGovernancePolicy } from "../../abstracts/AbstractBaseComputationGovernancePolicy.js";
import { FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory } from "../../outputresolution/impl/factories/FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory.js";
import type { IFizzBuzzOutputStringResolutionStrategyProvider } from "../../outputresolution/contracts/index.js";

export class DefaultFizzBuzzComputationGovernancePolicyImpl extends AbstractBaseComputationGovernancePolicy {
  private static readonly POLICY_NAME = "DefaultFizzBuzzComputationGovernancePolicy";
  private static readonly POLICY_VERSION = "1.0.1-GOVERNANCE-POLICY-FIZZBUZZ-R2";
  private static readonly COMPUTATION_TYPE = "FIZZBUZZ_VALUE_RESOLUTION";
  private static readonly POLICY_PRIORITY = 100;
  private static readonly POLICY_DESCRIPTION =
    "Enforces standard FizzBuzz computation governance rules: validates that input values " +
    "fall within the acceptable computation range (0-65535) and that results conform to " +
    "the expected FizzBuzz output format constraints. Output validation is delegated to " +
    "the Enterprise FizzBuzzOutputStringResolutionStrategyProvider infrastructure.";

  private readonly minAcceptableValue: number;
  private readonly maxAcceptableValue: number;
  private outputStringProvider: IFizzBuzzOutputStringResolutionStrategyProvider | null = null;

  constructor(
    minValue: number = 0,
    maxValue: number = 65535,
  ) {
    super(
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_NAME,
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_VERSION,
      DefaultFizzBuzzComputationGovernancePolicyImpl.COMPUTATION_TYPE,
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_PRIORITY,
      DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_DESCRIPTION,
      true,
    );
    this.minAcceptableValue = minValue;
    this.maxAcceptableValue = maxValue;
  }

  override validateComputationValue(value: number): boolean {
    return (
      Number.isFinite(value) &&
      Number.isInteger(value) &&
      value >= this.minAcceptableValue &&
      value <= this.maxAcceptableValue
    );
  }

  override validateComputationResult(value: number, result: string): boolean {
    if (result === null || result === undefined) {
      return false;
    }
    if (typeof result !== "string") {
      return false;
    }
    if (result.length === 0) {
      return false;
    }
    const resolutionResult = this.resolveExpectedOutputString(value);
    return result === resolutionResult;
  }

  private resolveExpectedOutputString(value: number): string {
    const provider = this.resolveOutputStringProvider();
    const resolutionResult = provider.resolveOutputString(value);
    return resolutionResult.getResolvedValue();
  }

  private resolveOutputStringProvider(): IFizzBuzzOutputStringResolutionStrategyProvider {
    if (this.outputStringProvider === null) {
      this.outputStringProvider =
        FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory.createProvider(
          "LOCALE_AWARE",
        );
      console.debug(
        `[${DefaultFizzBuzzComputationGovernancePolicyImpl.POLICY_NAME}] ` +
        `Output string provider initialized: ` +
        `${this.outputStringProvider.getProviderName()} v${this.outputStringProvider.getProviderVersion()}, ` +
        `strategies=[${this.outputStringProvider.getRegisteredStrategyNames().join(", ")}]`,
      );
    }
    return this.outputStringProvider;
  }
}
