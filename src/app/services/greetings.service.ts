import {Injectable} from "@angular/core";

@Injectable()
export class GreetingsService {


  public setLoginDate(): void {
    const now: Date = new Date();
    const isoString: string = now.toISOString();
    localStorage.setItem('lastLoginDate', isoString)
  }
  public getLastLogin(): string | null{
    return localStorage.getItem('lastLoginDate') ?? null;
  }
}
