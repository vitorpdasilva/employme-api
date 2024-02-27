import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserType, LocationType, GenderTypeDto } from '../enums/user.enum';

class UserGeneralDto {
  @ApiProperty({ type: String })
  @Expose()
  public citizenshipCode: string;

  @ApiProperty({ type: String, enumName: 'GenderTypeDto', enum: GenderTypeDto })
  @Expose()
  public gender: GenderTypeDto;

  @ApiProperty({ type: String })
  @Expose()
  public currentLocation: string;

  @ApiProperty({ type: String })
  @Expose()
  public phone: string;

  @ApiProperty({ type: String })
  @Expose()
  public bio: string;
}

class UserEducationDto {
  @ApiProperty({ type: String })
  @Expose()
  public school: string;

  @ApiProperty({ type: String })
  @Expose()
  public degree: string;

  @ApiProperty({ type: String })
  @Expose()
  public fieldOfStudy: string;

  @ApiProperty({ type: Date })
  @Expose()
  public startDate: Date;

  @ApiProperty({ type: Date })
  @Expose()
  public endDate: Date;

  @ApiProperty({ type: String })
  @Expose()
  public description: string;
}

class UserSocialDto {
  @ApiProperty({ type: String })
  @Expose()
  public name: string;

  @ApiProperty({ type: String })
  @Expose()
  public url: string;
}

class UserCultureDto {
  @ApiProperty({ type: String })
  @Expose()
  public lookingFor: string;

  @ApiProperty({ type: String })
  @Expose()
  public motivatesMeMore: number;

  @ApiProperty({ type: String })
  @Expose()
  public fiveYearsCareerTrack: number;

  @ApiProperty({ type: String })
  @Expose()
  public workBetterIn: number;
}

class UserRecolocationDto {
  @ApiProperty({ type: String })
  @Expose()
  public openToRemote: boolean;

  @ApiProperty({ type: String })
  @Expose()
  public relocateOptions: string;

  @ApiProperty({ type: String })
  @Expose()
  public salaryExpected: string;

  @ApiProperty({ type: String })
  @Expose()
  public currency: string;

  @ApiProperty({ type: String })
  @Expose()
  public visa: string;

  @ApiProperty({ type: Boolean })
  @Expose()
  public validPassport: boolean;

  @ApiProperty({ type: String })
  @Expose()
  public companySize: string[];

  @ApiProperty({ type: Boolean })
  @Expose()
  public activelyLooking: boolean;

  @ApiProperty({ type: String })
  @Expose()
  public noticePeriod: string;
}

class UserJobSearchStatusDto {
  @ApiProperty({ type: String })
  @Expose()
  public id: string;

  @ApiProperty({ type: String })
  @Expose()
  public label: string;
}

class UserSalaryDto {
  @ApiProperty({ type: String })
  @Expose()
  public currency: string;

  @ApiProperty({ type: String })
  @Expose()
  public amount: string;

  @ApiProperty({ type: String })
  @Expose()
  public periodicity: string;
}

class UserCompanySizeDto {
  @ApiProperty({ type: String })
  @Expose()
  public id: string;

  // TODO: Change to ENUM
  @ApiProperty({ type: Number })
  @Expose()
  public option: number;

  @ApiProperty({ type: String })
  @Expose()
  public label: string;
}

class UserPreferencesDto {
  // TODO: Change to ENUM
  @ApiProperty({ type: String })
  @Expose()
  public jobSearchStatus: UserJobSearchStatusDto;

  @ApiProperty({ type: Object })
  @Expose()
  public salary: UserSalaryDto;

  @ApiProperty({ type: Object })
  @Expose()
  public companySize: UserCompanySizeDto;

  @ApiProperty({ type: String, isArray: true })
  @Expose()
  public hideFromCompanies: string[];
}

class UserProfessionalDto {
  @ApiProperty({ type: String })
  @Expose()
  public profession: string;

  @ApiProperty({ type: Number })
  @Expose()
  public yearsOfExperience: number;

  @ApiProperty({ type: Boolean })
  @Expose()
  public openToDiffRole: boolean;

  // TODO: CHANGE TO ENUM
  @ApiProperty({ type: Boolean })
  @Expose()
  public preferencesToWork: number[];

  @ApiProperty({ type: Object, isArray: true })
  @Expose()
  public skillsRank: UserSkillRankDto[];

  @ApiProperty({ description: 'Work Experiences' })
  @Expose()
  public workExperiences: UserWorkExperienceDto[];
}

class UserSkillRankDto {
  // TODO: Change to ENUM
  @ApiProperty({ type: Number })
  @Expose()
  public skillId: number;

  @ApiProperty({ type: Number })
  @Expose()
  public yearsOfExp: number;
}

class UserWorkExperienceDto {
  @ApiProperty({ type: String })
  @Expose()
  public id: string;

  @ApiProperty({ type: String })
  @Expose()
  public title: string;

  @ApiProperty({ type: String })
  @Expose()
  public company: string;

  @ApiProperty({ type: String, enum: LocationType, enumName: 'LocationType' })
  @Expose()
  public locationType: LocationType;

  @ApiProperty({ type: String })
  @Expose()
  public location: string;

  @ApiProperty({ type: Date })
  @Expose()
  public startDate: Date;

  @ApiProperty({ type: Boolean })
  @Expose()
  public current: boolean;

  @ApiProperty({ type: Date })
  @Expose()
  public endDate: Date;

  @ApiProperty({ type: String })
  @Expose()
  public description: string;
}

export class UserDto {
  @ApiProperty({ required: true, description: 'ID', uniqueItems: true })
  @Expose()
  public id: string;

  @ApiProperty({ required: true, description: 'Email' })
  @Expose()
  public email: string;

  @ApiProperty({ required: true, description: 'Password Hash' })
  @Expose()
  public passwordHash: string;

  @ApiProperty({
    description: 'UserType',
    enumName: 'UserType',
    enum: UserType,
  })
  @Expose()
  public type: UserType;

  @ApiProperty({ description: 'Name' })
  @Expose()
  public name: string;

  @ApiProperty({ description: 'Access Count' })
  @Expose()
  public accessCount: number = 0;

  @ApiProperty({ description: 'Username' })
  @Expose()
  public username: string;

  @ApiProperty({ description: 'Picture' })
  @Expose()
  public picture: string;

  @ApiProperty({ description: 'Jobs Applied' })
  @Expose()
  public jobsApplied: string[];

  @ApiProperty({ description: 'General User Info' })
  @Expose()
  public general: UserGeneralDto;

  @ApiProperty({ description: 'Professional User Info' })
  @Expose()
  public professional: UserProfessionalDto;

  @ApiProperty({ description: 'Relocation User Info' })
  @Expose()
  public relocation: UserRecolocationDto;

  @ApiProperty({ description: 'Preferences User Info' })
  @Expose()
  public preferences: UserPreferencesDto;

  @ApiProperty({ description: 'Culture User Info' })
  @Expose()
  public culture: UserCultureDto;

  @ApiProperty({ description: 'Social User Info' })
  @Expose()
  public social: UserSocialDto[] = [];

  @ApiProperty({ description: 'Education User Info' })
  @Expose()
  public education: UserEducationDto[] = [];
}

export class UserOutputDto extends OmitType(UserDto, ['passwordHash']) {}
