import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserType } from '../enums/user.enum';

export enum GenderTypeDto {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}
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
  @Expose()
  public id: string;

  @Expose()
  public label: string;
}

class UserSalaryDto {
  @Expose()
  public currency: string;

  @Expose()
  public amount: string;

  @Expose()
  public periodicity: string;
}

class UserCompanySizeDto {
  @Expose()
  public id: number;

  @Expose()
  public option: number;

  @Expose()
  public label: string;
}

class UserPreferencesDto {
  @Expose()
  public jobSearchStatus: UserJobSearchStatusDto;

  @Expose()
  public salary: UserSalaryDto;

  @Expose()
  public companySize: UserCompanySizeDto;

  @Expose()
  public hideFromCompanies: string[];
}

class UserProfessionalDto {
  @Expose()
  public profession: number;

  @Expose()
  public yearsOfExperience: number;

  @Expose()
  public openToDiffRole: boolean;

  @Expose()
  public preferencesToWork: number[];

  @Expose()
  public skillsRank: UserSkillRankDto[];

  @Expose()
  public workExperiences: UserWorkExperienceDto[];
}

class UserSkillRankDto {
  @Expose()
  public skillId: number;

  @Expose()
  public yearsOfExp: number;
}

class UserWorkExperienceDto {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public company: string;

  @Expose()
  public location: string;

  @Expose()
  public startDate: Date;

  @Expose()
  public current: boolean;

  @Expose()
  public endDate: Date;

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

  @Expose()
  public professional: UserProfessionalDto;

  @Expose()
  public relocation: UserRecolocationDto;

  @Expose()
  public preferences: UserPreferencesDto;

  @Expose()
  public culture: UserCultureDto;

  @Expose()
  public social: UserSocialDto[] = [];

  @Expose()
  public education: UserEducationDto[] = [];
}

export class UserOutputDto extends OmitType(UserDto, ['passwordHash']) {}
