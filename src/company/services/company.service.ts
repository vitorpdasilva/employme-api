import { ConflictException, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyDto } from '../dtos/company.dto';
import { RegisterCompanyInputDto } from '../dtos/register-company.dto';
import { TokenService } from 'src/shared/services/token.service';
@Injectable()
export class CompanyService {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async register(
    companyInput: RegisterCompanyInputDto,
  ): Promise<CompanyDto> {
    const { name, email, password } = companyInput;

    const companyFound = await this.repository.isDomainAlreadyRegistered(email);
    if (companyFound) {
      throw new ConflictException('Company already exists');
    }

    return Promise.resolve({
      id: '1',
      name,
      location: {
        country: 'Canada',
        city: 'Toronto',
        address: '1234 Street',
        postalCode: 'M4C 1B5',
        provinceOrState: 'ON',
      },
      website: 'https://www.example.com',
      adminEmail: email,
      phone: '123-456-7890',
    });
  }
}
