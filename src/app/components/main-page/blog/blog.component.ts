import {
ChangeDetectionStrategy,
  Component, Input,

} from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BlogComponent {

  @Input() public lastLoginDate!: string | null;


}
