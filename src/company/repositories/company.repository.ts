import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../schemas/company.schema';
import { CompanyDto } from '../dtos/company.dto';
import { plainToDto } from '../../common/helpers/plain-to-dto.helper';
@Injectable()
export class CompanyRepository {
  constructor(@InjectModel(Company.name) private model: Model<Company>) {}

  public async create(company: CompanyDto): Promise<CompanyDto> {
    console.log('do something');
    const companySaved = (await new this.model(company)).save();
    return plainToDto<Company, CompanyDto>(CompanyDto, companySaved);
  }

  public async isDomainAlreadyRegistered(email: string): Promise<boolean> {
    try {
      const domain = email.substring(email.lastIndexOf('@') + 1);
      const existingDomain = this.model.findOne({
        email: { $regex: `@${domain}$`, $options: 'i' },
      });
      return !!existingDomain;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
