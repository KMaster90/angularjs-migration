import {Routes} from "@angular/router";
import {PersonCreateComponent, PersonEditComponent, PersonListComponent, SearchComponent} from "./components";
export const routes: Routes = [
  {path:'', redirectTo: '/list(header:search)', pathMatch: 'full'},
  {path:'list', component: PersonListComponent},
  {path:'search', component: SearchComponent, outlet: "header"},
  {path:'create', component: PersonCreateComponent},
  {path:'edit/:email', component: PersonEditComponent},
];
