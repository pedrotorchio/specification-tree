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
  private _asset: Asset;

  constructor(title: string) {
    this._nodes = new NodeArray();
    this._metadata = new Metadata(title, new Uuid());
    this._asset = new Asset(new NodeType(SpecificationNodeTypes.specifications));
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
  getParentNode(): ISpecificationNode | null {
    return null;
  }
  setParentNode(): void {}
  getUuid() {
    return this._metadata.uuid.value;
  }
  getChildren(): ListOf<ISpecificationNode> {
    return this._nodes;
  }
  addChild(child: ISpecificationNode): void {
    this._nodes.add(child);
  }
  isLeaf(): boolean {
    return false;
  }
  equals(value: any): boolean {
    return ((value as ISpecificationNode)?.getUuid() === this.getUuid());
  }
  
}