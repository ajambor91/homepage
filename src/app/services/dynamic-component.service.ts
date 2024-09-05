import { ComponentRef, Injectable, Type, ViewContainerRef } from "@angular/core";
import { Observable, Subscription, switchMap, take } from "rxjs";
import { CommandBlockComponent } from "../components/intrusion/command-block/command-block.component";
import { CommandOutputComponent } from "../components/intrusion/command-output/command-output.component";
import { CommandComponent } from "../components/intrusion/command/command.component";
import { LocalDataService } from "./local-data.service";
import { ELocalDataEnum } from "../enums/local-data.enum";
import { ICommandComponentsData } from "../models/local-data.model";
import { IntrusionComponent } from "../components/intrusion/intrusion.component";
import { MainPageComponent } from "../components/main-page/main-page.component";
import { CallbacksService } from "./callbacks.service";
import { NavComponent } from "../components/main-page/nav/nav.component";
import { RoutesComponent } from "../components/main-page/nav/routes/routes.component";
import { IRouteEx } from "../app.routes";

@Injectable()
export class DynamicComponentService {
  private intrussionSubs: Subscription = new Subscription();
  private _isLastCommand: boolean = false;
  constructor(
    private localDataService: LocalDataService,
    private callbacksService: CallbacksService
  ) {}


  public createCommandComponent(container: ViewContainerRef, component: Type<CommandComponent>, input: any): Observable<void> {
    const componentRef: ComponentRef<CommandComponent> = container.createComponent(component);
    componentRef.instance.input = input;

    return this.callbacksService.commandComponentCallback.pipe(take(1));
  }


  public createCommandBlockComponent(index: number, container: ViewContainerRef): void {
    this.localDataService.getData(ELocalDataEnum.COMMANDS).pipe(
      switchMap((commands: ICommandComponentsData[]) => {
        if (index >= commands.length) {
          this._isLastCommand = true;
          return new Observable<void>(observer => observer.complete());
        }

        const componentRef: ComponentRef<CommandBlockComponent> = container.createComponent(CommandBlockComponent);
        componentRef.instance.command = commands[index].inputs["command"] as string[];
        componentRef.instance.output = commands[index].inputs["output"] as string[];
        componentRef.instance.commandsLength = commands.length;

        const newIndex: number = index + 1;

        const sub: Subscription = this.callbacksService.commandComponentCallback.subscribe(() => this.createCommandBlockComponent(newIndex, container));
        this.intrussionSubs.add(sub);

        return new Observable<void>(observer => observer.complete());
      })
    ).subscribe();
  }

  public createCommandOutputComponent(
    container: ViewContainerRef,
    component: Type<CommandOutputComponent>,
    outputs: any[]
  ): Observable<void> {
    let i = 0;
    return new Observable<void>((observer) => {
      const outputCreationInterval = setInterval(() => {
        if (i >= outputs.length) {
          if (this._isLastCommand === true) {
            this.callbacksService.setIntrussionFinalCallback();
          }
          clearInterval(outputCreationInterval);
          observer.next();
          observer.complete();
        } else {
          const componentRef: ComponentRef<CommandOutputComponent> = container.createComponent(component);
          componentRef.instance.input = outputs[i];

          i++;
          const sub: Subscription = this.callbacksService.commandOutputComponentCallback.pipe(take(1)).subscribe();
          this.intrussionSubs.add(sub);
        }
      }, 100);
    });
  }


  public createIntrusion(container: ViewContainerRef): void {
    container.createComponent(IntrusionComponent);
  }


  public createMainPage(container: ViewContainerRef): void {
    container.createComponent(MainPageComponent);
  }


  public destroyIntrussion(container: ViewContainerRef): void {
    this.intrussionSubs.unsubscribe();
    container.clear();
  }

  public createNav(container: ViewContainerRef): void {
    container.createComponent(NavComponent);
  }


  public createRoutes(container: ViewContainerRef): void {
    container.createComponent(RoutesComponent);
  }


  public addGenericComponent(container: ViewContainerRef, route: IRouteEx): void {
    const componentRef: ComponentRef<any> = container.createComponent(route.component as Type<any>);
    // this.callbacksService.setGenericComponentCallback(route);
  }
}
