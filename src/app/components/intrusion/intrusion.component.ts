import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicComponentService } from "../../services/dynamic-component.service";

@Component({
  selector: 'app-intrusion',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './intrusion.component.html',
  styleUrls: ['./intrusion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntrusionComponent implements AfterViewInit {

  @ViewChild('commandContainer', { read: ViewContainerRef }) private commandContainer!: ViewContainerRef;

  constructor(private dynamicComponentService: DynamicComponentService) {}

  public ngAfterViewInit(): void {
    this.createCommandBlock();
  }

  private createCommandBlock(index: number = 0): void {
    this.dynamicComponentService.createCommandBlockComponent(index, this.commandContainer);
  }
}
