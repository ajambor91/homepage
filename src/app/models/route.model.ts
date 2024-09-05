import {Route} from "@angular/router";

export interface IRouteEx extends Route{
  routeName?: string;
  external: boolean;
  category?: string;

}
export interface IRoutesEx extends Array<IRouteEx> {

}
