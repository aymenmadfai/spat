import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddOrganizationComponent } from '../add-organization/add-organization.component';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { OrganisationsService } from 'src/app/core/service/organisations.service';
import { AddAccountComponent } from '../add-account/add-account.component';
import { HubConnection} from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss'],
})
export class OrganisationsComponent implements OnInit {
  private hubConnection!: HubConnection;
  columns: any[] = [];
  organizations: any = [];
  organizationsBackup: any[] = [];
  searchTerm: string = '';
  constructor(
    public navbar: NavbarService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private organisationService: OrganisationsService,
    private param: AppComponent

  ) {
    this.setNavbar();
  }

  ngOnInit(): void {
    console.warn('Global ClientId = '+this.param.clientId);
    this.columns = [
      { field: 'arrowDown', header: '', width: '3%' },
      { field: 'statut', header: '', width: '3%' },
      { field: 'logo', header: 'Logo', width: '5%' },
      { field: 'name', header: 'Organization Name', width: '15%' },
      { field: 'urlTenant', header: 'Url Tenant', width: '15%' },
      { field: 'kbis_Mf', header: 'KBIS/MF', width: '15%' },
      {field: 'pays', header: 'Country', with: '15%'},
      { field: 'email', header: 'Organization mail', width: '15%' },
      { field: 'number', header: 'Organization number', width: '15%' },
      { field: 'urlWebSite', header: 'Url website', width: '20%' },
      { field: 'actions', header: '', width: '5%' },
    ];
    this.getOrganizations();

    this.param.hubConnection.on('publicMessageMethodName', (data) => {
       console.log('public Message:' + data);
       if (data=="DEPLOYED")
       { console.warn('DEPLOYED §§')
        this.getOrganizations();
       }
     });








  }
  getOrganizations() {
    this.organisationService.getAllOrganizations().toPromise()
    .then(res => {
      console.log(res);
      this.organizations = res;
      this.organizationsBackup = this.organizations;

    })
  }
  setNavbar() {
    this.navbar.setNavBar({
      button: 'organization',
      breadrumbTitle: 'Organizations management',
      breadcrumbIcon: 'arrow',
    });
  }



  open(isEdit: boolean, organization: any) {
    const modalRef = this.modalService.open(AddOrganizationComponent, {
      size: 'lg',
      centered: true,
    });
    if (isEdit) {
      modalRef.componentInstance.Edit = true;
      modalRef.componentInstance.organization = organization;
      modalRef.componentInstance.title = 'Edit organization';
      modalRef.componentInstance.successUpdate.subscribe((isEdited: any) => {
        console.log(isEdited);

        if (isEdited) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Organization successfully updated',
            });
      this.getOrganizations();
        }
      });
    }
    modalRef.componentInstance.successAdd.subscribe((addOrganization: any) => {
      if (addOrganization) {
        this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Organization successfully created',
              });
        this.getOrganizations();
      }
    });
    modalRef.componentInstance.nameSpaceExist.subscribe((exist: boolean) => {
      if (exist) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Name space already exists',
          });
      }
    })

  }
  deleteOrganization(data: any) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.title = 'Delete organisation';
    modalRef.componentInstance.text2 = 'Are you sure to delete this organisation ?';
    modalRef.componentInstance.text1 = 'this action is not reversible !';
  }

  search(searchTerm: string) {
    this.organizations = this.organizationsBackup;
    if (searchTerm != '') {
      this.organizations = this.organizations.filter((g: any) => {
        return (
          g.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        );
      });
    } else {
      this.organizations = this.organizationsBackup;
    }
  }
  createAccount(organization: any) {


    const modalRef = this.modalService.open(AddAccountComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.organizationID = organization.organizationId;
    modalRef.componentInstance.successAdd.subscribe((addAccount: Boolean) => {
      if(addAccount) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account successfully created',
          });
        this.getOrganizations();
      }

    })

  }
  changeStatus(id:string, status: boolean) {
    console.log(status);

    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'md',
      centered: true,
    });
    if (status) {
      modalRef.componentInstance.title = 'Activate organisation';
      modalRef.componentInstance.text2 = 'Are you sure to activate this organisation ?';
    } else {
      modalRef.componentInstance.title = 'Desactivate organisation';
    modalRef.componentInstance.text2 = 'Are you sure to desactivate this organisation ?';
    }

    modalRef.componentInstance.text1 = 'this action is not reversible !';
    modalRef.componentInstance.confirm.subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.organisationService.changeOrganizationStatus({idOrganisation: id, active: status})
        .toPromise()
        .then(res => {
          console.log(res);
          if (res) {
            this.getOrganizations();
          }

        })
      }
    })
  }
  deploy(id: string) {
    console.log('start deploiment');
    const modalRef = this.modalService.open(ConfirmationComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.title = 'Deploy organisation';
    modalRef.componentInstance.text2 = 'Are you sure to deploy this organisation ?';
    modalRef.componentInstance.text1 = 'this action is not reversible !';
    const fd = new FormData;
    fd.append('IdComapany', id);
    modalRef.componentInstance.confirm.subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.organisationService.deployOrganization(id)
        .toPromise()
        .then(res => {
          if (res) {
            this.getOrganizations();
          }

        })
      }
    })
  }

}
