import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NzResultModule} from "ng-zorro-antd/result";
import {NzButtonModule} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'agh-not-found',
  standalone: true,
  imports: [
    NzResultModule,
    NzButtonModule,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
