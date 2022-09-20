import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INavPrameters } from '../models/navbar';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  parameters!: INavPrameters;
  parametersSubject = new BehaviorSubject<INavPrameters>(this.parameters);
  currentPrameters = this.parametersSubject.asObservable();
  constructor() {}

  public setNavBar(args: INavPrameters): void {
    this.parameters = args;
    this.parametersSubject.next(args);
  }
}
