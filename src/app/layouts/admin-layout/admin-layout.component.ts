import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { SidebarComponent } from '../../core/sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layouts',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutsComponent implements OnInit {
  model!: NgbDateStruct;
  constructor(public navbar: NavbarService) {
    this.navbar.setNavBar({
      button: 'user',
      breadrumbTitle: 'home',
      breadcrumbIcon: 'friends',
    });
  }
  private unsubscribe = new Subject();
  ngOnInit(): void {
    console.log('hiii');

  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
