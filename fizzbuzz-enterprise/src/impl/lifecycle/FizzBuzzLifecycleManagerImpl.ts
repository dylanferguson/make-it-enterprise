import { AbstractBaseLifecycleManager } from "../../abstracts/AbstractBaseLifecycleManager.js";

export class FizzBuzzLifecycleManagerImpl extends AbstractBaseLifecycleManager {
  private static readonly MANAGER_NAME = "FizzBuzzLifecycleManager";
  private static readonly MANAGER_VERSION = "1.0.0-ENTERPRISE";

  constructor() {
    super(FizzBuzzLifecycleManagerImpl.MANAGER_NAME);
  }

  onBeforeInitializeAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Pre-initialize phase starting`);
  }

  onAfterInitializeAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Post-initialize phase completed`);
  }

  onBeforeStartAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Pre-start phase starting`);
  }

  onAfterStartAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Post-start phase completed`);
  }

  onBeforeStopAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Pre-stop phase starting`);
  }

  onAfterStopAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Post-stop phase completed`);
  }

  onBeforeDestroyAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Pre-destroy phase starting`);
  }

  onAfterDestroyAll(): void {
    console.debug(`[${FizzBuzzLifecycleManagerImpl.MANAGER_NAME}] Post-destroy phase completed`);
  }

  getManagerVersion(): string {
    return FizzBuzzLifecycleManagerImpl.MANAGER_VERSION;
  }
}
