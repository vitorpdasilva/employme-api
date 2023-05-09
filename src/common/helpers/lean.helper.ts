import { Types } from 'mongoose';

export interface ObjectModel {
  _id?: Types.ObjectId | string;
  [key: string]: any;
}

export function lean(object: ObjectModel) {
  return { ...object, id: object._id?.toString() };
}
