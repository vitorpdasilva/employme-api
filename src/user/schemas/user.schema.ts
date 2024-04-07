import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { UserType } from '../enums/user.enum'
import {
  ProfilePictureDto,
  UserCultureDto,
  ResumeDto,
  UserRelocationDto,
  UserPreferencesDto,
  UserEducationDto,
  UserGeneralDto,
  UserProfessionalDto,
  UserSocialDto,
} from '../dtos/user.dto'

export type UserDocument = HydratedDocument<User>

const ResumeSchema = SchemaFactory.createForClass(ResumeDto)
const RelocationSchema = SchemaFactory.createForClass(UserRelocationDto)
const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferencesDto)
const UserGeneralSchema = SchemaFactory.createForClass(UserGeneralDto)
const UserProfessionalSchema = SchemaFactory.createForClass(UserProfessionalDto)
const UserSocialSchema = SchemaFactory.createForClass(UserSocialDto)
const UserEducationSchema = SchemaFactory.createForClass(UserEducationDto)

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  id: Types.ObjectId

  @Prop({ unique: true })
  email: string

  @Prop({ type: String })
  passwordHash: string

  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  username: string

  @Prop({ type: ProfilePictureDto })
  picture: ProfilePictureDto

  @Prop({ default: 0, type: Number })
  accessCount: number

  @Prop({ type: String, enum: UserType, default: UserType.CANDIDATE })
  type: UserType

  @Prop({ type: UserGeneralSchema })
  general: UserGeneralDto

  @Prop({ type: [String] })
  jobsApplied: string[]

  @Prop({ type: UserProfessionalSchema })
  professional: UserProfessionalDto

  @Prop({ type: RelocationSchema })
  relocation: UserRelocationDto

  @Prop({ type: UserPreferencesSchema })
  preferences: UserPreferencesDto

  @Prop({ type: UserCultureDto })
  culture: UserCultureDto

  @Prop({ type: ResumeSchema })
  resume: ResumeDto

  @Prop({ type: [UserSocialSchema], default: [] })
  social: UserSocialDto[]

  @Prop({ type: [UserEducationSchema], default: [] })
  education: UserEducationDto[]
}

export const UserSchema = SchemaFactory.createForClass(User)
