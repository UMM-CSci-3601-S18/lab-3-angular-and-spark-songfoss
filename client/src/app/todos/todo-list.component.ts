import {Component, OnInit} from '@angular/core';
import {UserListService} from './todo-list.service';
import {User} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class UserListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoBody: string;
  public todoID: string;
  public todoCategory: string;


  // Inject the UserListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }

  public filterUsers(searchOwner: string, searchStatus: boolean, searchBody:string, searchID: string, searchCategory: string): User[] {

    this.filteredTodos = this.todos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by status
    if (searchStatus != null) {
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchStatus || todo.status == true  || todo.status == false;
      });
    }


    // Filter by body
    if (searchBody != null) {
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchStatus || todo.status == true  || todo.status == false;
      });
    }


    return this.filteredTodos;
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  refreshUsers(): Observable<User[]> {
    // Get Users returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const users: Observable<User[]> = this.userListService.getUsers();
    users.subscribe(
      returnedUsers => {
        this.users = returnedUsers;
        this.filterUsers(this.userName, this.userAge);
      },
      err => {
        console.log(err);
      });
    return users;
  }


  ngOnInit(): void {
    this.refreshUsers();
  }
}
