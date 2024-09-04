import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Subject} from "rxjs";
@Component({
  selector: 'app-command-output-block',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-output.component.html',
  styleUrl: './command-output.component.scss'
})
export class CommandOutputComponent implements AfterViewInit{
  @Input()  public input!: string;

  @Input() public callback!: Subject<void>;
  public ngAfterViewInit(): void {
    this.callback.next();
  }

}
