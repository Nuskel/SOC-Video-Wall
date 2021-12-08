import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SettingsComponent} from "./settings/settings.component";
import {OverviewComponent} from "./overview/overview.component";

const routes: Routes = [
  { path: "", component: OverviewComponent },
  { path: "settings", component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
