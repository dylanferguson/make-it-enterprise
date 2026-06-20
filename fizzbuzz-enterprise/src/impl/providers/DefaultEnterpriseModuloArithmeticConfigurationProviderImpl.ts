import { AbstractBaseEnterpriseModuloArithmeticConfigurationProvider } from "../../abstracts/AbstractBaseEnterpriseModuloArithmeticConfigurationProvider.js";

const STANDARD_FIZZBUZZ_DIVISORS = [15, 3, 5] as const;
const ALL_DIVISOR_CANDIDATES = [3, 5, 15] as const;

export class DefaultEnterpriseModuloArithmeticConfigurationProviderImpl
  extends AbstractBaseEnterpriseModuloArithmeticConfigurationProvider
{
  private static readonly PROVIDER_NAME = "DefaultEnterpriseModuloArithmeticConfigurationProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-FIZZBUZZ-CONFIG-PROVIDER";
  private static readonly CONFIGURATION_PROFILE = "STANDARD_FIZZBUZZ_DIVISOR_CONFIGURATION";

  private readonly divisorConstants: readonly number[];
  private readonly divisorCandidates: readonly number[];

  constructor(
    divisorConstants?: readonly number[],
    divisorCandidates?: readonly number[],
  ) {
    super();
    this.divisorConstants = divisorConstants ?? STANDARD_FIZZBUZZ_DIVISORS;
    this.divisorCandidates = divisorCandidates ?? ALL_DIVISOR_CANDIDATES;
  }

  override getDivisorConstants(): readonly number[] {
    return this.divisorConstants;
  }

  override getDivisorCandidates(): readonly number[] {
    return this.divisorCandidates;
  }

  override getConfigurationProviderName(): string {
    return DefaultEnterpriseModuloArithmeticConfigurationProviderImpl.PROVIDER_NAME;
  }

  override getConfigurationProviderVersion(): string {
    return DefaultEnterpriseModuloArithmeticConfigurationProviderImpl.PROVIDER_VERSION;
  }

  override getConfigurationProfile(): string {
    return DefaultEnterpriseModuloArithmeticConfigurationProviderImpl.CONFIGURATION_PROFILE;
  }
}
