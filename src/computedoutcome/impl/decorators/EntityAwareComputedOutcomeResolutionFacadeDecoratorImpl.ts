import type { IEntityManager } from "../../persistence/IEntityManager.js";
import type { IFizzBuzzComputedOutcomeRepository } from "../../repository/IFizzBuzzComputedOutcomeRepository.js";
import type { IFizzBuzzComputedOutcomeEntityHome } from "../../entities/IFizzBuzzComputedOutcomeEntityHome.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IPreEvaluationAwareResolutionFacadeDecorator } from "../../contracts/index.js";
import { AbstractBasePreEvaluationAwareResolutionFacadeDecorator } from "../../abstracts/AbstractBasePreEvaluationAwareResolutionFacadeDecorator.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandChain } from "../../contracts/index.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandRegistry } from "../../contracts/index.js";

const DECORATOR_NAME = "EntityAwareComputedOutcomeResolutionFacadeDecorator";
const DECORATOR_VERSION = "1.0.0-ENTITY-AWARE-DECORATOR-CMP";
const FACADE_NAME_PREFIX = "EntityAware";

export class EntityAwareComputedOutcomeResolutionFacadeDecoratorImpl
  extends AbstractBasePreEvaluationAwareResolutionFacadeDecorator
{
  private readonly entityManager: IEntityManager;
  private readonly repository: IFizzBuzzComputedOutcomeRepository;
  private readonly entityHome: IFizzBuzzComputedOutcomeEntityHome;
  private entityPersistedCount: number = 0;
  private entityRetrievedCount: number = 0;
  private preEvaluationCount: number = 0;
  private preEvaluationHitCount: number = 0;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    preEvaluationCommandChain: IEnterpriseComputedOutcomePreEvaluationCommandChain,
    preEvaluationCommandRegistry: IEnterpriseComputedOutcomePreEvaluationCommandRegistry,
    entityManager: IEntityManager,
    repository: IFizzBuzzComputedOutcomeRepository,
    entityHome: IFizzBuzzComputedOutcomeEntityHome,
  ) {
    super(decoratedFacade, preEvaluationCommandChain, preEvaluationCommandRegistry);
    this.entityManager = entityManager;
    this.repository = repository;
    this.entityHome = entityHome;
  }

  override resolveValue(value: number): string {
    this.assertValidValue(value);

    const cached = this.repository.findByInputValue(value);
    if (cached !== null) {
      this.entityRetrievedCount++;
      console.debug(
        `[${DECORATOR_NAME} v${DECORATOR_VERSION}] ` +
        `Computed outcome resolved from entity persistence layer: ` +
        `input=[${value}] outcome=[${cached.getComputedValue()}] ` +
        `pk=[${cached.getPrimaryKey()}]`,
      );
      return cached.getComputedValue();
    }

    this.preEvaluationCount++;
    let result: string | null = null;
    if (this.preEvaluationEnabled) {
      result = this.preEvaluationCommandChain.evaluate(value);
    }

    if (result === null) {
      result = this.decoratedFacade.resolveValue(value);
    } else {
      this.preEvaluationHitCount++;
      console.debug(
        `[${DECORATOR_NAME} v${DECORATOR_VERSION}] ` +
        `Pre-evaluation hit for [${value}] -> [${result}]`,
      );
    }

    const entity = this.entityHome.create(this.entityPersistedCount + 1, value, result);
    this.entityManager.persist(entity);
    const transferObject = this.repository.save(value, result);
    this.entityPersistedCount++;

    console.debug(
      `[${DECORATOR_NAME} v${DECORATOR_VERSION}] ` +
      `Computed outcome persisted as entity bean: ` +
      `input=[${value}] outcome=[${result}] ` +
      `entityPk=[${entity.getEntityPrimaryKey()}] ` +
      `transferObject=[${transferObject.toDiagnosticString()}] ` +
      `persistedCount=[${this.entityPersistedCount}] ` +
      `retrievedCount=[${this.entityRetrievedCount}]`,
    );

    return result;
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertValidValue(start);
    this.assertValidValue(end);
    if (end < start) {
      throw new Error(
        `[${DECORATOR_NAME}] Range end [${end}] must be >= start [${start}]`,
      );
    }
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    this.entityManager.flush();
    return results;
  }

  override getFacadeName(): string {
    return `${FACADE_NAME_PREFIX}::${this.decoratedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return DECORATOR_VERSION;
  }

  getEntityPersistedCount(): number {
    return this.entityPersistedCount;
  }

  getEntityRetrievedCount(): number {
    return this.entityRetrievedCount;
  }

  getEntityManager(): IEntityManager {
    return this.entityManager;
  }

  getRepository(): IFizzBuzzComputedOutcomeRepository {
    return this.repository;
  }
}
