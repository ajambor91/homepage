import {
  AfterViewInit, ChangeDetectionStrategy,
  Component, ElementRef, Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import Typed from "typed.js";
import {DynamicComponentService} from "../../../services/dynamic-component.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NavComponent implements AfterViewInit{
  @ViewChild('commandElement') commandElement!: ElementRef;
  @ViewChild('navContainer', { read: ViewContainerRef }) private navContainer!: ViewContainerRef;

  @Input() public lastLoginDate!: string | null;
  private typed!: Typed;


  constructor(private dynamicComponentService: DynamicComponentService) {
  }
  public ngAfterViewInit(): void {
    const routesCreator: () => void =this.createRoutesComponent.bind(this)
    this.typed = new Typed(this.commandElement.nativeElement, {
      strings: ['> ls -R'],
      typeSpeed: 50,
      onComplete(self: Typed) {
        routesCreator();
      }
    });
  }

  private createRoutesComponent(): void {
    this.dynamicComponentService.createRoutes(this.navContainer)
  }

}
