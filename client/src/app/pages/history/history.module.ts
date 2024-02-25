import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import {RouterModule} from "@angular/router";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {CurrencyConverterPipe} from "../../pipes/currency-converter.pipe";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTimelineComponent, NzTimelineItemComponent} from "ng-zorro-antd/timeline";
import {NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {FormsModule} from "@angular/forms";
import {isUserAdmin, isUserLoggedIn} from "../../services/auth/guard.guard";

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild([
        {path: '', component: HistoryComponent, canActivate: [isUserLoggedIn]}
      ]
    ), NzCardModule, NzFormModule, NzTypographyModule, CurrencyConverterPipe, NzButtonModule, NzTimelineComponent, NzTimelineItemComponent, NzRadioGroupComponent, NzCollapsePanelComponent, NzCollapseComponent, FormsModule],
})
export class HistoryModule { }
