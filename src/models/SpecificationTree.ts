import { ISpecificationNode, SpecificationNodeTypes } from "./SpecificationNode";
import { Tag } from "./Tag";

export class SpecificationTree implements ISpecificationNode {
  private description: string | null = null;
  private nodes: ISpecificationNode[] = [];

  constructor(private title: string) {}
  getType(): SpecificationNodeTypes {
    return SpecificationNodeTypes.specifications;
  }
  getContent(): string | null {
    return JSON.stringify(this.nodes);
  }
  getChildren(): ISpecificationNode[] {
    return this.nodes;
  }
  getTags(): Tag[] {
    return [];
  }
  addChild(child: ISpecificationNode): void {
    this.nodes.push(child);
  }
  addTag(tag: Tag): void {
    
  }
  setContent(content: string): void {
    this.nodes = JSON.parse(content);
  }
  isLeaf(): boolean {
    return false;
  }

  getTitle(): string {
    return this.title;
  }
  
  getDescription(): string | null {
    return this.description;
  }
  setDescription(description: string) {
    this.description = description;
  }
}