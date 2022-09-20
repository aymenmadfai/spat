import { Component, Input, OnInit } from '@angular/core';
import { AuthentificationService } from '../../service/authentification.service';
import { INavPrameters } from '../../models/navbar';
import { BreadcrumbsService } from '../../service/breadcrumb.service';
import { NavbarService } from '../../service/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() nameButton!: string;
  params!: INavPrameters;
  name!: any;
  constructor(
    public breadcrumbsService: BreadcrumbsService,
    public navbar: NavbarService,
    private auth: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.navbar.currentPrameters.subscribe((res: INavPrameters) => {
      this.params = res;
    });

    const user = JSON.parse(localStorage.getItem('currentUser')!);

    this.name = user.user.nom;
  }
}
