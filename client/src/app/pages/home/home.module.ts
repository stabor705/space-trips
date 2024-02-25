import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./components/home/home.component";
import {RouterModule} from "@angular/router";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzImageModule} from "ng-zorro-antd/image";



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, NzCarouselModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]), NzCardModule, NzGridModule, NzImageModule
  ]
})
export class HomeModule { }
