import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  UserType,
  LocationType,
  GenderType,
  MotivationType,
  FiveYearsTrack,
  WorkEnvironmentType,
  CurrencyType,
  CompanySize,
  JobSearchStatus,
  TechAndLanguagesAndTools,
  ProfessionType,
  SocialMedia,
} from '../enums/user.enum'

class UserGeneralDto {
  @ApiProperty({
    type: String,
    enumName: 'GenderType',
    enum: GenderType,
  })
  @Expose()
  public gender?: GenderType

  @ApiProperty({ type: String })
  @Expose()
  public currentLocation?: string

  @ApiProperty({ type: String })
  @Expose()
  public bio?: string
}

class UserEducationDto {
  @ApiProperty({ type: String })
  @Expose()
  public school: string

  @ApiProperty({ type: String })
  @Expose()
  public degree: string

  @ApiProperty({ type: String })
  @Expose()
  public fieldOfStudy: string

  @ApiProperty({ type: Date })
  @Expose()
  public startDate: Date

  @ApiProperty({ type: Date })
  @Expose()
  public endDate: Date

  @ApiProperty({ type: String })
  @Expose()
  public description: string
}

class UserSocialDto {
  @ApiProperty({ type: String, enum: SocialMedia, enumName: 'SocialMedia' })
  @Expose()
  public name: string

  @ApiProperty({ type: String })
  @Expose()
  public url: string
}

class UserCultureDto {
  @ApiProperty({ type: String })
  @Expose()
  public lookingFor: string

  @ApiProperty({
    type: String,
    enumName: 'MotivationType',
    enum: MotivationType,
  })
  @Expose()
  public motivatesMeMore: string

  @ApiProperty({
    type: String,
    enumName: 'FiveYearsTrack',
    enum: FiveYearsTrack,
  })
  @Expose()
  public fiveYearsCareerTrack: string

  @ApiProperty({
    type: String,
    enumName: 'WorkEnvironmentType',
    enum: WorkEnvironmentType,
  })
  @Expose()
  public workBetterIn: string
}

class UserRecolocationDto {
  @ApiProperty({ type: String })
  @Expose()
  public openToRemote: boolean

  @ApiProperty({ type: String })
  @Expose()
  public relocateOptions: string

  @ApiProperty({ type: String })
  @Expose()
  public salaryExpected: string

  @ApiProperty({ type: String, enum: CurrencyType, enumName: 'CurrencyType' })
  @Expose()
  public currency: string

  // TODO: conditional visa depending on the country
  // should be enum with country based values
  @ApiProperty({ type: String })
  @Expose()
  public visa: string

  @ApiProperty({ type: Boolean })
  @Expose()
  public validPassport: boolean

  @ApiProperty({ type: String, enum: [CompanySize], enumName: 'CompanySize' })
  @Expose()
  public companySize: string[] = []

  @ApiProperty({ type: Boolean })
  @Expose()
  public activelyLooking: boolean

  @ApiProperty({ type: String })
  @Expose()
  public noticePeriod: string
}

class UserSalaryDto {
  @ApiProperty({ type: String })
  @Expose()
  public currency: string

  @ApiProperty({ type: String })
  @Expose()
  public amount: string

  @ApiProperty({ type: String })
  @Expose()
  public periodicity: string
}

class UserPreferencesDto {
  @ApiProperty({
    enum: JobSearchStatus,
    enumName: 'JobSearchStatus',
  })
  @Expose()
  public jobSearchStatus: string = JobSearchStatus.ACTIVE

  @ApiProperty({ type: Object })
  @Expose()
  public salary: UserSalaryDto

  @ApiProperty({
    type: String,
    enum: [CompanySize],
    enumName: 'CompanySize',
  })
  @Expose()
  public companySize: string[] = []

  @ApiProperty({ type: [String] })
  @Expose()
  public hideFromCompanies: string[]
}

class UserWorkExperienceDto {
  @ApiProperty({ type: String })
  @Expose()
  public id: string

  @ApiProperty({ type: String })
  @Expose()
  public title: string

  @ApiProperty({ type: String })
  @Expose()
  public company: string

  @ApiProperty({ type: String, enum: LocationType, enumName: 'LocationType' })
  @Expose()
  public locationType: LocationType

  @ApiProperty({ type: String })
  @Expose()
  public location: string

  @ApiProperty({ type: Date })
  @Expose()
  public startDate: Date

  @ApiProperty({ type: Boolean })
  @Expose()
  public current: boolean

  @ApiProperty({ type: Date })
  @Expose()
  public endDate: Date

  @ApiProperty({ type: String })
  @Expose()
  public description: string
}

class UserSkillRankDto {
  @ApiProperty({
    type: String,
    enum: TechAndLanguagesAndTools,
    enumName: 'TechAndLanguagesAndTools',
  })
  @Expose()
  public skill: string

  @ApiProperty({ type: Number })
  @Expose()
  public yearsOfExp: number
}

class UserProfessionalDto {
  @ApiProperty({
    type: String,
    enum: ProfessionType,
    enumName: 'ProfessionType',
  })
  @Expose()
  public profession: string

  @ApiProperty({ type: Number })
  @Expose()
  public yearsOfExperience: number

  @ApiProperty({ type: Boolean })
  @Expose()
  public openToDiffRole: boolean

  @ApiProperty({
    type: [String],
    enum: ProfessionType,
    enumName: 'ProfessionType',
  })
  @Expose()
  public preferencesToWork: string[]

  @ApiProperty({ type: [UserSkillRankDto] })
  @Expose()
  public skillsRank: UserSkillRankDto[]

  @ApiProperty({
    description: 'Work Experiences',
    type: [UserWorkExperienceDto],
  })
  @Expose()
  public workExperiences: UserWorkExperienceDto[]
}

export class ProfilePictureDto {
  @ApiProperty({ type: String })
  @Expose()
  public data: string

  @ApiProperty({ type: Date })
  @Expose()
  public createdAt: Date
}

export class UserDto {
  @ApiProperty({ required: true, description: 'ID', uniqueItems: true })
  @Expose()
  public id: string

  @ApiProperty({ required: true, description: 'Email' })
  @Expose()
  public email: string

  @ApiProperty({ required: true, description: 'Password Hash' })
  @Expose()
  public passwordHash: string

  @ApiProperty({
    description: 'UserType',
    enumName: 'UserType',
    enum: UserType,
  })
  @Expose()
  public type: UserType

  @ApiProperty({ description: 'Name' })
  @Expose()
  public name: string

  @ApiProperty({ description: 'Access Count' })
  @Expose()
  public accessCount = 0

  @ApiProperty({ description: 'Username' })
  @Expose()
  public username: string

  @ApiProperty({ description: 'User Profile Picture' })
  @Expose()
  public picture: ProfilePictureDto

  @ApiProperty({ description: 'Jobs Applied' })
  @Expose()
  public jobsApplied: string[]

  @ApiProperty({ description: 'General User Info' })
  @Expose()
  public general: UserGeneralDto

  @ApiProperty({ description: 'Professional User Info' })
  @Expose()
  public professional: UserProfessionalDto

  @ApiProperty({ description: 'Relocation User Info' })
  @Expose()
  public relocation: UserRecolocationDto

  @ApiProperty({ description: 'Preferences User Info' })
  @Expose()
  public preferences: UserPreferencesDto

  @ApiProperty({ description: 'Culture User Info' })
  @Expose()
  public culture: UserCultureDto

  @ApiProperty({ description: 'Social User Info' })
  @Expose()
  public social: UserSocialDto[] = []

  @ApiProperty({ description: 'Education User Info' })
  @Expose()
  public education: UserEducationDto[] = []
}

export class UserOutputDto extends OmitType(UserDto, ['passwordHash']) {}
