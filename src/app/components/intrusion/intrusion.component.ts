import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandOutputComponent } from "../command-output/command-output.component";
import { DynamicComponentService } from "../../services/dynamic-component.service";

@Component({
  selector: 'app-intrusion',
  standalone: true,
  imports: [RouterOutlet, CommandOutputComponent],
  providers: [DynamicComponentService],
  templateUrl: './intrusion.component.html',
  styleUrls: ['./intrusion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class IntrusionComponent implements AfterViewInit {

  @ViewChild('commandContainer', { read: ViewContainerRef }) private commandContainer!: ViewContainerRef;

  constructor(private dynamicComponentService: DynamicComponentService) { }


  public ngAfterViewInit(): void {
    this.createComponent();
  }

  private createComponent(index: number = 0): void {
    this.dynamicComponentService.createCommandBlockComponent(0, this.commandContainer);
  }
}
