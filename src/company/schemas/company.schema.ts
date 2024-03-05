import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type CompanyDocument = HydratedDocument<Company>
@Schema({ _id: false })
class CompanyLocation {
  @Prop({ type: String })
  country: string

  @Prop({ type: String })
  city: string

  @Prop({ type: String })
  address: string

  @Prop({ type: String })
  postalCode: string

  @Prop({ type: String })
  provinceOrState: string
}

@Schema({ _id: false })
export class Company {
  @Prop({ alias: '_id', auto: true })
  id: Types.ObjectId

  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  domain: string

  @Prop({ type: CompanyLocation })
  location: CompanyLocation

  @Prop({ type: String })
  website: string

  @Prop({ type: String })
  adminEmail: string

  @Prop({ type: String })
  phone: string

  @Prop({ type: String })
  description: string

  @Prop({ type: String })
  logo: string

  @Prop({ type: String })
  invitees: string[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)
