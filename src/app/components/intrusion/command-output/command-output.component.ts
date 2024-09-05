import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CallbacksService } from '../../../services/callbacks.service';

@Component({
  selector: 'app-command-output-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-output.component.html',
  styleUrls: ['./command-output.component.scss']
})
export class CommandOutputComponent implements AfterViewInit {
  @Input() public input!: string;

  constructor(private callbacksService: CallbacksService) {}

  public ngAfterViewInit(): void {
    this.callbacksService.setIntrussionFinalCallback(); // Używamy serwisu
  }
}
