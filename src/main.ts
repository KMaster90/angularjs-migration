import "./polyfills.ts";

import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {UpgradeModule} from "@angular/upgrade/static";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {Contact, ContactService} from "./app/services";
import {HttpClientModule} from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DefaultImagePipe} from "./app/pipes/default-image.pipe";
import {LaddaModule} from "angular2-ladda";
import {
  PersonListComponent,
  CardComponent,
  SearchComponent,
  SpinnerComponent,
  PersonCreateComponent,
  PersonEditComponent
} from "./app/components";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AppRootComponent} from "./app/components/app-root.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app/app.routes";

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{useHash:true}),
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    InfiniteScrollModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [
    Contact,
    ContactService
  ],
  declarations: [
    SearchComponent,
    CardComponent,
    DefaultImagePipe,
    SpinnerComponent,
    PersonListComponent,
    PersonCreateComponent,
    PersonEditComponent,
    AppRootComponent
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}

// Bootstrap using the UpgradeModule
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
