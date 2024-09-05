import {Injectable} from "@angular/core";

@Injectable()
export class InputCommandsService {
  private readonly inputCommands: Map<string, string> = new Map([
    ['help', 'help'],
    ['shutdown', 'shutdown'],
    ['ls', 'ls']
  ])
}
