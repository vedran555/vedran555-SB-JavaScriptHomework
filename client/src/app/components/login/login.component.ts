import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputToken = ''; // user's input
  message = ''; // error message
  options; // headers
  loading = false;

  constructor(
    //injecting services
    private taskService: TaskService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }


  check() {
    this.loading = true;
    let regexp = /^\s+$/;

    if(regexp.test(this.inputToken) || this.inputToken==='') { // check if input is an empty string or whitespace character(s)
      console.log('insert token');
      this.message = 'Token is required';
      this.inputToken = ''; // reset input
      this.loading = false;
    }
    else {
      this.message = ''; //reset error message
      //this.createAuthenticationHeader();
      let opt = new RequestOptions({
        headers: new Headers({
          //'Content-Type':'application/json',
          'X-SBG-Auth-Token':this.inputToken // put token into headers
        })
      });
      this.taskService.getMyInfo(opt)
        .subscribe(
          data => { // if request succeeds
            this.message = ''; // no error message
            this.taskService.storeToken(this.inputToken);
            this.router.navigate(['/tasks']);
            this.openSnackBar('Successfully logged in!');
          },
          (err) => { // if request fails
            if (err === 'Unauthorized') { // if request is unauthorized
              this.message = 'Unauthorized';
              this.inputToken = ''; //reset input
              this.loading = false;
            }
          });
    }
  }

  // snack bar messages
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2000});
  }

}
