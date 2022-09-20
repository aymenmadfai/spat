import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  public AppParameters;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.AppParameters = this.configService.config;
    console.log(this.AppParameters);


   }
   createAccount(user: any) {
    return this.http.post(this.AppParameters.apiUrl + 'api/User/AddAdminUser', user,  { responseType: 'text' });
   }
   createOrganization(organization: any) {
    return this.http.post(this.AppParameters.apiUrl + 'api/Admin/CreateCompany', organization);

   }
   updateOrganization(organization: any) {
    return this.http.put(this.AppParameters.apiUrl + 'api/Admin/UpdateCompany', organization);
   }
   getAllOrganizations() {
    return this.http.get(this.AppParameters.apiUrl + 'api/Admin/ListCompanies')
   }
   changeOrganizationStatus(data: object) {
    return this.http.put(this.AppParameters.apiUrl + 'api/Admin/SetActiveOrganisation', data)
   }
   deployOrganization(id: string) {
    return this.http.post(this.AppParameters.apiUrl + 'api/Admin/DeployCompany?IdComapany=' + id, null);
   }
}
