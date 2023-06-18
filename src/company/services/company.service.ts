import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from '../schemas/company.schema';
import { CompanyDto } from '../dtos/company.dto';
import { RegisterCompanyInputDto } from '../dtos/register-company.dto';
@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}

  public async register(
    companyInput: RegisterCompanyInputDto,
  ): Promise<CompanyDto> {
    const { name, email, password } = companyInput;
  }
}
