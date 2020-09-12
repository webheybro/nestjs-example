import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'ma toudouuu',
      description: 'Ma première todo with nest',
      done: false,
    },
    {
      id: 2,
      title: 'DU PAINSSS',
      description: 'Acheter du paing',
      done: true,
    },
    {
      id: 3,
      title: 'Du vin',
      description: 'Acheter du vin',
      done: true,
    },
    {
      id: 4,
      title: 'Du grain',
      description: 'Acheter du grain',
      done: true,
    },
    {
      id: 5,
      title: 'Du thym',
      description: 'Acheter du thym',
      done: true,
    },
  ];

  findOne(id: string) {
    return this.todos.find(todo => todo.id === Number(id));
  }

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
  }

  update(id: string, todo: Todo) {
    //retrieve the todo to update
    const todoToUpdate = this.todos.find(todo => todo.id === +id);
    if (!todoToUpdate) {
      return new NotFoundException('Todo non trouvée');
    }
    if (todo.hasOwnProperty('done')) {
      todoToUpdate.done = todo.done;
    }
    if (todo.title) {
      todoToUpdate.title = todo.title;
    }
    if (todo.description) {
      todoToUpdate.description = todo.description;
    }

    const updatedTodos = this.todos.map(t => (t.id !== +id ? t : todoToUpdate));
    this.todos = [...updatedTodos];
    return { updatedTodo: 1, todo: todoToUpdate };
  }

  deleteTodos(id: string) {
    const nbOfTodoBeforeDelete = this.todos.length;
    const newTodoList = this.todos.filter(t => t.id !== +id);
    this.todos = [...newTodoList];
    if (this.todos.length < nbOfTodoBeforeDelete) {
      return { deletedTodo: 1, todoList: newTodoList };
    } else {
      return new NotFoundException('Todo non supprimée');
    }
  }
}
