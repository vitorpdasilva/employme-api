import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import {
  UserType,
  JobSearchStatus,
  ProfessionType,
  GenderType,
  SocialMedia,
} from '../enums/user.enum'
import { ProfilePictureDto } from '../dtos/user.dto'

export type UserDocument = HydratedDocument<User>

@Schema({ _id: false })
class UserGeneral {
  @Prop({ type: String, enum: GenderType })
  gender?: GenderType

  @Prop({ type: String })
  currentLocation?: string

  @Prop({ type: String })
  bio?: string
}

@Schema({ _id: false })
class UserWorkExperience {
  @Prop({ type: String })
  id: string

  @Prop({ type: String })
  title: string

  @Prop({ type: String })
  company: string

  @Prop({ type: String })
  location: string

  @Prop({ type: Date })
  startDate: Date

  @Prop({ type: Date })
  endDate: Date

  @Prop({ type: String })
  description: string
}

@Schema({ _id: false })
class UserSkillRank {
  @Prop({ type: String })
  skillId: string

  @Prop({ type: Number })
  yearsOfExp: number
}

@Schema({ _id: false })
class UserProfessional {
  @Prop({
    type: String,
    enum: ProfessionType,
  })
  profession: ProfessionType

  @Prop({ type: Number })
  yearsOfExp: number

  @Prop({ type: Boolean })
  openToDiffRole: boolean

  @Prop({ type: [String] })
  preferencesToWork: string[]

  @Prop({ type: UserSkillRank })
  skillsRank: UserSkillRank[]

  @Prop({ type: UserWorkExperience, default: [] })
  workExperience: UserWorkExperience[]
}

const UserProfessionalSchema = SchemaFactory.createForClass(UserProfessional)

@Schema({ _id: false })
class UserRecolocation {
  @Prop({ type: Boolean })
  openToRemote: boolean

  @Prop({ type: String })
  relocateOptions: string

  @Prop({ type: Number })
  cadSalaryExpect: number

  @Prop({ type: Number })
  canadianVisa: number

  @Prop({ type: Number })
  usdSalaryExpect: number

  @Prop({ type: Boolean })
  validPassport: boolean

  @Prop({ type: [String] })
  companySize: string[]

  @Prop({ type: Boolean })
  activelyLooking: boolean

  @Prop({ type: Number })
  noticePeriod: number
}

@Schema({ _id: false })
class UserSalary {
  @Prop({ type: String })
  currency: string

  @Prop({ type: String })
  amount: string

  @Prop({ type: String })
  periodicity: string
}

@Schema({ _id: false })
class UserCompanySize {
  @Prop({ type: Number })
  id: number

  @Prop({ type: Number })
  option: number

  @Prop({ type: String })
  label: string
}

@Schema({ _id: false })
class UserPreferences {
  @Prop({
    type: String,
    enum: JobSearchStatus,
    default: JobSearchStatus.ACTIVE,
  })
  jobSearchStatus: string

  @Prop({ type: UserSalary })
  salary: UserSalary

  @Prop({ type: UserCompanySize })
  companySize: UserCompanySize

  @Prop({ type: [String] })
  hideFromCompanies: string[]
}

@Schema({ _id: false })
class UserCulture {
  @Prop({ type: String })
  lookingFor: string

  @Prop({ type: Number })
  motivatesMeMore: number

  @Prop({ type: Number })
  fiveYearsCareerTrack: number

  @Prop({ type: Number })
  workBetterIn: number
}

@Schema({ _id: false })
class UserSocial {
  @Prop({ type: String, enum: SocialMedia })
  name: SocialMedia

  @Prop({ type: String })
  url: string
}
export const UserSocialSchema = SchemaFactory.createForClass(UserSocial)

@Schema({ _id: false })
class UserEducation {
  @Prop({ type: String })
  school: string

  @Prop({ type: String })
  degree: string

  @Prop({ type: String })
  fieldOfStudy: string

  @Prop({ type: Date })
  startDate: Date

  @Prop({ type: Date })
  endDate: Date

  @Prop({ type: String })
  description: string
}

export const UserEducationSchema = SchemaFactory.createForClass(UserEducation)

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

  @Prop({ type: UserGeneral })
  general: UserGeneral

  @Prop({ type: [String] })
  jobsApplied: string[]

  @Prop({ type: UserProfessionalSchema, default: [] })
  professional: UserProfessional[]

  @Prop({ type: UserRecolocation })
  relocation: UserRecolocation

  @Prop({ type: UserPreferences })
  preferences: UserPreferences

  @Prop({ type: UserCulture })
  culture: UserCulture

  @Prop({ type: UserSocialSchema, default: [] })
  social: UserSocial[]

  @Prop({ type: UserEducationSchema, default: [] })
  education: UserEducation[]
}

export const UserSchema = SchemaFactory.createForClass(User)
