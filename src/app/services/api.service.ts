import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IApiRoutes} from "../models/api.model";

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {

  }

  public getRoutes(): Observable<IApiRoutes> {
    return this.httpClient.get<IApiRoutes>('http://localhost:3000/routes');
  }

  public getPost(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/posts/xxx')
  }

}
