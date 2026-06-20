import type { IEnterpriseTransactionRollbackStrategy } from "../contracts/IEnterpriseTransactionRollbackStrategy.js";
import type { TransactionAttributeType } from "../contracts/IEnterpriseTransactionAttribute.js";

export abstract class AbstractBaseEnterpriseTransactionRollbackStrategy
  implements IEnterpriseTransactionRollbackStrategy
{
  protected static readonly ROLLBACK_CAUSE_PREFIX = "ROLLBACK_STRATEGY";

  abstract isRollbackRequired(error: Error): boolean;
  abstract getRollbackCause(error: Error): string;
  abstract getRollbackStrategyName(): string;
  abstract getRollbackStrategyVersion(): string;
  abstract getAttributeTriggers(): TransactionAttributeType[];

  protected buildRollbackCauseKey(error: Error): string {
    return `${AbstractBaseEnterpriseTransactionRollbackStrategy.ROLLBACK_CAUSE_PREFIX}:${error.name}:${Date.now()}`;
  }

  protected isExceptionOfType(error: Error, ...types: string[]): boolean {
    return types.some((t) => error.name === t || error.message.includes(t));
  }
}
