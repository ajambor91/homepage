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

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  providers: [GreetingsService],
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    GreetingComponentComponent,
    InputComponent
  ]
})
export class MainPageComponent  implements OnInit, AfterViewInit{

  public get lastLoginDate(): string | null{
    return this.greetingsService.getLastLogin();
  }
  constructor(private greetingsService: GreetingsService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getLastLoginDate();

  }

  private getLastLoginDate(): void {
    this.greetingsService.setLoginDate();
  }

}
