import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";
import type {
  IComputationEventStore,
  IComputationEventStoreEntry,
} from "../contracts/IComputationEventStore.js";

export class EventSourcingFizzBuzzComputationCommandDecoratorImpl
  extends AbstractBaseFizzBuzzComputationCommandDecorator
{
  private static readonly DECORATOR_NAME = "EventSourcingFizzBuzzComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-EVENT-SOURCING-DECORATOR";
  private static readonly COMMAND_NAME = "EventSourcingFizzBuzzComputationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-EVENT-SOURCING-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_VALUE_RESOLUTION_EVENT_SOURCING";
  private static readonly DEFAULT_ENTRY_TYPE = "VALUE_RESOLVED";

  private readonly eventStore: IComputationEventStore;

  constructor(
    wrappedCommand: IFizzBuzzComputationCommand,
    eventStore: IComputationEventStore,
  ) {
    super(wrappedCommand);
    this.eventStore = eventStore;
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const startTime = performance.now();
    const response = this.wrappedCommand.execute(request);
    const durationMs = performance.now() - startTime;
    this.eventStore.appendEvent(
      request.getRequestedValue(),
      response.getComputedResult(),
      durationMs,
      EventSourcingFizzBuzzComputationCommandDecoratorImpl.DEFAULT_ENTRY_TYPE,
    );
    return response;
  }

  override getCommandName(): string {
    return EventSourcingFizzBuzzComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return EventSourcingFizzBuzzComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return EventSourcingFizzBuzzComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return EventSourcingFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return EventSourcingFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  getEventStore(): IComputationEventStore {
    return this.eventStore;
  }

  getEventsForValue(value: number): readonly IComputationEventStoreEntry[] {
    return this.eventStore.getEventsByValue(value);
  }

  getTotalRecordedEvents(): number {
    return this.eventStore.getEventCount();
  }

  replayAllEvents(handler: (entry: IComputationEventStoreEntry) => void): void {
    this.eventStore.replayEvents(handler);
  }
}
