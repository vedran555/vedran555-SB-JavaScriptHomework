import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { styles } from '../../stylesStatus'; // importing object with styles from separate file

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  id;
  task;
  taskFetched = false;
  statusStyles = styles; // object with different styles depending on task status(added to change text styles depending
                        // on task status)

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); //take task's id from url
    this.getSingleTask(); //fetch single task
    console.log('id: '+this.id);
    
  }

  // get single task
  getSingleTask() {
    this.taskService.getSingleTask(this.id)
      .subscribe(
        data => {
          this.task = data;
          this.taskFetched = true;
        }
      ),
      (err) => {
        if (err === 'Unauthorized') {
          console.log('check failed, user unauthorized.');
        }
      }
  }  

}
