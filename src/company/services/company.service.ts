import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}
}
