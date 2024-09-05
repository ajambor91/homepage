import {
  AfterViewInit, ChangeDetectionStrategy,
  Component, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DynamicComponentService } from "../../services/dynamic-component.service";
import {GreetingsService} from "../../services/greetings.service";
import {GreetingComponentComponent} from "./greeting-component/greeting-component.component";
import {InputComponent} from "../generic/input/input.component";
import {Router, RouterModule} from "@angular/router";
import {CallbacksService} from "../../services/callbacks.service";
import {IRouteEx} from "../../app.routes";

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  providers: [GreetingsService],
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    GreetingComponentComponent,
    InputComponent,
    RouterModule
  ]
})
export class MainPageComponent  implements OnInit, AfterViewInit{
  @ViewChild('navContainer', { read: ViewContainerRef }) private navContainer!: ViewContainerRef;
  public get lastLoginDate(): string | null{
    return this.greetingsService.getLastLogin();
  }
  constructor(private greetingsService: GreetingsService, private dynamicComponentService: DynamicComponentService, private callbackService: CallbacksService, private router: Router) {

  }

  ngOnInit(): void {
    this.addGenericComponent();
  }

  ngAfterViewInit() {
    this.getLastLoginDate();
    setTimeout(() => {
      this.dynamicComponentService.createNav(this.navContainer)
    }, 200)

  }

  private getLastLoginDate(): void {
    this.greetingsService.setLoginDate();
  }

  private addGenericComponent(): void {
 this.callbackService.genericComponentCallback.subscribe((res: IRouteEx) => {
      this.dynamicComponentService.addGenericComponent(this.navContainer, res);
      this.router.navigate([res.path], { replaceUrl: true });
      this.dynamicComponentService.createNav(this.navContainer)
    });
  }

}
