import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LocalDataService} from "./services/local-data.service";
import {HttpClientModule} from "@angular/common/http";
import {DynamicComponentService} from "./services/dynamic-component.service";
import {CallbacksService} from "./services/callbacks.service";
import {take} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  providers: [LocalDataService, DynamicComponentService, CallbacksService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'portfolio';

  @ViewChild('mainContainer', { read: ViewContainerRef }) private mainContainer!: ViewContainerRef;

  constructor(private dynamicComponentsService: DynamicComponentService, private callbackService: CallbacksService) {
  }
  ngAfterViewInit(): void {
    this.dynamicComponentsService.createIntrusion(this.mainContainer)
    this.callbackService.intrussionFinalCallback.pipe(take(1)).subscribe(() => {
      this.dynamicComponentsService.destroyIntrussion(this.mainContainer);
      this.dynamicComponentsService.createMainPage(this.mainContainer)
    })
  }

}
