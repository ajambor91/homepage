import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IApiRoutes} from "../models/api.model";
import {EnvironmentsService} from "./environments.service";

@Injectable()
export class ApiService {
  private readonly _apiUrl: string = inject(EnvironmentsService).apiUrl;
  constructor(private httpClient: HttpClient) {

  }

  public getRoutes(): Observable<IApiRoutes> {
    return this.httpClient.get<IApiRoutes>(`${this._apiUrl}routes`);
  }

  public getPost(): Observable<any> {
    return this.httpClient.get(`${this._apiUrl}posts/xxx`)
  }

}
