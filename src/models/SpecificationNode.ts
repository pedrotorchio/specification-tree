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
  addChild(child: ISpecificationNode): void;
  setDescription(description: string): void;
  setContent(content: string): void;
  isLeaf(): boolean;
}
export class SpecificationNode implements ISpecificationNode {
  private description?: string;
  private content?: string | undefined;
  private children: ISpecificationNode[] = [];

  constructor(private title: string, private type: SpecificationNodeTypes) {}

  getTitle(): string {
    return this.title;
  }
  getType(): SpecificationNodeTypes {
    return this.type;
  }
  getDescription(): string | null {
    return this.description ?? null;
  }
  getContent(): string | null {
    return this.content ?? null;
  }
  getChildren(): ISpecificationNode[] {
    return this.children;
  }


  setDescription(description: string) {
    this.description = description;
  }
  setContent(content: string) {
    this.content = content;
  }
  addChild(child: ISpecificationNode, index: number | null = null) {
    index = index ?? this.children.length;
    this.children.splice(index, 0, child);
  }

  isLeaf(): boolean {
    return this.type !== SpecificationNodeTypes.specifications;
  }
}