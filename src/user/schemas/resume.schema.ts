import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class PDF extends Document {
  @Prop()
  filename: string

  @Prop()
  originalName: string

  @Prop()
  path: string
}

export const PDFSchema = SchemaFactory.createForClass(PDF)
export type PDFDocument = PDF & Document
