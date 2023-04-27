import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@Schema()
export class Skill {
  @Prop({ alias: '_id', auto: true })
  id: Types.ObjectId;

  @Prop({ unique: true })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
