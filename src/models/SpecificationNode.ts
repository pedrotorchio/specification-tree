import { Tag } from "./Tag";

export enum SpecificationNodeTypes {
  drawing = 'DRAWING',
  picture = 'PICTURE',
  text = 'TEXT',
  html = 'HTML',
  file = 'FILE',
  link = 'LINK',
  integration = 'INTEGRATION',
  list = 'LIST',
  specifications = 'SPECIFICATIONS'
}
export interface ISpecificationNode {
  getTitle(): string;
  getType(): SpecificationNodeTypes;
  getDescription(): string | null;
  getContent(): string | null;
  getChildren(): ISpecificationNode[];
  getTags(): Tag[];
  addChild(child: ISpecificationNode): void;
  addTag(tag: Tag): void;
  setDescription(description: string): void;
  setContent(content: string): void;
  isLeaf(): boolean;
}
export class SpecificationNode implements ISpecificationNode {
  private description?: string;
  private content?: string | undefined;
  private children: ISpecificationNode[] = [];
  private tags: Tag[] = [];

  constructor(private title: string, private type: SpecificationNodeTypes) {}

  getTitle(): string {
    return this.title;
  }
  getType(): SpecificationNodeTypes {
    return this.type;
  }

  getTags(): Tag[] {
    return this.tags;
  }
  addTag(tag: Tag): void {
    this.tags.push(tag);
  }
  
  getDescription(): string | null {
    return this.description ?? null;
  }
  setDescription(description: string) {
    this.description = description;
  }

  getContent(): string | null {
    return this.content ?? null;
  }
  setContent(content: string) {
    this.content = content;
  }

  getChildren(): ISpecificationNode[] {
    return this.children;
  }
  addChild(child: ISpecificationNode, index: number | null = null) {
    index = index ?? this.children.length;
    this.children.splice(index, 0, child);
  }

  isLeaf(): boolean {
    return this.type !== SpecificationNodeTypes.specifications;
  }
}