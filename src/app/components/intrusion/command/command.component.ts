import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import Typed from 'typed.js';
import { Subject } from "rxjs";

@Component({
  selector: 'app-command-output-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements AfterViewInit {

  @Input() callback = new Subject<void>();
  @ViewChild('commandElement') commandElement!: ElementRef;
  @Input() input!: string[];

  private typed!: Typed;

  public ngAfterViewInit(): void {
    this.typed = new Typed(this.commandElement.nativeElement, {
      strings: this.input,
      typeSpeed: 50,
      onComplete: () => this.callback.next()
    });
  }
}
