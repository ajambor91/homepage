import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ELocalDataEnum} from "../enums/local-data.enum";
import {Observable} from "rxjs";
import {ICommandComponentsData} from "../models/local-data.model";

@Injectable()
export class LocalDataService {
  private readonly dataUrl = 'data/';

  constructor(private httpClient: HttpClient) {

  }
  public getData(dataType: ELocalDataEnum): Observable<ICommandComponentsData[]> {
    return this.httpClient.get<any>( `${this.dataUrl}${dataType}`);
  }}
