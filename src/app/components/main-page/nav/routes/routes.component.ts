import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewContainerRef} from "@angular/core";
import {RoutesService} from "../../../../services/routes.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import Typed from "typed.js";
import {IRouteEx} from "../../../../models/route.model";
import {Observable, Subscription} from "rxjs";
import {CallbacksService} from "../../../../services/callbacks.service";


@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  providers: [RoutesService],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    NgForOf,
    RouterLink,
    AsyncPipe
  ]
})
export class RoutesComponent {
  @ViewChild('commandElement') commandElement!: ElementRef;
  @ViewChild('navContainer', { read: ViewContainerRef }) private navContainer!: ViewContainerRef;

  @Input() public lastLoginDate!: string | null;
  private typed!: Typed;
  private _routes!: IRouteEx[];
  private _subs: Subscription = new Subscription();


  public  routes: Observable<any> = this.routeService.getRoutes();


  constructor(private routeService: RoutesService, private callbackService: CallbacksService) {
  }



  public selectAndPassComponent(route: IRouteEx): void {
    this.callbackService.setGenericComponentCallback(route);
  }

}
