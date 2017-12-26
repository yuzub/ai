import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login.component";

import { RequireUnauthGuard } from "./guards/require-unauth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [RequireUnauthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
