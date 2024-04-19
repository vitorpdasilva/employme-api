import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import {
  CompanySize,
  CurrencyType,
  GenderType,
  JobSearchStatus,
  LocationType,
  ProfessionType,
  TechAndLanguagesAndTools,
  UserType,
} from '../enums/user.enum'
import {
  ProfilePictureDto,
  UserCultureDto,
  UserSalaryDto,
  UserEducationDto,
} from '../dtos/user.dto'

export type UserDocument = HydratedDocument<User>

@Schema({ _id: false })
export class UserGeneral {
  @Prop({
    type: String,
    enum: GenderType,
  })
  gender?: GenderType

  @Prop({ type: String })
  currentLocation?: string

  @Prop({ type: String })
  bio?: string
}

@Schema({ _id: false })
export class UserRelocation {
  @Prop({ type: String })
  openToRemote: boolean

  @Prop({ type: String })
  relocateOptions: string

  @Prop({ type: String })
  salaryExpected: string

  @Prop({ type: String, enum: CurrencyType, enumName: 'CurrencyType' })
  currency: string

  // TODO: conditional visa depending on the country
  // should be enum with country based values
  @Prop({ type: String })
  visa: string

  @Prop({ type: Boolean })
  validPassport: boolean

  @Prop({ type: String, enum: [CompanySize], enumName: 'CompanySize' })
  companySize: string[] = []

  @Prop({ type: Boolean })
  activelyLooking: boolean

  @Prop({ type: String })
  noticePeriod: string
}

@Schema({ _id: false })
class UserPreferences {
  @Prop({
    enum: JobSearchStatus,
    enumName: 'JobSearchStatus',
  })
  jobSearchStatus: string = JobSearchStatus.ACTIVE

  @Prop({ type: Object })
  salary: UserSalaryDto

  @Prop({
    type: String,
    enum: [CompanySize],
    enumName: 'CompanySize',
  })
  companySize: string[] = []

  @Prop({ type: [String] })
  hideFromCompanies: string[]
}

@Schema({ _id: true })
class UserSkillRank {
  @Prop({
    type: String,
    enum: TechAndLanguagesAndTools,
    enumName: 'TechAndLanguagesAndTools',
  })
  skill: string

  @Prop({ type: Number })
  yearsOfExp: number
}

const UserSkillRankSchema = SchemaFactory.createForClass(UserSkillRank)

@Schema({ _id: true })
class UserWorkExperience {
  @Prop({ type: String })
  id: string

  @Prop({ type: String })
  title: string

  @Prop({ type: String })
  company: string

  @Prop({ type: String, enum: LocationType, enumName: 'LocationType' })
  locationType: LocationType

  @Prop({ type: String })
  location: string

  @Prop({ type: Date })
  startDate: Date

  @Prop({ type: Boolean })
  current: boolean

  @Prop({ type: Date })
  endDate: Date

  @Prop({ type: String })
  description: string
}

const UserWorkExperienceSchema =
  SchemaFactory.createForClass(UserWorkExperience)

@Schema({ _id: true })
class UserProfessional {
  @Prop({
    type: String,
    enum: ProfessionType,
    enumName: 'ProfessionType',
  })
  profession: string

  @Prop({ type: Number })
  yearsOfExperience: number

  @Prop({ type: Boolean })
  openToDiffRole: boolean

  @Prop({
    type: [String],
    enum: ProfessionType,
    enumName: 'ProfessionType',
  })
  preferencesToWork: string[]

  @Prop({ type: [UserSkillRankSchema] })
  skillsRank: UserSkillRank[]

  @Prop({
    description: 'Work Experiences',
    type: [UserWorkExperienceSchema],
  })
  workExperience: UserWorkExperience[]
}

@Schema({ _id: true })
class Resume {
  @Prop({ type: String })
  filename: string

  @Prop({ type: String })
  path: string
}

@Schema({ _id: true })
class UserSocial {
  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  url: string
}

const ResumeSchema = SchemaFactory.createForClass(Resume)
const RelocationSchema = SchemaFactory.createForClass(UserRelocation)
const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferences)
const UserGeneralSchema = SchemaFactory.createForClass(UserGeneral)
const UserProfessionalSchema = SchemaFactory.createForClass(UserProfessional)
const UserSocialSchema = SchemaFactory.createForClass(UserSocial)
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
  general: UserGeneral

  @Prop({ type: [String] })
  jobsApplied: string[]

  @Prop({ type: UserProfessionalSchema })
  professional: UserProfessional

  @Prop({ type: RelocationSchema })
  relocation: UserRelocation

  @Prop({ type: UserPreferencesSchema })
  preferences: UserPreferences

  @Prop({ type: UserCultureDto })
  culture: UserCultureDto

  @Prop({ type: ResumeSchema })
  resume: Resume

  @Prop({ type: [UserSocialSchema], default: [] })
  social: UserSocial[]

  @Prop({ type: [UserEducationSchema], default: [] })
  education: UserEducationDto[]
}

export const UserSchema = SchemaFactory.createForClass(User)
