import { ComponentRef, Injectable, Type, ViewContainerRef } from "@angular/core";
import { Observable, Subject, Subscription, take, switchMap } from "rxjs";
import { CommandBlockComponent } from "../components/intrusion/command-block/command-block.component";
import { CommandOutputComponent } from "../components/intrusion/command-output/command-output.component";
import { CommandComponent } from "../components/intrusion/command/command.component";
import { LocalDataService } from "./local-data.service";
import { ELocalDataEnum } from "../enums/local-data.enum";
import { ICommandComponentsData } from "../models/local-data.model";
import {IntrusionComponent} from "../components/intrusion/intrusion.component";
import {MainPageComponent} from "../components/main-page/main-page.component";
import {CallbacksService} from "./callbacks.service";

@Injectable()
export class DynamicComponentService {
  private intrussionSubs: Subscription = new Subscription();

  constructor(private localDataService: LocalDataService, private callbacksService: CallbacksService) {}

  public createCommandComponent(container: ViewContainerRef, component: Type<CommandComponent>, input: any): Observable<void> {
    const componentRef: ComponentRef<CommandComponent> = container?.createComponent(component);
    componentRef.instance.input = input;
    const subject: Subject<void> = new Subject();
    componentRef.instance.callback = subject;
    return subject.asObservable().pipe(take(1));
  }

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

        const callback: Subject<void> = new Subject<void>();
        const newIndex: number = index + 1;
        componentRef.instance.callback = callback;
        const sub: Subscription = callback.subscribe(() => this.createCommandBlockComponent(newIndex, container));
        this.intrussionSubs.add(sub);

        return new Observable<void>(observer => observer.complete());
      })
    ).subscribe();
  }

  public createCommandOutputComponent(
    index: number,
    container: ViewContainerRef,
    component: Type<CommandOutputComponent>,
    outputs: any[]
  ): Observable<void> {
    let i: number = 0;
    return new Observable<void>((observer) => {
      const outputCreationInterval: NodeJS.Timeout = setInterval(() => {
        if (i >= outputs.length) {
          clearInterval(outputCreationInterval);
          observer.next();
          observer.complete();
        } else {
          const componentRef: ComponentRef<CommandOutputComponent> = container?.createComponent(component);
          componentRef.instance.input = outputs[i];
          const subject: Subject<void> = new Subject<void>();
          componentRef.instance.callback = subject;
          i++;
          const sub: Subscription = subject.asObservable().pipe(take(1)).subscribe();
          this.intrussionSubs.add(sub);
        }
      }, 2);
    });
  }

  public createIntrusion(
    container: ViewContainerRef
  ): void {
    const componentRef: ComponentRef<IntrusionComponent> = container?.createComponent(IntrusionComponent);
  }

  public createMainPage(container: ViewContainerRef
): void {
    console.log(container)
  const componentRef: ComponentRef<MainPageComponent> = container?.createComponent(MainPageComponent);
}
  public destroyIntrussion(container: ViewContainerRef): void {
    this.intrussionSubs.unsubscribe();
    container.clear();
  }
}
