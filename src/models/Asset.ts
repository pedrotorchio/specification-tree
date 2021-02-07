import { JsonValue } from 'type-fest';
export default class Asset {
  private _content: string | null = null;

  getContent(): string | null {
    return this._content === null ? null : JSON.parse(this._content);
  }
  setContent(content: JsonValue) {
    this._content = JSON.stringify(content);
  }
}