import type { IEnterpriseComputationOutcomeLifecycleState } from "../../contracts/IEnterpriseComputationOutcomeLifecycleState.js";

export abstract class AbstractBaseComputationOutcomeLifecycleStateImpl
  implements IEnterpriseComputationOutcomeLifecycleState
{
  private readonly _stateName: string;
  private readonly _stateVersion: string;
  private readonly _stateCode: string;
  private readonly _permittedTargetCodes: readonly string[];

  constructor(
    stateName: string,
    stateVersion: string,
    stateCode: string,
    permittedTargetCodes: readonly string[],
  ) {
    this._stateName = stateName;
    this._stateVersion = stateVersion;
    this._stateCode = stateCode;
    this._permittedTargetCodes = permittedTargetCodes;
  }

  getStateName(): string {
    return this._stateName;
  }

  getStateVersion(): string {
    return this._stateVersion;
  }

  getStateCode(): string {
    return this._stateCode;
  }

  canTransitionTo(targetState: IEnterpriseComputationOutcomeLifecycleState): boolean {
    return this._permittedTargetCodes.includes(targetState.getStateCode());
  }

  getPermittedTransitionTargetStateCodes(): readonly string[] {
    return [...this._permittedTargetCodes];
  }
}
