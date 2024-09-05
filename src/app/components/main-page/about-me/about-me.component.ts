import {
 ChangeDetectionStrategy,
  Component, Input,
} from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AboutMeComponent {

  @Input() public lastLoginDate!: string | null;


}
