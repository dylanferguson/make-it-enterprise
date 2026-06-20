import type { IEjbHome } from "../contracts/IEjbHome.js";
import type { IEjbObject } from "../contracts/IEjbObject.js";

export abstract class AbstractBaseEjbSessionBean implements IEjbObject {
  private readonly ejbObjectName: string;
  private readonly ejbObjectVersion: string;
  private readonly ejbHandle: string;
  private removed: boolean;

  constructor(ejbObjectName: string, ejbObjectVersion: string, ejbHandle: string) {
    this.ejbObjectName = ejbObjectName;
    this.ejbObjectVersion = ejbObjectVersion;
    this.ejbHandle = ejbHandle;
    this.removed = false;
  }

  getEjbObjectName(): string {
    return this.ejbObjectName;
  }

  getEjbObjectVersion(): string {
    return this.ejbObjectVersion;
  }

  getEjbHandle(): string {
    return this.ejbHandle;
  }

  abstract invokeComputation(value: number): string;

  ejbRemove(): void {
    this.removed = true;
  }

  isRemoved(): boolean {
    return this.removed;
  }

  protected assertNotRemoved(): void {
    if (this.removed) {
      throw new Error(
        `[${this.ejbObjectName}] EJB object has been removed via ejbRemove()`,
      );
    }
  }
}
