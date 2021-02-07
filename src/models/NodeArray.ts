import { ISpecificationNode } from "./SpecificationNode";

export default class NodeArray implements ListOf<ISpecificationNode> {
  private _nodes: ISpecificationNode[] = [];
  
  mapToArray<Transformed>(fn: MapToArrayCallback<ISpecificationNode, Transformed>): Transformed[] {
    return this._nodes.map(fn);
  }
  add(element: ISpecificationNode, index: number | null = null): void {
    if (index === null) this._nodes.push(element);
    else this._nodes.splice(index, 0, element);
  }
  get(index: number): ISpecificationNode {
    return this._nodes[index];
  }
  getAll(): ISpecificationNode[] {
    return this._nodes;
  }

  [Symbol.iterator](): Iterator<ISpecificationNode, any, undefined> {
    return this._nodes[Symbol.iterator]();
  }

}

export interface ListOf<Type> extends Iterable<Type> {
  add(element: Type, index?: number): void;
  get(index: number): Type;
  mapToArray<Transformed>(fn: MapToArrayCallback<Type, Transformed>): Transformed[];
}
type MapToArrayCallback<Type, Transformed> = (value: Type, index: number, array: ISpecificationNode[]) => Transformed;