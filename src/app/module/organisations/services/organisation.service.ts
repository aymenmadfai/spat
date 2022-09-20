import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/service/config.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  public AppParameters;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.AppParameters = this.configService.config;
  }

  CreateCompany(company: any) {
    return this.http.post<any>(
      this.AppParameters.apiAuth + 'api/User/CreateCompany',
      company
    );
  }
  getCompany() {
    return this.http.get<any>(
      this.AppParameters.apiAuth + 'api/User/ListComapny'
    );
  }
}
