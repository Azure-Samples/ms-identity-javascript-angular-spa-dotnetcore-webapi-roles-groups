import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { TodoViewComponent } from './todo-view/todo-view.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverageComponent } from './overage/overage.component';
import { GroupGuardService } from './group-guard.service';

import * as auth from './auth-config.json';

const routes: Routes = [
  {
    path: 'todo-edit/:id',
    component: TodoEditComponent,
    canActivate: [
      MsalGuard,
      GroupGuardService
    ],
    data: { 
      expectedGroup: auth.groups.groupMember
    }
  },
  {
    path: 'todo-view',
    component: TodoViewComponent,
    canActivate: [
      MsalGuard,
      GroupGuardService
    ],
    data: { 
      expectedGroup: auth.groups.groupMember
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [
      MsalGuard,
      GroupGuardService,
    ],
    data: { 
      expectedGroup: auth.groups.groupAdmin
    } 
  },
  {
    path: 'overage',
    component: OverageComponent,
    canActivate: [
      MsalGuard,
    ]
  },
  {
    // Needed for hash routing
    path: 'state',
    component: HomeComponent
  },
  {
    // Needed for hash routing
    path: 'code',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
