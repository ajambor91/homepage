import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import Typed from "typed.js";
import {Route, Router, RouterLink} from "@angular/router";
import {DynamicComponentService} from "../../../../services/dynamic-component.service";
import {IRouteEx} from "../../../../app.routes";
import {NgForOf} from "@angular/common";
import {Subscription} from "rxjs";
import {CallbacksService} from "../../../../services/callbacks.service";


@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,

  imports: [
    NgForOf,
    RouterLink
  ]
})
export class RoutesComponent implements OnInit{
  @ViewChild('commandElement') commandElement!: ElementRef;
  @ViewChild('navContainer', { read: ViewContainerRef }) private navContainer!: ViewContainerRef;

  @Input() public lastLoginDate!: string | null;
  private typed!: Typed;
  private _routes!: IRouteEx[];
  private _subs: Subscription = new Subscription();
  public set routes(value: IRouteEx[]){
    this._routes = value;
  }

  public get routes(): IRouteEx[] {
    return this._routes;
  }
  constructor(private router: Router, private dynamicComponentService: DynamicComponentService, private callbackService: CallbacksService) {
  }

  public ngOnInit() {
    console.log(this.router.config)
    this.routes = this.router.config
  }

  public selectAndPassComponent(route: IRouteEx): void {
    console.log('xxxx')
    this.callbackService.setGenericComponentCallback(route);
  }

}
