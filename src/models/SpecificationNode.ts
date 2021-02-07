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
  addTag(tag: Tag): void;
  setDescription(description: string): void;
  setContent(content: string): void;
  isLeaf(): boolean;
}
export class SpecificationNode implements ISpecificationNode {
  
  private _asset: Asset;
  private _children: NodeArray;
  private _metadata: Metadata<string>;

  constructor(title: string, private _type: NodeType) {
    this._children = new NodeArray();
    this._metadata = new Metadata(title, new Uuid());
    this._asset = new Asset();
  }
  getUuid() {
    return this._metadata.uuid.value;
  }
  getTitle(): string {
    return this._metadata.title;
  }
  getType(): NodeType {
    return this._type;
  }

  getTags(): Tag[] {
    return this._metadata.tags;
  }
  addTag(tag: Tag): void {
    this._metadata.tags.push(tag);
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
    this._children.add(child, index);
  }
  isLeaf() {
    return this._type.isLeafType();
  }
}