import { JsonValue } from "type-fest";
import Asset from "./Asset";
import Metadata from "./Metadata";
import NodeArray, { ListOf } from "./NodeArray";
import NodeType from "./NodeType";
import { Tag } from "./Tag";
import Uuid from "./Uuid";
export interface ISpecificationNode {
  getUuid(): string;
  getTitle(): string;
  getType(): NodeType;
  getDescription(): string | null;
  getContent(): string | null;
  getChildren(): ListOf<ISpecificationNode>;
  getTags(): Tag[];
  addChild(child: ISpecificationNode): void;
  addTag(...tags: Tag[]): void;
  setDescription(description: string): void;
  setContent(content: string): void;
  isLeaf(): boolean;
  getParentNode(): ISpecificationNode | null;
  setParentNode(node: ISpecificationNode): void;
  equals(object: any): boolean;
}
export class SpecificationNode implements ISpecificationNode {

  private _children: NodeArray;
  private _metadata: Metadata<string>;
  private _parentNode: ISpecificationNode | null = null;

  constructor(title: string, private _asset: Asset) {
    this._children = new NodeArray();
    this._metadata = new Metadata(title, new Uuid());
  }
  getUuid() {
    return this._metadata.uuid.value;
  }
  getParentNode(): ISpecificationNode | null {
    return this._parentNode;
  }
  setParentNode(node: ISpecificationNode) {
    this._parentNode = node;
  }
  getTitle(): string {
    return this._metadata.title;
  }
  getType(): NodeType {
    return this._asset.getType();
  }

  getTags(): Tag[] {
    return this._metadata.tags;
  }
  addTag(...tags: Tag[]): void {
    this._metadata.tags.push(...tags);
  }
  
  getDescription(): string | null {
    return this._metadata.description ?? null;
  }
  setDescription(description: string) {
    this._metadata.description = description;
  }

  getContent(): string | null {
    return this._asset.getContent();
  }
  setContent(content: JsonValue) {
    this._asset.setContent(content);
  }

  getChildren(): NodeArray {
    return this._children;
  }
  addChild(child: ISpecificationNode, index: number | null = null) {
    child.setParentNode(this);
    this._children.add(child, index);
  }
  equals(value: any): boolean {
    return ((value as ISpecificationNode)?.getUuid() === this.getUuid());
  }
  isLeaf() {
    return this._asset.getType().isLeafType();
  }
}