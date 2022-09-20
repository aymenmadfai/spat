import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { IBreadCrumb } from 'src/app/core/models/breadCrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() icon!: string;
  @Input() parentLinkTitle!: string;

  public breadcrumbs!: IBreadCrumb[];
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    //If no routeConfig is avalailable we are on the root path
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : path;
    let iconUrl =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.iconUrl
        : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path?.split('/').pop();
    const isDynamicRoute = lastRoutePart?.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      // const paramName = lastRoutePart.split(':')[1];
      // path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      // label = route.snapshot.params[paramName];
      // console.log(paramName,label);
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
      iconUrl: iconUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs =
      breadcrumb.label || breadcrumb.iconUrl
        ? [...breadcrumbs, breadcrumb]
        : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
