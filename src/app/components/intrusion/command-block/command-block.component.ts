import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicComponentService } from "../../../services/dynamic-component.service";
import { CommandOutputComponent } from "../command-output/command-output.component";
import { CommandComponent } from "../command/command.component";
import { Subject, switchMap } from "rxjs";

@Component({
  selector: 'app-command-output-block-block',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-block.component.html',
  styleUrls: ['./command-block.component.scss']
})
export class CommandBlockComponent implements AfterViewInit {

  @Input() public callback!: Subject<void>;
  @ViewChild('commandContainer', { read: ViewContainerRef }) private commandContainer!: ViewContainerRef;
  @ViewChild('outputContainer', { read: ViewContainerRef }) private outputContainer!: ViewContainerRef;

  @Input() public command!: string[];
  @Input() public output!: string[];
  @Input() public commandsLength!: number;
  constructor(private dynamicComponentService: DynamicComponentService) {}

  public ngAfterViewInit(): void {
    this.startComponentCycle(0);
  }

  private startComponentCycle(index: number): void {
    if (index >=this.commandsLength) {
      return;
    }

    this.dynamicComponentService.createCommandComponent(this.commandContainer, CommandComponent, this.command).pipe(
      switchMap(() => this.dynamicComponentService.createCommandOutputComponent(index, this.outputContainer, CommandOutputComponent, this.output))
    ).subscribe(() => {
      this.callback.next();
    });
  }
}
