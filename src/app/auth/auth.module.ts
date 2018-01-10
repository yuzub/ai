import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

import { LoginComponent } from "./login.component";

import { RequireUnauthGuard } from "./guards/require-unauth.guard";
import { RequireAuthGuard } from "./guards/require-auth.guard";
import { AdminGuard } from "./guards/admin.guard";

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    RequireUnauthGuard,
    RequireAuthGuard,
    AdminGuard
  ]
})
export class AuthModule {

}
