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
export default class NodeType {
  constructor(private typeName: SpecificationNodeTypes) {}

  static readonly DRAWING = SpecificationNodeTypes.drawing
  static readonly PICTURE = SpecificationNodeTypes.picture
  static readonly TEXT = SpecificationNodeTypes.text
  static readonly HTML = SpecificationNodeTypes.html
  static readonly FILE = SpecificationNodeTypes.file
  static readonly LINK = SpecificationNodeTypes.link
  static readonly INTEGRATION = SpecificationNodeTypes.integration
  static readonly LIST = SpecificationNodeTypes.list
  static readonly SPECIFICATION_TREE = SpecificationNodeTypes.specifications

  isLeafType(): boolean {
    return this.typeName !== SpecificationNodeTypes.specifications;
  }
  get name(): SpecificationNodeTypes {
    return this.typeName
  }

}