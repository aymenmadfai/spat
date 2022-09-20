import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  @Output() userName: EventEmitter<any> = new EventEmitter();
  public AppParameters;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  isfirstLogin: boolean = false;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.AppParameters = this.configService.config;
    console.log(this.AppParameters);

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    console.log(this.AppParameters.apiUrl + 'api/User/LoginUser');

    let parameters = new HttpParams();
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http
      .post<any>(
        this.AppParameters.apiUrl + 'api/User/LoginUser',
        {
          email,
          password,
          organizationId: null
        },
        {
          params: parameters,
        }
      )
      .pipe(
        map((user) => {
          if (user?.firstLogin) {
            this.isfirstLogin = true;
          }
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);

          localStorage.setItem('currentUser', JSON.stringify(user.userModel));
          this.currentUserSubject.next(user.userModel);
          this.userName.emit(user.userModel.user.nom);
          return user.userModel;
        })
      );
  }

  Forgotpassword(email: string) {
    return this.http.post<any>(
      this.AppParameters.apiAuth + 'api/User/ForgetPassword',
      {
        email,
      }
    );
  }
  Resetpassord(
    emailUser: string,
    genCode: string,
    newPassword: string,
    defaultPassword: boolean
  ) {
    return this.http.post<any>(
      this.AppParameters.apiAuth + 'api/User/ResetPassword',
      {
        emailUser: emailUser,
        genCode: genCode,
        newPassword: newPassword,
        defaultPassword: defaultPassword,
      }
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser')!);

    return user !== null ? true : false;
  }
}
