import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NzResultComponent} from "ng-zorro-antd/result";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'agh-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
  standalone: true,
  imports: [
    NzResultComponent,
    NzButtonComponent,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForbiddenComponent {

}
