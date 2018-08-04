import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks;
  tasksLoaded = false;
  limits = ['/', '5', '10'];
  statuses = ['ALL', 'QUEUED', 'DRAFT', 'RUNNING', 'COMPLETED', 'ABORTED', 'FAILED'];
  limit; // current limit
  status; // current status

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.limit = this.route.snapshot.queryParamMap.get('limit') || this.limits[0];
    this.status = this.route.snapshot.queryParamMap.get('status') || this.statuses[0];
    // query params added to remeber filters when switching from tasks page to single task page
    this.getTasks(); // load tasks
    console.log('status: '+this.status);
    console.log('limit: '+this.limit);
  }

  // check if user is authorized
  checkAuth() {
    this.taskService.checkAuth()
      .subscribe(
        data => {
          console.log('check ok, user is authorized.')
        },
        (err) => {
          if (err === 'Unauthorized') {
            console.log('check failed, user unauthorized.');
          }
        }
      );
  }

  // get tasks
  getTasks() {
    let filter = '';
    if(this.limit != '/') filter += '?limit='+this.limit; //append limit query params
    if(this.status != 'ALL') {
      if(filter == '') {
        filter += '?status=' +this.status; //append status query params(if there is no limit query params)
      }
      else {
        filter += '&status='+this.status; //append status query params(if there are limit query params)
      }
    }
    this.taskService.getTasks(filter)
      .subscribe(
        data => {
          this.tasks = data.items;
          this.tasksLoaded = true;
        },
        err => {
          console.log('Unauthorized');
        }
      )
  }

  // on changing status filter
  onStatusChange(status) {
    this.tasksLoaded = false;
    this.status = status; //set new status
    this.getTasks(); //get all tasks again
  }

  // on changing limit filter
  onLimitChange(limit) {
    this.tasksLoaded = false;
    this.limit = limit; // set new limit
    this.getTasks(); //get all tasks again
  }

}
