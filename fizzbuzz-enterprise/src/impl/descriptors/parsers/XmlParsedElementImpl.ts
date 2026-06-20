import type { IXmlParsedElement } from "../../../contracts/IXmlParsedElement.js";

export class XmlParsedElementImpl implements IXmlParsedElement {
  readonly tagName: string;
  readonly attributes: ReadonlyMap<string, string>;
  readonly textContent: string;
  readonly children: readonly IXmlParsedElement[];

  constructor(
    tagName: string,
    attributes: Map<string, string>,
    textContent: string,
    children: readonly IXmlParsedElement[],
  ) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.textContent = textContent;
    this.children = children;
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }

  findChild(tagName: string): IXmlParsedElement | null {
    for (const child of this.children) {
      if (child.tagName === tagName) {
        return child;
      }
    }
    return null;
  }

  findChildren(tagName: string): readonly IXmlParsedElement[] {
    return this.children.filter((c) => c.tagName === tagName);
  }

  findAllDescendants(tagName: string): readonly IXmlParsedElement[] {
    const results: IXmlParsedElement[] = [];
    for (const child of this.children) {
      if (child.tagName === tagName) {
        results.push(child);
      }
      results.push(...child.findAllDescendants(tagName));
    }
    return results;
  }
}
