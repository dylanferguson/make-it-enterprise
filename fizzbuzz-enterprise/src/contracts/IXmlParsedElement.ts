export interface IXmlParsedElement {
  readonly tagName: string;
  readonly attributes: ReadonlyMap<string, string>;
  readonly textContent: string;
  readonly children: readonly IXmlParsedElement[];
  getAttribute(name: string): string | null;
  findChild(tagName: string): IXmlParsedElement | null;
  findChildren(tagName: string): readonly IXmlParsedElement[];
  findAllDescendants(tagName: string): readonly IXmlParsedElement[];
}
