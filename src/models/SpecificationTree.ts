import { ISpecificationNode } from "./SpecificationNode";

export class SpecificationTree {
  private description: string | null = null;
  private nodes: ISpecificationNode[] = [];

  constructor(private title: string) {}

  getTitle(): string {
    return this.title;
  }
  
  getDescription(): string | null {
    return this.description;
  }
  setDescription(description: string) {
    this.description = description;
  }

  getNodes(): ISpecificationNode[] {
    return this.nodes;
  }
  addNode(node: ISpecificationNode, index: number | null = null) {
    index = index ?? this.nodes.length;
    this.nodes.splice(index, 0, node);
  }
}