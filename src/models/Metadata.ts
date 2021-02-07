import { Tag } from "./Tag";
import { UID } from "./Uuid";

export default class Metadata<IdType extends string | number> {

  public description: string | null = null;
  private _tags: Tag[] = [];
  private _createdAt: Date;
  private _uuid: UID<IdType>;

  constructor(public title: string, uuid: UID<IdType>) {
    this._createdAt = new Date();
    this._uuid = uuid;
  }

  get uuid(): UID<IdType> {
    return this._uuid;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  get tags(): Tag[] {
    return this._tags;
  }

}