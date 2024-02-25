import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CartComponent} from "./component/cart.component";
import {RouterModule} from "@angular/router";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {CurrencyConverterPipe} from "../../pipes/currency-converter.pipe";
import {NzResultComponent} from "ng-zorro-antd/result";
import {NzTypographyComponent} from "ng-zorro-antd/typography";


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule, RouterModule.forChild([
      {path: '', component: CartComponent}
    ]), NzSkeletonModule, NzFormModule, NzCardModule, NzButtonModule, NgOptimizedImage, NzToolTipModule, FormsModule, NzCheckboxModule, CurrencyConverterPipe, NzResultComponent, NzTypographyComponent,
  ]
})
export class CartModule { }
