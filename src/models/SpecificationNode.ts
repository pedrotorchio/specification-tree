import { JsonValue } from "type-fest";
import Asset from "./Asset";
import Metadata from "./Metadata";
import NodeArray, { ListOf } from "./NodeArray";
import Uuid from "./Uuid";
export interface INode {
  getChildren(): ListOf<ISpecificationNode>;
  addChild(child: ISpecificationNode): void;
  isLeaf(): boolean;
  getParentNode(): ISpecificationNode | null;
  setParentNode(node: ISpecificationNode): void;
}
export interface ISpecificationNode extends INode {
  getUuid(): string;
  getMetadata(): Metadata<string>;
  setMetadata(metadata: Metadata<string>): void;
  getAsset(): Asset | null;
  setAsset(asset: Asset): void;
  equals(object: any): boolean;
}
export class SpecificationNode implements ISpecificationNode {

  private _children: NodeArray;
  private _metadata: Metadata<string>;
  private _parentNode: ISpecificationNode | null = null;
  private _asset: Asset | null = null;

  constructor(title: string = "") {
    this._children = new NodeArray();
    this._metadata = new Metadata(title, new Uuid());
  }
  getMetadata(): Metadata<string> {
    return this._metadata;
  }
  setMetadata(metadata: Metadata<string>): void {
    this._metadata = metadata;
  }
  getAsset(): Asset | null {
    return this._asset;
  }
  setAsset(asset: Asset): void {
    this._asset = asset;
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
    return this._asset?.getType().isLeafType() ?? true;
  }
}