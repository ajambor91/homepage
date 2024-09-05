import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {RoutesService} from "../../../../services/routes.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {IRouteEx} from "../../../../models/route.model";
import {Observable} from "rxjs";
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


  @Input() public lastLoginDate!: string | null;



  public  routes: Observable<any> = this.routeService.getRoutes();


  constructor(private routeService: RoutesService, private callbackService: CallbacksService) {
  }



  public selectAndPassComponent(route: IRouteEx): void {
    this.callbackService.setGenericComponentCallback(route);
  }

}
