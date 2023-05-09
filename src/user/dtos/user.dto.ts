import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class UserGeneralDto {
  @Expose()
  public citizenshipCode: string;

  @Expose()
  public gender: string;

  @Expose()
  public currentLocation: string;

  @Expose()
  public phone: string;

  @Expose()
  public bio: string;
}

class UserEducationDto {
  @Expose()
  public school: string;

  @Expose()
  public degree: string;

  @Expose()
  public fieldOfStudy: string;

  @Expose()
  public startDate: Date;

  @Expose()
  public endDate: Date;

  @Expose()
  public description: string;
}

class UserSocialDto {
  @Expose()
  public name: string;

  @Expose()
  public url: string;
}

class UserCultureDto {
  @Expose()
  public lookingFor: string;

  @Expose()
  public motivatesMeMore: number;

  @Expose()
  public fiveYearsCareerTrack: number;

  @Expose()
  public workBetterIn: number;
}

class UserRecolocationDto {
  @Expose()
  public openToRemote: boolean;

  @Expose()
  public relocateOptions: string;

  @Expose()
  public cadSalaryExpect: number;

  @Expose()
  public canadianVisa: number;

  @Expose()
  public usdSalaryExpect: number;

  @Expose()
  public validPassport: boolean;

  @Expose()
  public companySize: string[];

  @Expose()
  public activelyLooking: boolean;

  @Expose()
  public noticePeriod: number;
}

class UserJobSearchStatus {
  @Expose()
  public id: string;

  @Expose()
  public label: string;
}

class UserSalary {
  @Expose()
  public currency: string;

  @Expose()
  public amount: string;

  @Expose()
  public periodicity: string;
}

class UserCompanySize {
  @Expose()
  public id: number;

  @Expose()
  public option: number;

  @Expose()
  public label: string;
}

class UserPreferencesDto {
  @Expose()
  public jobSearchStatus: UserJobSearchStatus;

  @Expose()
  public salary: UserSalary;

  @Expose()
  public companySize: UserCompanySize;

  @Expose()
  public hideFromCompanies: string[];
}

class UserProfessional {
  @Expose()
  public profession: number;

  @Expose()
  public yearsOfExperience: number;

  @Expose()
  public openToDiffRole: boolean;

  @Expose()
  public preferenceToWork: number[];

  @Expose()
  public skillRank: UserSkillRank[];

  @Expose()
  public workExperience: UserWorkExperience[];
}

class UserSkillRank {
  @Expose()
  public skillId: number;

  @Expose()
  public yearsOfExp: number;
}

class UserWorkExperience {
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
  @ApiProperty({ required: true, description: 'ID' })
  @Expose()
  public id: string;

  @ApiProperty({ required: true, description: 'Email' })
  @Expose()
  public email: string;

  @ApiProperty({ required: true, description: 'Password Hash' })
  @Expose()
  public passwordHash: string;

  @Expose()
  public name?: string;

  @Expose()
  public accessCount?: number = 0;

  @Expose()
  public username?: string;

  @Expose()
  public picture?: string;

  @Expose()
  public jobsApplied?: number[];

  @Expose()
  public general?: UserGeneralDto;

  @Expose()
  public professional?: UserProfessional;

  @Expose()
  public relocation?: UserRecolocationDto;

  @Expose()
  public preferences?: UserPreferencesDto;

  @Expose()
  public culture?: UserCultureDto;

  @Expose()
  public social?: UserSocialDto[] = [];

  @Expose()
  public education?: UserEducationDto[] = [];
}

export class UserOutputDto extends OmitType(UserDto, ['passwordHash']) {}
