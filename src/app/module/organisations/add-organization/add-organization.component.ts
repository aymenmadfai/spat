import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import Stepper from 'bs-stepper';
import { OrganisationsService } from 'src/app/core/service/organisations.service';
import { countries } from 'src/app/core/store/country-data-store';
//import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddOrganizationComponent implements OnInit {
  private stepper: any;
  selectedOrganization: string = '';
  addOrganizationForm!: FormGroup;
  submitted = false;
  submittedfirstscreen = false;
  uploadedFile: any;
  imageSrc: any;
  @Input() title: string = 'Add Organization';
  @Input() public organization: any;
  @Input() successAdd: EventEmitter<boolean> = new EventEmitter();
  @Input() successUpdate: EventEmitter<any> = new EventEmitter();
  @Input() nameSpaceExist: EventEmitter<boolean> = new EventEmitter();
  @Input() Edit!: boolean;

  public countries:any = countries

  separateDialCode = false;
  // SearchCountryField = SearchCountryField;
  // CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
  // preferredCountries: CountryISO[] = [CountryISO.Tunisia];
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private organizationService: OrganisationsService
  ) {}

  ngOnInit(): void {
    console.log(this.organization);

    this.initValues();
    // this.stepper = new Stepper(document.querySelector('#stepper1')!, {
    //   linear: true,
    //   animation: true,
    // });
  }
  changePreferredCountries() {
    //this.preferredCountries = [CountryISO.Tunisia];
  }
  resetForm() {
    return this.addOrganizationForm.reset();
  }
  get f() {
    return this.addOrganizationForm.controls;
  }
  previous() {
    this.stepper.previous();
  }
  next() {
    this.submittedfirstscreen = true;
    if(this.f.name.value && this.f.namespace.value && this.f.mail.value && this.f.phone.value && this.f.url_tenant.value && this.f.url.value)
    this.stepper.next();

  }
  onSubmit() {
    this.submitted = true;

    // this.addOrganizationForm.value.map((el: any) => {
    //   el.admin_email = el.admin_email.internationalNumber,
    //   el.phone  = el.phone.internationalNumber
    // })
    console.log(this.addOrganizationForm.value);
    let fd  = new FormData;
    fd.append('name', this.addOrganizationForm.value.name);
    fd.append('nameSpace', this.string_to_slug(this.addOrganizationForm.value.namespace));
    fd.append('email', this.addOrganizationForm.value.mail);
    fd.append('number', this.addOrganizationForm.value.phone);
    fd.append('urlWebSite', this.addOrganizationForm.value.url);
    fd.append('logo', this.uploadedFile);
    fd.append('Pays', this.addOrganizationForm.value.country);
    fd.append('Kbis_Mf', this.addOrganizationForm.value.kbis_Mf);



    // let data = {
    //   name: this.addOrganizationForm.value.name,
    //   namespace: this.addOrganizationForm.value.namespace,
    //   mail: this.addOrganizationForm.value.mail,
    //   phone: this.addOrganizationForm.value.phone,
    //   url_tenant: this.addOrganizationForm.value.url_tenant,
    //   logo: '',
    //   admin_info: [{
    //     admin_name: this.addOrganizationForm.value.admin_name,
    //     admin_last_name: this.addOrganizationForm.value.admin_last_name,
    //     admin_email: this.addOrganizationForm.value.admin_email,
    //     admin_phone: this.addOrganizationForm.value.admin_phone
    //   }]

    // }
    if(!this.Edit) {
      this.organizationService.createOrganization(fd).toPromise().then(res => {
        console.log(res);
        if (res) {
          this.activeModal.close();
          this.successAdd.emit(true);

        }

      }).catch(error => {
        console.log(error);
        if (error.status == 406) {
          this.activeModal.close();
          this.nameSpaceExist.emit(true);
        }
      });

    } else {

      fd.append('IdCompany', this.organization.organizationId);
      this.organizationService.updateOrganization(fd).toPromise().then(res => {
        if (res) {
          this.activeModal.close();
          this.successUpdate.emit(true);
        }

      })
    }




  }
  string_to_slug (str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

  initValues() {
    this.addOrganizationForm = new FormGroup({
      name: new FormControl(
        this.organization ? this.organization.name : '',
        Validators.required
      ),
      namespace: new FormControl(
        this.organization ? this.organization.nameSpace : '',
        Validators.required
      ),
      mail: new FormControl(this.organization ? this.organization.email : '', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(
        this.organization ? this.organization.number : '',
        Validators.required
      ),
      url: new FormControl(this.organization ? this.organization.urlTenant : '', [
        Validators.required,
      ]),
      kbis_Mf: new FormControl(
        this.organization ? this.organization.kbis_Mf : ''
      ),
      country: new FormControl(
        this.organization ? this.organization.pays : ''
      ),

    });
    if (this.organization.logo) {
      this.imageSrc = this.organization.logo;
    }
  }
  onFileInput(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {

      this.uploadedFile = event.target.files[0]

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(this.uploadedFile);
  }
  }
}
