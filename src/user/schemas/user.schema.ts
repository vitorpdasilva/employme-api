import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ alias: '_id', auto: true })
  id: Types.ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop({ type: [String] })
  jobsApplied: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
