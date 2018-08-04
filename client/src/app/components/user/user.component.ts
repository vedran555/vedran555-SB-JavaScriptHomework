import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username;

  constructor(
    private taskService: TaskService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadUser(); // load username onInit
  }

  // load user
  loadUser() {
    this.taskService.createAuthenticationHeader();
    this.taskService.getMyInfo(this.taskService.options)
      .subscribe(
        data => {
          this.username = data.username;
        },
        err => {
          if (err === 'Unauthorized') {
            console.log('user unauthorized.');
            this.username = 'unknown';
          }
        }
      );
  }

  // clear storage on logout
  clearStorage() {
    this.taskService.logout();
    this.router.navigate(['/login']); // navigate to the login page
    this.openSnackBar('You\'re logged out!');
  }

  // snack bar messages
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2000});
  }

}
