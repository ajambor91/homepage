import {Route, Routes} from '@angular/router';
import {IntrusionComponent} from "./components/intrusion/intrusion.component";
import {AppComponent} from "./app.component";
import {AboutMeComponent} from "./components/main-page/about-me/about-me.component";
import {BlogComponent} from "./components/main-page/blog/blog.component";

export interface IRouteEx extends Route{
  routeName?: string

}
export interface IRoutesEx extends Array<IRouteEx> {

}
export const routes: IRoutesEx = [
  {path: 'about-me', component: AboutMeComponent, routeName: 'about-me'},
  {path: 'blog', component: BlogComponent, routeName: 'blog'}

];
