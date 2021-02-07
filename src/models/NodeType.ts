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
  isLeafType(): boolean {
    return this.typeName !== SpecificationNodeTypes.specifications;
  }

}