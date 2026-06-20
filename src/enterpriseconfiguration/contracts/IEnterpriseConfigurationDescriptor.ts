export interface IEnterpriseConfigurationDescriptorProperty {
  getName(): string;
  getValue(): string;
  getType(): string;
}

export interface IEnterpriseConfigurationDescriptorNode {
  getNodeName(): string;
  getNodeValue(): string | null;
  getAttributes(): Record<string, string>;
  getAttribute(name: string): string | null;
  getChildNodes(): readonly IEnterpriseConfigurationDescriptorNode[];
  getChildNodesByName(name: string): readonly IEnterpriseConfigurationDescriptorNode[];
  getDescriptorName(): string;
  getDescriptorVersion(): string;
}

export interface IEnterpriseConfigurationDescriptor {
  getRootNode(): IEnterpriseConfigurationDescriptorNode;
  getProperties(): readonly IEnterpriseConfigurationDescriptorProperty[];
  getProperty(name: string): IEnterpriseConfigurationDescriptorProperty | null;
  getDescriptorName(): string;
  getDescriptorVersion(): string;
  getDescriptorSource(): string;
  getSchemaVersion(): string;
  isConfigurationValid(): boolean;
}
