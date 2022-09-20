import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  title: string = '';
  subTitle: string = '';
  subSubTitle: string = '';
  iconeName: string = '';
  constructor() {}
  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }
  getSubTitle() {
    return this.subTitle;
  }

  setSubTitle(subTitle: string) {
    this.subTitle = subTitle;
  }
  getSubSubTitle() {
    return this.subSubTitle;
  }

  setSubSubTitle(subSubTitle: string) {
    this.subSubTitle = subSubTitle;
  }
  setIcone(icon: string) {
    this.iconeName = icon;
  }
  getIconeName() {
    return this.iconeName;
  }
}
