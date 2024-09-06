import {
 ChangeDetectionStrategy,
  Component, Input,

} from '@angular/core';

@Component({
  selector: 'app-greeting-component',
  standalone: true,
  templateUrl: './greeting-component.component.html',
  styleUrls: ['./greeting-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class GreetingComponentComponent {
  @Input() public currentTime!: string | null;
  @Input() public lastLoginDate!: string | null;


}
