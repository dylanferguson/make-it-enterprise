import type { IRemainderOperatorDelegationService } from "./IRemainderOperatorDelegationService.js";

export interface IRemainderOperatorDelegationServiceDecorator
  extends IRemainderOperatorDelegationService
{
  getDecoratedService(): IRemainderOperatorDelegationService;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
}
