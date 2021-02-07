import uuid from 'uuid';
export default class Uuid implements UID<string> {
  private _value: string;
  constructor() {
    this._value = uuid.v4();
  }
  get value() {
    return this._value;
  }
}

export interface UID<Type extends string | number> {
  value: Type;
}