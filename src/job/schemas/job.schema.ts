import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ id: false })
export class Location {
  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  country: string;
  
  @Prop({ type: String })
  province: string;
}

@Schema({ id: false })
export class Salary {
  @Prop({ type: Number })
  from: number;

  @Prop({ type: Number })
  to: number;
  
  @Prop({ type: String })
  currency: string;
  
  @Prop({ type: String })
  period: string;
  
  @Prop({ type: String })
  description: string;

  @Prop({ type: [String] })
  tags: string[];
}

@Schema({ timestamps: true })
export class Job {
  @Prop({ alias: '_id', auto: true })
  id: Types.ObjectId;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Boolean })
  recent: boolean;

  @Prop({ type: [String] })
  applicants: string[];

  @Prop({ type: String })
  locationType: string;

  @Prop({ type: Location })
  location: Location;

  @Prop({ type: Salary })
  salary: Salary;
}

export const JobSchema = SchemaFactory.createForClass(Job);
