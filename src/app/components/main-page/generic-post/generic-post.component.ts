import {RouterModule} from "@angular/router";
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {GreetingComponentComponent} from "../greeting-component/greeting-component.component";
import {InputComponent} from "../../generic/input/input.component";
import {Observable} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {AsyncPipe, NgIf} from "@angular/common";



@Component({
  selector: 'app-generic-post',
  standalone: true,
  templateUrl: './generic-post.component.html',
  styleUrls: ['./generic-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    GreetingComponentComponent,
    InputComponent,
    RouterModule,
    NgIf,
    AsyncPipe
  ]
})
export class GenericPostComponent {
  public post$: Observable<any> = this.apiService.getPost();

  constructor(private apiService: ApiService) {
  }

}
