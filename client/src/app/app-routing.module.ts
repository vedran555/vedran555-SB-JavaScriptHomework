// sepate file with routes
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

const appRoutes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
    { path: 'tasks', component: TasksComponent, canActivate: [AuthGuardService] },
    { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuardService] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports:[
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

