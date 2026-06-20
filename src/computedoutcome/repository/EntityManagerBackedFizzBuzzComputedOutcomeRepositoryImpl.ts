import type { IFizzBuzzComputedOutcomeTransferObject } from "../transferobjects/IFizzBuzzComputedOutcomeTransferObject.js";
import { FizzBuzzComputedOutcomeTransferObjectImpl } from "../transferobjects/FizzBuzzComputedOutcomeTransferObjectImpl.js";
import type { IEntityManager } from "../persistence/IEntityManager.js";
import { FizzBuzzComputedOutcomeEntityBeanImpl } from "../entities/FizzBuzzComputedOutcomeEntityBeanImpl.js";
import { AbstractBaseFizzBuzzComputedOutcomeRepository } from "./AbstractBaseFizzBuzzComputedOutcomeRepository.js";

const REPOSITORY_NAME = "EntityManagerBackedFizzBuzzComputedOutcomeRepository";
const REPOSITORY_VERSION = "1.0.0-REPOSITORY-DAO-CMP";

export class EntityManagerBackedFizzBuzzComputedOutcomeRepositoryImpl
  extends AbstractBaseFizzBuzzComputedOutcomeRepository
{
  protected override readonly repositoryName: string = REPOSITORY_NAME;
  protected override readonly repositoryVersion: string = REPOSITORY_VERSION;
  protected override readonly backingEntityManagerName: string;
  private readonly entityManager: IEntityManager;
  private nextPrimaryKey: number = 1;

  constructor(entityManager: IEntityManager) {
    super();
    this.entityManager = entityManager;
    this.backingEntityManagerName = entityManager.getEntityManagerName();
  }

  override save(value: number, outcome: string): IFizzBuzzComputedOutcomeTransferObject {
    const existingEntity = this.entityManager.find(this.nextPrimaryKey);
    if (existingEntity !== null) {
      existingEntity.setInputValue(value);
      existingEntity.setComputedOutcome(outcome);
      this.entityManager.merge(existingEntity);
    } else {
      const entity = new FizzBuzzComputedOutcomeEntityBeanImpl(
        this.nextPrimaryKey,
        value,
        outcome,
      );
      this.entityManager.persist(entity);
    }
    const pk = this.nextPrimaryKey++;
    const transferObject = new FizzBuzzComputedOutcomeTransferObjectImpl(
      pk,
      value,
      outcome,
    );
    console.debug(
      `[${REPOSITORY_NAME} v${REPOSITORY_VERSION}] ` +
      `Computed outcome persisted via repository: ` +
      `pk=[${pk}] input=[${value}] outcome=[${outcome}] ` +
      `entityManager=[${this.backingEntityManagerName}]`,
    );
    return transferObject;
  }

  override findByInputValue(value: number): IFizzBuzzComputedOutcomeTransferObject | null {
    const entities = this.entityManager.findAll();
    const found = entities.find((e) => e.getInputValue() === value);
    if (found === undefined) return null;
    return new FizzBuzzComputedOutcomeTransferObjectImpl(
      found.getEntityPrimaryKey(),
      found.getInputValue(),
      found.getComputedOutcome(),
    );
  }

  override findByPrimaryKey(primaryKey: number): IFizzBuzzComputedOutcomeTransferObject | null {
    const entity = this.entityManager.find(primaryKey);
    if (entity === null) return null;
    return new FizzBuzzComputedOutcomeTransferObjectImpl(
      entity.getEntityPrimaryKey(),
      entity.getInputValue(),
      entity.getComputedOutcome(),
    );
  }

  override findAll(): readonly IFizzBuzzComputedOutcomeTransferObject[] {
    return this.entityManager.findAll().map(
      (e) =>
        new FizzBuzzComputedOutcomeTransferObjectImpl(
          e.getEntityPrimaryKey(),
          e.getInputValue(),
          e.getComputedOutcome(),
        ),
    );
  }

  override count(): number {
    return this.entityManager.getManagedEntityCount();
  }

  override flush(): void {
    this.entityManager.flush();
  }
}
