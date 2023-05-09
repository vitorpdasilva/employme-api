import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SkillDocument = HydratedDocument<SkillList>;

@Schema({ collection: 'skills' })
export class SkillList {
  @Prop({ alias: '_id', auto: true })
  id: Types.ObjectId;

  @Prop({ unique: true })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(SkillList);
