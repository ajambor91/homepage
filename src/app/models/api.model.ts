import {IRouteEx} from "./route.model";

export interface IApiRoute {
  path: string
}
export interface IApiRoutes extends Array<IApiRoute>{}
