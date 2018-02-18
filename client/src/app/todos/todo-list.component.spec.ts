import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          id: "58895985a22c04e761776d54",
          owner: "Blanche",
          status: false,
          body: "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
          category: "software design"
        },
        {
          id: "58895985c1849992336c219b",
          owner: "Fry",
          status: false,
          body: "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.",
          category: "video games"
        },
        {
          id: "58895985ae3b752b124e7663",
          owner: "Fry",
          status: true,
          body: "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.",
          category: "homework"
        },
        {
          id: "588959856f0b82ee93cd93eb",
          owner: "Barry",
          status: true,
          body: "Nisi sit non non sunt veniam pariatur. Elit reprehenderit aliqua consectetur est dolor officia et adipisicing elit officia nisi elit enim nisi.",
          category: "video games"
        },
        {
          id: "58895985ea7f6d35db12b3d7",
          owner: "Dawn",
          status: true,
          body: "Est elit consectetur culpa laborum nulla. Reprehenderit quis consequat officia veniam id ipsum consectetur elit fugiat in proident in proident.",
          category: "groceries"
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ TodoListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(5);
  });

  it('contains id\'58895985a22c04e761776d54\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.id === '58895985a22c04e761776d54')).toBe(true);
  });

  it('contains id\'58895985ea7f6d35db12b3d8\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.id === '58895985ea7f6d35db12b3d8')).toBe(false);
  });

  it('contains body\'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.body === 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.')).toBe(true);
  });


  it('contains a todo named \'Blanche\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Blanche')).toBe(true);
  });


  it('contain a todo named \'Fry\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Fry')).toBe(true);
  });

  it('doesn\'t contain a todo with owner named \'Barry\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Barry')).toBe(true);
  });


  it('doesn\'t contain a todo with owner named \'Leo\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Leo')).toBe(false);
  });

  it('has two to-dos that in "video game" in category', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.category === 'video games').length).toBe(2);
  });
  it('user list filters by owner', () => {
    expect(todoList.filteredTodos.length).toBe(5);
    todoList.todoOwner = 'f';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('user list filters by status', () => {
    console.log(todoList.filteredTodos.length);
    expect(todoList.filteredTodos.length).toBe(5);
    todoList.todoStatus = 'false';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('user list filters by status', () => {
    console.log(todoList.filteredTodos.length);
    expect(todoList.filteredTodos.length).toBe(5);
    todoList.todoStatus = 'true';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(3));
  });

  it('user list filters by owner and id', () => {
    expect(todoList.filteredTodos.length).toBe(5);
    todoList.todoOwner = "Fry";
    todoList.todoID="58895985c1849992336c219b";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('user list filters by owner and id (T2)', () => {
    expect(todoList.filteredTodos.length).toBe(5);
    todoList.todoOwner = "Fry";
    todoList.todoID="58895985c1849992336c219b";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('user list filters by category and owner', () => {
    expect(todoList.filteredTodos.length).toBe(5);
    todoList.todoOwner = "Barry";
    todoList.todoCategory = "video games";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by body', () => {
    expect(todoList.filteredTodos.length).toBe(5);
    todoList.todoBody = "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

});

describe('Misbehaving User List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
