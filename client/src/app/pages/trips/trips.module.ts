import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TripComponent} from "./components/trip/trip.component";
import {TripListComponent} from "./components/trip-list/trip-list.component";
import {RouterModule} from "@angular/router";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzListModule} from "ng-zorro-antd/list";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {TripFilterFormComponent} from "./components/trip-filter-form/trip-filter-form.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {CurrencyConverterPipe} from "../../pipes/currency-converter.pipe";
import {TripDetailsComponent} from "./components/trip-details/trip-details.component";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {NzImageModule} from "ng-zorro-antd/image";
import {MainNavModule} from "../../core/modules/main-nav/main-nav.module";
import {GoogleMapsModule} from "@angular/google-maps";
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import {NzPaginationComponent} from "ng-zorro-antd/pagination";


@NgModule({
  declarations: [TripComponent, TripListComponent, TripFilterFormComponent, TripDetailsComponent, CommentSectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TripListComponent},
      {path: ':id', component: TripDetailsComponent}
    ]),
    NzFormModule,
    NzEmptyModule,
    NzCardModule,
    NzSkeletonModule,
    NzListModule,
    NzIconModule,
    NzAvatarModule,
    NgOptimizedImage,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzRateModule,
    FormsModule,
    NzInputNumberModule,
    NzAlertModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzStatisticModule,
    NzTypographyModule,
    NzAutocompleteModule,
    NzSelectModule,
    NzSliderModule,
    CurrencyConverterPipe,
    NzCarouselModule,
    NzImageModule,
    MainNavModule,
    GoogleMapsModule,
    NzPaginationComponent,

  ]
})
export class TripsModule {
}
