import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef } from '@angular/core';
import Typed from 'typed.js';
import { CallbacksService } from '../../../services/callbacks.service';

@Component({
  selector: 'app-command-output-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements AfterViewInit {

  @Input() input!: string[];
  @ViewChild('commandElement') commandElement!: ElementRef;

  private typed!: Typed;

  constructor(private callbacksService: CallbacksService) {}

  public ngAfterViewInit(): void {
    this.typed = new Typed(this.commandElement.nativeElement, {
      strings: this.input,
      typeSpeed: 50,
      onComplete: () => this.callbacksService.setCommandComponentCallback()
    });
  }
}
