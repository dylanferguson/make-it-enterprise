import type { IEnterpriseConfigurationDescriptor } from "./IEnterpriseConfigurationDescriptor.js";

export interface IEnterpriseConfigurationDescriptorParser {
  parseDescriptor(descriptorSource: string): IEnterpriseConfigurationDescriptor;
  parseDescriptorFromPath(filePath: string): IEnterpriseConfigurationDescriptor;
  getParserName(): string;
  getParserVersion(): string;
  getSupportedSchemaVersions(): readonly string[];
}
