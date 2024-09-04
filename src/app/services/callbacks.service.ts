import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class CallbacksService {
  private _intrussionFinalCallback: Subject<void> = new Subject();

  public get intrussionFinalCallback(): Observable<void> {
    return this._intrussionFinalCallback.asObservable();
  }

  public setIntrussionFinalCallback(): void {
    this._intrussionFinalCallback.next()
  }
}
