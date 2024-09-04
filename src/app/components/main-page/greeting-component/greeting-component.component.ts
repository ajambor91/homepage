import {
  AfterViewInit, ChangeDetectionStrategy,
  Component, Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-greeting-component',
  standalone: true,
  templateUrl: './greeting-component.component.html',
  styleUrls: ['./greeting-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class GreetingComponentComponent {

  @Input() public lastLoginDate!: string | null;


}
