import { AbstractBaseEnterpriseTransactionRollbackStrategy } from "../abstracts/AbstractBaseEnterpriseTransactionRollbackStrategy.js";
import type { TransactionAttributeType } from "../contracts/IEnterpriseTransactionAttribute.js";
import { TransactionAttributeType as TxAttrValues } from "../contracts/IEnterpriseTransactionAttribute.js";

export class DefaultEnterpriseTransactionRollbackStrategyImpl
  extends AbstractBaseEnterpriseTransactionRollbackStrategy
{
  private static readonly ROLLBACK_STRATEGY_NAME = "DefaultEnterpriseTransactionRollbackStrategy";
  private static readonly ROLLBACK_STRATEGY_VERSION = "1.0.0-ROLLBACK-STRATEGY";

  private readonly rollbackOnAttributeTriggers: TransactionAttributeType[] = [
    TxAttrValues.REQUIRED,
    TxAttrValues.REQUIRES_NEW,
  ];

  override isRollbackRequired(error: Error): boolean {
    const required = this.isExceptionOfType(
      error,
      "Error",
      "ComputationError",
      "ModuloEvaluationError",
      "DivisibilityValidationError",
      "TransactionRollbackError",
    );
    if (required) {
      console.debug(
        `[${this.getRollbackStrategyName()} v${this.getRollbackStrategyVersion()}] ` +
        `Rollback required for [${error.name}]: ${error.message}`,
      );
    }
    return required;
  }

  override getRollbackCause(error: Error): string {
    return `${this.buildRollbackCauseKey(error)}:${error.message}`;
  }

  override getRollbackStrategyName(): string {
    return DefaultEnterpriseTransactionRollbackStrategyImpl.ROLLBACK_STRATEGY_NAME;
  }

  override getRollbackStrategyVersion(): string {
    return DefaultEnterpriseTransactionRollbackStrategyImpl.ROLLBACK_STRATEGY_VERSION;
  }

  override getAttributeTriggers(): TransactionAttributeType[] {
    return [...this.rollbackOnAttributeTriggers];
  }
}
