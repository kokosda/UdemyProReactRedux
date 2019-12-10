import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      visible: true,
      id: this.maxId++
    };
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      const newArray = [...before, ...after];
      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ];
      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearchInputChanged = (text) => {
    this.setState(({ todoData }) => {
      const regexp = new RegExp(text, 'i');
      const filteredArr = [];
      let element;
      let newElement;

      for (let i = 0; i < todoData.length; i++) {
        element = todoData[i];
        newElement = {...element, visible: regexp.test(element.label)};
        filteredArr.push(newElement);
      }

      return {
        todoData: filteredArr
      }
    });
  };

  onFilterButtonClick = (status) => {
    this.setState(({todoData}) => {
      let newArray;
      switch(status) {
        case 'all':
          newArray = todoData.map((el) => { el.visible = true; return el; });
          break;
        case 'active':
          newArray = todoData.map((el) => { el.visible = !el.done; return el; });
          break;
        case 'done':
          newArray = todoData.map((el) => { el.visible = el.done; return el; });
          break;
        default:
          console.error(`Status ${status} can't be handled.`);
      }
      return {
        todoData: newArray
      };
    });
  };

  render() {

    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <form className="top-panel d-flex">
          <SearchPanel onSearchInputChanged={this.onSearchInputChanged} />
          <ItemStatusFilter onFilterButtonClick={this.onFilterButtonClick} />
        </form>
  
        <TodoList 
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />

        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};