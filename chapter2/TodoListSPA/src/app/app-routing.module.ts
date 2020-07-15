import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './components/home/home.component';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverageComponent } from './components/overage/overage.component';
import { GroupGuardService } from './services/group-guard.service';
import * as config from './app-config.json';

const routes: Routes = [
  {
    path: 'todo-edit/:id',
    component: TodoEditComponent,
    canActivate: [
      MsalGuard,
      GroupGuardService
    ],
    data: { 
      expectedGroup: config.groups.groupMember
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
      expectedGroup: config.groups.groupMember
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
      expectedGroup: config.groups.groupAdmin
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
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
