import {Route} from "@angular/router";

export interface IRouteEx extends Route{
  routeName?: string;
  external: boolean;
  category?: string;
  fullPath?:string;

}
export interface IRoutesEx extends Array<IRouteEx> {

}

export interface ITreeNodeRoutes {
  name: string;
  path: string
  children: ITreeNodeRoutes[]
}

