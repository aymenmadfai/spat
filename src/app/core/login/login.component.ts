import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
import { MustMatch } from './helpers/must-match.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  isResetMdpI: boolean = false;
  buttonText: string = 'Log In';
  isNewpassword: boolean = false;
  codeIsgenrated: boolean = false;
  codeGenrated!: string;
  fieldTextType: boolean = false;
  isAuthenticated: boolean = true;
  isCodeRejeccted: boolean = false;
  isFirstLogin: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        code: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  SetMdp() {
    this.isResetMdpI = true;
    this.buttonText = 'Send';
  }

  get f() {
    return this.registerForm.controls;
  }
  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.f.email.errors?.required || this.f.password.errors?.required) {
      return;
    }
    this.router.navigate(['organisations']);
    // // Consume API on success
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .toPromise()
      .then(
        (res) => {
          this.isFirstLogin = this.authenticationService.isfirstLogin;
          this.submitted = false;
          this.codeGenrated = this.registerForm.value.password;
          this.registerForm.get('password')?.setValue('');
          if (!this.isFirstLogin) {
            this.router.navigate(['organisations']);
          }
        },
        (err) => {
          this.isAuthenticated = false;
        }
      );

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  forgotPassword() {
    if (this.codeGenrated == null) {
      this.submitted = true;
      this.authenticationService
        .Forgotpassword(this.f.email.value)
        .toPromise()
        .then((res) => {
          this.codeIsgenrated = true;
          this.codeGenrated = res;
          this.submitted = false;
          this.isFirstLogin = false;
        });
    }
  }

  ToResetMDP() {
    if (this.registerForm.value.code == this.codeGenrated) {
      this.isNewpassword = true;
      this.codeIsgenrated = false;
    } else {
      this.isCodeRejeccted = true;
    }
  }

  ResetPassword() {
    let defaultPassword: boolean = false;
    this.submitted = true;
    if (
      this.registerForm.value.code == this.codeGenrated ||
      this.isFirstLogin == true
    ) {
      if (this.isFirstLogin) {
        defaultPassword = true;
      }
      if (
        this.f.password.errors?.required ||
        this.f.confirmPassword.errors?.required ||
        this.f.confirmPassword.errors?.mustMatch
      ) {
        return;
      }

      this.authenticationService
        .Resetpassord(
          this.registerForm.value.email,
          this.codeGenrated?.toString(),
          this.registerForm.value.password,
          defaultPassword
        )
        .toPromise()
        .then(() => {
          this.codeIsgenrated = false;
          this.isResetMdpI = false;
          this.isNewpassword = false;
          this.isFirstLogin = false;
          this.onReset();
        });
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
