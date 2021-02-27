import { JsonValue } from 'type-fest';
import NodeType, { SpecificationNodeTypes } from './NodeType';
export default class Asset {
  private _content: string | null = null;
  private _type: NodeType = new NodeType(NodeType.TEXT);

  constructor(type: NodeType) {
    this._type = type;
  }

  getType(): NodeType {
    return this._type;
  }
  setType(type: NodeType) {
    this._type = type;
  }
  getContent(): string | null {
    return this._content === null ? null : JSON.parse(this._content);
  }
  setContent(content: JsonValue) {
    this._content = JSON.stringify(content);
  }
}