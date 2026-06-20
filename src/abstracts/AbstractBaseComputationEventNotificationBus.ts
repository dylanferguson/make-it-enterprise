import type { IComputationEvent } from "../contracts/IComputationEvent.js";
import type { IComputationEventListener } from "../contracts/IComputationEventListener.js";
import type { IComputationEventNotificationBus } from "../contracts/IComputationEventNotificationBus.js";

export abstract class AbstractBaseComputationEventNotificationBus
  implements IComputationEventNotificationBus
{
  protected readonly listeners: IComputationEventListener[] = [];
  private readonly busName: string;
  private readonly busVersion: string;

  constructor(busName: string, busVersion: string) {
    this.busName = busName;
    this.busVersion = busVersion;
  }

  abstract publishEvent(event: IComputationEvent): void;

  registerListener(listener: IComputationEventListener): void {
    this.assertListenerNotRegistered(listener.getListenerName());
    this.listeners.push(listener);
    this.listeners.sort(
      (a, b) => b.getListenerPriority() - a.getListenerPriority(),
    );
    console.debug(
      `[${this.busName}:${this.busVersion}] Registered listener [${listener.getListenerName()}] priority=${listener.getListenerPriority()}`,
    );
  }

  unregisterListener(listenerName: string): boolean {
    const index = this.listeners.findIndex(
      (l) => l.getListenerName() === listenerName,
    );
    if (index === -1) {
      return false;
    }
    this.listeners.splice(index, 1);
    console.debug(
      `[${this.busName}:${this.busVersion}] Unregistered listener [${listenerName}]`,
    );
    return true;
  }

  getRegisteredListeners(): readonly IComputationEventListener[] {
    return [...this.listeners];
  }

  getBusName(): string {
    return this.busName;
  }

  getBusVersion(): string {
    return this.busVersion;
  }

  clearListeners(): void {
    this.listeners.length = 0;
  }

  protected dispatchToMatchingListeners(event: IComputationEvent): void {
    for (const listener of this.listeners) {
      if (listener.supportsEventType(event.getEventType())) {
        listener.onEvent(event);
      }
    }
  }

  private assertListenerNotRegistered(listenerName: string): void {
    const exists = this.listeners.some(
      (l) => l.getListenerName() === listenerName,
    );
    if (exists) {
      throw new Error(
        `[${this.busName}] Listener [${listenerName}] is already registered`,
      );
    }
  }
}
