import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export interface IEnterpriseComputedOutcomePreEvaluationCommand {
  getCommandName(): string;
  getCommandVersion(): string;
  getCommandPriority(): number;
  getSupportedDivisor(): number | null;
  getOutputMessage(): string | null;
  evaluate(value: number): string | null;
  isFallbackCommand(): boolean;
}

export interface IEnterpriseComputedOutcomePreEvaluationCommandChain {
  getChainName(): string;
  getChainVersion(): string;
  getRegisteredCommandCount(): number;
  getRegisteredCommandNames(): readonly string[];
  addCommand(command: IEnterpriseComputedOutcomePreEvaluationCommand): void;
  removeCommand(commandName: string): boolean;
  evaluate(value: number): string | null;
  clearChain(): void;
}

export interface IEnterpriseComputedOutcomePreEvaluationCommandRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  getRegisteredCommandCount(): number;
  getRegisteredCommandNames(): readonly string[];
  registerCommand(command: IEnterpriseComputedOutcomePreEvaluationCommand): void;
  unregisterCommand(commandName: string): boolean;
  findCommand(commandName: string): IEnterpriseComputedOutcomePreEvaluationCommand | null;
  clearRegistry(): void;
}

export interface IPreEvaluationAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade {
  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getPreEvaluationCommandChain(): IEnterpriseComputedOutcomePreEvaluationCommandChain;
  getPreEvaluationCommandRegistry(): IEnterpriseComputedOutcomePreEvaluationCommandRegistry;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isPreEvaluationEnabled(): boolean;
}

export type {
  IFizzBuzzComputedOutcomeTransferObject,
} from "../transferobjects/IFizzBuzzComputedOutcomeTransferObject.js";

export type {
  IFizzBuzzComputedOutcomeEntity,
} from "../entities/IFizzBuzzComputedOutcomeEntity.js";

export type {
  IFizzBuzzComputedOutcomeEntityHome,
} from "../entities/IFizzBuzzComputedOutcomeEntityHome.js";

export type {
  IEntityManager,
} from "../persistence/IEntityManager.js";

export type {
  IPersistenceContext,
} from "../persistence/IPersistenceContext.js";

export type {
  IFizzBuzzComputedOutcomeRepository,
} from "../repository/IFizzBuzzComputedOutcomeRepository.js";
