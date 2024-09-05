import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IRouteEx } from "../app.routes";

@Injectable()
export class CallbacksService {
  // Callback dla finalizacji intruzji
  private _intrussionFinalCallback: Subject<void> = new Subject();

  // Callbacki dla różnych komponentów (dynamicznie dodawane)
  private _genericComponentCallback: Subject<IRouteEx> = new Subject();

  // Dodatkowe callbacki do dynamicznych operacji
  private _commandComponentCallback: Subject<void> = new Subject();
  private _commandOutputComponentCallback: Subject<void> = new Subject();

  // Publiczne metody do pobierania Observable'ów z Subject'ów

  // Callback finalizacji intruzji
  public get intrussionFinalCallback(): Observable<void> {
    return this._intrussionFinalCallback.asObservable();
  }

  // Callback dla dynamicznie dodanych komponentów
  public get genericComponentCallback(): Observable<IRouteEx> {
    return this._genericComponentCallback.asObservable();
  }

  // Callback dla komponentów Command
  public get commandComponentCallback(): Observable<void> {
    return this._commandComponentCallback.asObservable();
  }

  // Callback dla komponentów CommandOutput
  public get commandOutputComponentCallback(): Observable<void> {
    return this._commandOutputComponentCallback.asObservable();
  }

  // Publiczne metody do emitowania callbacków

  // Finalizacja intruzji
  public setIntrussionFinalCallback(): void {
    this._intrussionFinalCallback.next();
  }

  // Emitowanie callbacku dla dynamicznych komponentów
  public setGenericComponentCallback(value: IRouteEx): void {
    this._genericComponentCallback.next(value);
  }

  // Emitowanie callbacku dla komponentów Command
  public setCommandComponentCallback(): void {
    this._commandComponentCallback.next();
  }

  // Emitowanie callbacku dla komponentów CommandOutput
  public setCommandOutputComponentCallback(): void {
    this._commandOutputComponentCallback.next();
  }

  // Metoda do tworzenia nowego callbacku dla innych komponentów
  public createCallback<T>(): Subject<T> {
    return new Subject<T>();
  }
}
