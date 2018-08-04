import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TaskService } from './task.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private taskService : TaskService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }


  // protecting routes that need authorization from unauthorized requests
  canActivate() {
    return new Promise((resolve, reject) => {
      this.taskService.checkAuth()
      .subscribe(
        data => {
          resolve();
        },
        (err) => {
          if (err === 'Unauthorized') {
            reject();
          }
        }
      )
    }  
    )
    .then(result => { // if user is authorized
      return true;
    })
    .catch(e => { // if user is unauthorized
      setTimeout(() => {
        this.router.navigate(['/login']); // navigate to login page
      }, 500);
      this.openSnackBar('You\'re unauthorized to see this page...Redirecting to Login Page')
      return false;
    })
  }

  // snack bar messages
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2000});
  }
}
