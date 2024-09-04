import {
  AfterViewInit, ChangeDetectionStrategy,
  Component, Input,
  ViewChild,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None


})
export class InputComponent {

  @Input() public lastLoginDate!: string | null;


}
