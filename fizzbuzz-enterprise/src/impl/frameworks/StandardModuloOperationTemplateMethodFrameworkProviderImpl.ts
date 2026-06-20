import { AbstractBaseModuloOperationTemplateMethodFrameworkProvider } from "../../abstracts/AbstractBaseModuloOperationTemplateMethodFrameworkProvider.js";
import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";
import { StandardRemainderOperatorDelegationServiceImpl } from "../services/StandardRemainderOperatorDelegationServiceImpl.js";

export class StandardModuloOperationTemplateMethodFrameworkProviderImpl extends AbstractBaseModuloOperationTemplateMethodFrameworkProvider {
  private static readonly FRAMEWORK_NAME = "StandardModuloOperationTemplateMethodFramework";
  private static readonly FRAMEWORK_VERSION = "2.1.0-ENTERPRISE";

  private readonly delegationService: IRemainderOperatorDelegationService;

  constructor(
    delegationService?: IRemainderOperatorDelegationService,
  ) {
    super();
    this.delegationService = delegationService ?? new StandardRemainderOperatorDelegationServiceImpl();
  }

  override executeModuloOperation(
    dividend: number,
    divisor: number,
    _operationName: string,
  ): number {
    return this.templateMethodExecuteOperation(dividend, divisor);
  }

  override isOperationSupported(dividend: number, divisor: number): boolean {
    return Number.isFinite(dividend) && Number.isFinite(divisor) && divisor !== 0;
  }

  override getFrameworkName(): string {
    return StandardModuloOperationTemplateMethodFrameworkProviderImpl.FRAMEWORK_NAME;
  }

  override getFrameworkVersion(): string {
    return StandardModuloOperationTemplateMethodFrameworkProviderImpl.FRAMEWORK_VERSION;
  }

  protected override preProcessInputs(dividend: number, divisor: number): void {
    console.debug(
      `[${this.getFrameworkName()}] Pre-processing modulo operation: ${dividend} % ${divisor}`,
    );
  }

  protected override doExecuteOperation(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number {
    return this.delegationService.computeRemainder(
      truncatedDividend,
      truncatedDivisor,
    );
  }

  protected override postProcessOperationResult(
    result: number,
    _truncatedDividend: number,
    _truncatedDivisor: number,
  ): number {
    if (Object.is(result, -0)) {
      return 0;
    }
    return result;
  }

  protected override finalizeResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    if (result < 0) {
      return Math.abs(result);
    }
    return result;
  }
}
