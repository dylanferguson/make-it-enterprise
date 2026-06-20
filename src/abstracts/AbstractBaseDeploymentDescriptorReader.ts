import type { IDeploymentDescriptorReader } from "../contracts/IDeploymentDescriptorReader.js";
import type { IDeploymentDescriptorEntry } from "../contracts/IDeploymentDescriptorReader.js";
import type { IModuloArithmeticStrategyProvider } from "../contracts/IModuloArithmeticStrategyProvider.js";

export abstract class AbstractBaseDeploymentDescriptorReader
  implements IDeploymentDescriptorReader
{
  abstract readDescriptor(): readonly IDeploymentDescriptorEntry[];
  abstract getDescriptorName(): string;
  abstract getDescriptorVersion(): string;
  abstract configureFromDescriptor(provider: IModuloArithmeticStrategyProvider): void;

  protected logDescriptorParsing(entryCount: number): void {
    console.debug(
      `[${this.getDescriptorName()}:${this.getDescriptorVersion()}] ` +
      `Parsed deployment descriptor with ${entryCount} entries`,
    );
  }

  protected parseBeanClassName(className: string): string {
    const parts = className.split(".");
    return parts[parts.length - 1] ?? className;
  }
}
