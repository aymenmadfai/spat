import { Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OrganisationsService } from 'src/app/core/service/organisations.service';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddAccountComponent implements OnInit {
  @Input() title: string = 'Create Account';
  @Input() public organizationID: any;
  addAccountForm!: FormGroup;
  submitted = false;
  submittedfirstscreen = false;
  separateDialCode = false;
  @Input() successAdd: EventEmitter<boolean> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,private organizationService: OrganisationsService) { }

  ngOnInit(): void {
    this.initValues();
  }

  get f() {
    return this.addAccountForm.controls;
  }
  initValues() {
    this.addAccountForm = new FormGroup({

      adminName: new FormControl(
         ''
      ),
      adminLastName: new FormControl(
         ''
      ),
      adminEmail: new FormControl(
         '',
        [Validators.required]
      ),
      adminPhoneNumber: new FormControl(
         ''
      ),

    });
  }
  onSubmit() {
    let data = {
      nom: this.addAccountForm.controls.adminLastName.value,
      prenom: this.addAccountForm.controls.adminName.value,
      email: this.addAccountForm.controls.adminEmail.value,
      password: null,
      phoneNumber: this.addAccountForm.controls.adminPhoneNumber.value,
      functionId: null,
      idOrganisation: this.organizationID
    }
    this.organizationService.createAccount(data).toPromise().then(res => {
      if (res) {
        this.activeModal.close();
        this.successAdd.emit(true);
      }

    })



  }

}
