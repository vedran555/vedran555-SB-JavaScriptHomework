import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { TaskComponent } from 'src/app/components/task/task.component';
import { TaskService } from 'src/app/services/task.service';
import { LoginComponent } from './components/login/login.component';
import { HttpModule } from '@angular/http';
import { MaterialComponentsModule } from './material-components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { UserComponent } from './components/user/user.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { LoginGuardService } from 'src/app/services/login-guard.service';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    LoginComponent,
    UserComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MaterialComponentsModule,
    BrowserAnimationsModule
  ],
  providers: [
    TaskService,
    AuthGuardService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
