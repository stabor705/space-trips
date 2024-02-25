import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {UsersComponent} from './users/users.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BanToggleComponent} from './users/ban-toggle/ban-toggle.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {RoleSelectorComponent} from './users/role-selector/role-selector.component';
import {AddTripComponent} from './trips/add-trip/add-trip.component';
import {EditTripComponent} from './trips/edit-trip/edit-trip.component';
import {TripsComponent} from "./trips/trips-list/trips.component";
import {TripFormComponent} from "./trips/trip-form/trip-form.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzListModule} from "ng-zorro-antd/list";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzIconDirective} from "ng-zorro-antd/icon";
import { AddTripSuccessComponent } from './trips/add-trip/add-trip-success/add-trip-success.component';
import {NzResultComponent} from "ng-zorro-antd/result";
import {isManagerOrAdmin, isUserAdmin, isUserLoggedIn} from "../../services/auth/guard.guard";


@NgModule({
  declarations: [
    TripsComponent,
    UsersComponent,
    BanToggleComponent,
    RoleSelectorComponent,
    AddTripComponent,
    EditTripComponent,
    TripFormComponent,
    AddTripSuccessComponent,
  ],
  imports: [
    CommonModule,
    NzListModule,
    RouterModule.forChild([
      {path: 'trips', component: TripsComponent, canActivate: [isManagerOrAdmin]},
      {path: 'trips/add', component: AddTripComponent, canActivate: [isManagerOrAdmin]},
      {path: 'trips/success', component: AddTripSuccessComponent, canActivate: [isManagerOrAdmin]},
      {path: 'trips/edit/:id', component: EditTripComponent, canActivate: [isManagerOrAdmin]},
      {path: 'users', component: UsersComponent, canActivate: [isUserAdmin]}
    ]),
    NzTableModule,
    NzDividerModule,
    NzSwitchModule,
    FormsModule,
    NzSelectModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzButtonModule,
    NzPopconfirmDirective,
    NzIconDirective,
    NzResultComponent,
  ]
})
export class AdminModule {
}
