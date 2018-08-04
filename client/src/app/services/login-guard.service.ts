import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TaskService } from './task.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private taskService : TaskService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  // don't allow visiting login page while user is logged in
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
    })
    .then(result => {
      setTimeout(() => {
        this.router.navigate(['/tasks']);
      }, 500);
      this.openSnackBar('You cannot visit Login Page while you\'re logged in');
      return false; // if there is valid token, return false, so user can not access login page while he's already logged in
    })
    .catch(e => {
      return true;
    })
  }

  // snack bar messages
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 3000});
  }
}
