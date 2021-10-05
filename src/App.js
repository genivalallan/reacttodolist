import React, { Component } from 'react';
import { NewList } from './NewList';
import { ItemsTable } from './ItemsTable';
// import logo from './logo.svg';
// import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {          // App's data structure
      userName: '',         // Shows user name on the page
      listName: '',         // Name of the items list to show on the page
      items: [              // To do list of items
        // { desc: 'To do item description', done: false } // Items structure
      ],
      doneItems: 0,         // Count completed items
      newItem: '',          // Used to keep the new item input content
      showCompleted: false, // Show completed items?
      createNewList: true   // Used to call NewList interface
    };
  }
  
  CreateNewList = (newUserName, newListName) => 
    this.setState({
      userName: newUserName,
      listName: newListName,
      items: [],
      doneItems: 0,
      newItem: '',
      showCompleted: this.state.showCompleted,
      createNewList: false
    });

  // TODO: Create a warning dialog to popup when the item already exists
  createNewItem = () => {
    if (isValidStr(this.state.newItem) &&
        !this.state.items.find(item => item.desc === this.state.newItem.trim())) {
      this.setState({
        items: [...this.state.items,
          { desc: this.state.newItem.trim(), done: false }],
        newItem: ''
      });
    }
  }
  
  toggleItem = (item) =>
    this.setState({
      items: this.state.items.map(t =>
        t.desc === item.desc ? { ...t, done: !t.done } : t),
      doneItems: (item.done ? this.state.doneItems - 1 : this.state.doneItems + 1)
    });

  render = () => {
    if (this.state.createNewList) {
      return (<NewList userName={ this.state.userName } callBack={ this.CreateNewList } />);
    }
    else {
      return (
        <div className="container-fluid" key="itemsTables">
          {/* Title Bar */}
          <div className="row bg-primary text-white m-3">
            <div className="col-md mt-2">
              <h4>Olá, { this.state.userName }.</h4>  {/* User Greetings */}
            </div>
            <div className="col-md text-center mt-2">
              <h4>{ this.state.listName }</h4>        {/* List Name */}
            </div>
            <div className="col-md mt-2">
              <h4 style={{textAlign: "right"}}>
                { this.state.items.length } ite{ this.state.items.length === 1 ? 'm' : 'ns' }.  {/* Total Items Count */}
              </h4>
            </div>
          </div>
          {/* Options */}
          <div className="row m-3">
            <div className="form-check col-md-3">
              <input type="checkbox" id="showCompletedCheckbox"
                className="form-check-input"
                checked={ this.state.showCompleted }
                onChange={e => this.setState({ showCompleted: !this.state.showCompleted })}
              />
              <label className="form-check-label" htmlFor="showCompletedCheckbox">
                Mostrar itens marcados
              </label>
            </div>
            <div className="col-md">
              <button className="btn btn-primary" onClick={() => this.setState({ createNewList: true }) }>Criar Nova Lista</button>
            </div>
          </div>
          {/* Create new item */}
            <div className="my-1 row m-3">
              <label className="col-md-auto" htmlFor="newItem">Novo Item:</label>
              <input className="form-control col-md" id="newItem"
                placeholder="Insira um novo item"
                value={ this.state.newItem }
                onChange={e => this.setState({ newItem: e.target.value })}
              />
              <button className="btn btn-primary col-md-auto"
                onClick={ this.createNewItem }>
                  Adicionar
              </button>
            </div>
          {/* Items Tables */}
          <div className="container-fluid mt-3">
            {/* Uncompleted Items */}
            <ItemsTable
              caption={ String(this.state.items.length - this.state.doneItems).
                concat((this.state.items.length - this.state.doneItems) === 1 ? ' item pendente' : ' itens pendentes') }
              items={ this.state.items.filter(t => t.done === false) }
              toggleTodo={ this.toggleItem }
            />
            {/* Completed Items */}
            { this.state.showCompleted &&
              <ItemsTable
                caption={ '' + this.state.doneItems +
                  (this.state.doneItems === 1 ? ' item finalizado' : ' itens finalizados') }
                items={ this.state.items.filter(t => t.done === true) }
                toggleTodo={ this.toggleItem }
               />
            }
          </div>
        </div>
      );
    }
  }
}

// MISC
function isValidStr(str) {
  if(!str || 0 === str.length || str.match(/^ *$/))
    return false;
  
  return true;
}