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

  constructor(
    private localDataService: LocalDataService,
    private callbacksService: CallbacksService
  ) {}

  /**
   * Tworzy komponent `CommandComponent` i emituje callback za pomocą CallbacksService
   */
  public createCommandComponent(container: ViewContainerRef, component: Type<CommandComponent>, input: any): Observable<void> {
    const componentRef: ComponentRef<CommandComponent> = container.createComponent(component);
    componentRef.instance.input = input;

    // Obsługujemy zakończenie komponentu przez CallbacksService
    return this.callbacksService.commandComponentCallback.pipe(take(1));
  }

  /**
   * Tworzy blok komend i zarządza dynamiczną sekwencją tworzenia komponentów
   */
  public createCommandBlockComponent(index: number, container: ViewContainerRef): void {
    this.localDataService.getData(ELocalDataEnum.COMMANDS).pipe(
      switchMap((commands: ICommandComponentsData[]) => {
        if (index >= commands.length) {
          this.callbacksService.setIntrussionFinalCallback();
          return new Observable<void>(observer => observer.complete());
        }

        const componentRef: ComponentRef<CommandBlockComponent> = container.createComponent(CommandBlockComponent);
        componentRef.instance.command = commands[index].inputs["command"] as string[];
        componentRef.instance.output = commands[index].inputs["output"] as string[];
        componentRef.instance.commandsLength = commands.length;

        const newIndex: number = index + 1;

        // Subskrybujemy się na zakończenie bieżącego komponentu i tworzymy nowy
        const sub: Subscription = this.callbacksService.commandComponentCallback.subscribe(() => this.createCommandBlockComponent(newIndex, container));
        this.intrussionSubs.add(sub);

        return new Observable<void>(observer => observer.complete());
      })
    ).subscribe();
  }

  /**
   * Tworzy komponent `CommandOutputComponent` i emituje callback przez CallbacksService
   */
  public createCommandOutputComponent(
    index: number,
    container: ViewContainerRef,
    component: Type<CommandOutputComponent>,
    outputs: any[]
  ): Observable<void> {
    let i = 0;
    return new Observable<void>((observer) => {
      const outputCreationInterval = setInterval(() => {
        if (i >= outputs.length) {
          clearInterval(outputCreationInterval);
          observer.next();
          observer.complete();
        } else {
          const componentRef: ComponentRef<CommandOutputComponent> = container.createComponent(component);
          componentRef.instance.input = outputs[i];

          i++;
          // Używamy serwisu do callbacków zamiast przypisywać bezpośrednio
          const sub: Subscription = this.callbacksService.commandOutputComponentCallback.pipe(take(1)).subscribe();
          this.intrussionSubs.add(sub);
        }
      }, 2);
    });
  }

  /**
   * Tworzy komponent `IntrusionComponent`
   */
  public createIntrusion(container: ViewContainerRef): void {
    container.createComponent(IntrusionComponent);
  }

  /**
   * Tworzy komponent `MainPageComponent`
   */
  public createMainPage(container: ViewContainerRef): void {
    container.createComponent(MainPageComponent);
  }

  /**
   * Niszczy wszystkie subskrypcje i czyści kontener
   */
  public destroyIntrussion(container: ViewContainerRef): void {
    this.intrussionSubs.unsubscribe();
    container.clear();
  }

  /**
   * Tworzy komponent nawigacji
   */
  public createNav(container: ViewContainerRef): void {
    container.createComponent(NavComponent);
  }

  /**
   * Tworzy komponent tras
   */
  public createRoutes(container: ViewContainerRef): void {
    container.createComponent(RoutesComponent);
  }

  /**
   * Tworzy dowolny komponent na podstawie zdefiniowanej ścieżki routingu
   */
  public addGenericComponent(container: ViewContainerRef, route: IRouteEx): void {
    const componentRef: ComponentRef<any> = container.createComponent(route.component as Type<any>);
    // this.callbacksService.setGenericComponentCallback(route);
  }
}
