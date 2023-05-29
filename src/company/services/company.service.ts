import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from '../schemas/company.schema';
import { CompanyDto } from '../dtos/company.dto';
@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}

  public async create(company: CompanyDto): Promise<CompanyDto> {
    return this.repository.create(company);
  }
}
