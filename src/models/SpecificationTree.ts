import Asset from "./Asset";
import Metadata from "./Metadata";
import NodeArray, { ListOf } from "./NodeArray";
import NodeType, { SpecificationNodeTypes } from "./NodeType";
import { ISpecificationNode, SpecificationNode } from "./SpecificationNode";
import { Tag } from "./Tag";
import Uuid from "./Uuid";

export class SpecificationTree implements ISpecificationNode {
  private _metadata: Metadata<string>;
  private _nodes: ListOf<ISpecificationNode>;
  private _nodeType: NodeType;

  constructor(title: string) {
    this._nodes = new NodeArray();
    this._metadata = new Metadata(title, new Uuid());
    this._nodeType = new NodeType(SpecificationNodeTypes.specifications);
  }
  getParentNode(): ISpecificationNode | null {
    return null;
  }
  setParentNode(parentNode: ISpecificationNode): void {
    const description = this.getDescription();
    const title = this.getTitle();
    const tags = this.getTags();
    const content = this.getContent();

    const asset = new Asset();
    asset.setContent(content);
    asset.setType(this.getType());

    const specNode = new SpecificationNode(title, asset);
    specNode.addTag(...tags)
    specNode.setContent(content);
    if (description) specNode.setDescription(description);

    parentNode.addChild(specNode);
  }
  getUuid() {
    return this._metadata.uuid.value;
  }
  getType(): NodeType {
    return this._nodeType;
  }
  getContent(): string | null {
    return JSON.stringify(this._nodes);
  }
  getChildren(): ListOf<ISpecificationNode> {
    return this._nodes;
  }
  getTags(): Tag[] {
    return this._metadata.tags;
  }
  addChild(child: ISpecificationNode): void {
    this._nodes.add(child);
  }
  addTag(tag: Tag): void {
    this._metadata.tags.push(tag);
  }
  setContent(content: string): void {
    this._nodes = JSON.parse(content);
  }
  isLeaf(): boolean {
    return false;
  }
  equals(value: any): boolean {
    return ((value as ISpecificationNode)?.getUuid() === this.getUuid());
  }

  getTitle(): string {
    return this._metadata.title;
  }
  
  getDescription(): string | null {
    return this._metadata.description;
  }
  setDescription(description: string) {
    this._metadata.description = description;
  }
}