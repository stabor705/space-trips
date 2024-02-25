import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {MainNavComponent} from "./main-nav/main-nav.component";
import {RoleAllowDirective} from "../../directives/role-allow.directive";
import {RouterLink} from "@angular/router";
import { WidgetComponent } from './widget/widget.component';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {CurrencyConverterPipe} from "../../../pipes/currency-converter.pipe";
import {NzEmptyComponent} from "ng-zorro-antd/empty";



@NgModule({
  declarations: [MainNavComponent, RoleAllowDirective, WidgetComponent],
  imports: [NzMenuModule, NzIconModule, NzBadgeModule, ReactiveFormsModule, FormsModule, NzSelectModule, CommonModule, RouterLink, NzButtonComponent, NzPopoverDirective, CurrencyConverterPipe, NzEmptyComponent],
  exports: [MainNavComponent, RoleAllowDirective]
})
export class MainNavModule { }
