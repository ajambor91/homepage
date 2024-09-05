import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-command-output-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-output.component.html',
  styleUrls: ['./command-output.component.scss']
})
export class CommandOutputComponent {
  @Input() public input!: string;

}
