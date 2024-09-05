import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {map, Observable} from "rxjs";
import {IRouteEx, IRoutesEx} from "../models/route.model";
import {IApiRoute, IApiRoutes} from "../models/api.model";
import {GenericPostComponent} from "../components/main-page/generic-post/generic-post.component";

@Injectable()
export class RoutesService {

  constructor(private router: Router, private apiService: ApiService) {
  }

  public getRoutes(): Observable<any> {
    return this.apiService.getRoutes().pipe(map(this.mergeRoutes.bind(this)));
  }

  private mergeRoutes(apiRoutes: IApiRoutes): IRoutesEx {
    console.log('fdhkjlsfhgjdhsgfjhdgfjhdfgjh')
    const internalRoutes: IRoutesEx = this.router.config as IRoutesEx;
    const externalRoutes: IRoutesEx = apiRoutes.map((item: IApiRoute) => {
      const route: IRouteEx = {
        path: item.path,
        routeName: item.path,
        external: true,
        component: GenericPostComponent,

      }
      return route;
    })
    console.log(internalRoutes.concat(externalRoutes))
    return internalRoutes.concat(externalRoutes);
  }
}
