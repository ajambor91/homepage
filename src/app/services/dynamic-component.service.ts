import { ComponentRef, Injectable, Type, ViewContainerRef } from "@angular/core";
import { Observable, Subject, Subscription, take, switchMap } from "rxjs";
import { CommandBlockComponent } from "../components/command-block/command-block.component";
import { CommandOutputComponent } from "../components/command-output/command-output.component";
import { CommandComponent } from "../components/command/command.component";
import { LocalDataService } from "./local-data.service";
import { ELocalDataEnum } from "../enums/local-data.enum";
import { ICommandComponentsData } from "../models/local-data.model";

@Injectable()
export class DynamicComponentService {
  private subs: Subscription = new Subscription();

  constructor(private localDataService: LocalDataService) {}

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
        this.subs.add(sub);

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
          this.subs.add(sub);
        }
      }, 200);
    });
  }

  public destroy(): void {
    this.subs.unsubscribe();
  }
}
