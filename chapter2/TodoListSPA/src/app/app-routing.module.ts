import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { TodoViewComponent } from './todo-view/todo-view.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupGuardService } from './group-guard.service';

const routes: Routes = [
  {
    path: 'todo-edit/:id',
    component: TodoEditComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'todo-view',
    component: TodoViewComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [
      MsalGuard,
      GroupGuardService,
    ],
    data: { 
      expectedRole: '2df638c0-8c92-4d52-b7a4-5bee2d9aa69e' // oid of 'GroupAdmin'
    } 
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
