import React, { useState } from 'react';
import { NewList } from './NewList';
import { ItemsTable } from './ItemsTable';

export default function App() {
  const [userName, setUserName] = useState('');
  const [items, setItems] = useState([]);
  const [doneItems, setDoneItems] = useState(0);
  const [newItem, setNewItem] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [createNewList, setCreateNewList] = useState(true);
  let listName = '';
  
  const CreateNewList = function (newUserName, newListName) {
      setUserName(newUserName);
      // setListName(newListName);
      listName = newListName;
      setItems([]);
      setDoneItems(0);
      setNewItem('');
      setShowCompleted(showCompleted);
      setCreateNewList(false);
  }

  // TODO: Create a warning dialog to popup when the item already exists
  const CreateNewItem = function () {
    if (isValidStr(newItem) &&
        !items.find(item => item.desc === newItem.trim())) {
      setItems([...items, { desc: newItem.trim(), done: false}]);
      setNewItem('');
    }
  }
  
  const ToggleItem = function (item) {
    setItems(items.map(t => t.desc === item.desc ? { ...t, done: !t.done } : t));
    setDoneItems(item.done ? doneItems - 1 : doneItems + 1)
  }

  if (createNewList) {
    return (<NewList userName={ userName } callBack={ CreateNewList } />);
  } else {
    return (
      <div className="container-fluid" key="itemsTables">
        {/* Title Bar */}
        <div className="row bg-primary text-white m-3">
          <div className="col-md mt-2">
            <h4>Olá, { userName }.</h4>  {/* User Greetings */}
          </div>
          <div className="col-md text-center mt-2">
            <h4>{ listName }</h4>        {/* List Name */}
          </div>
          <div className="col-md mt-2">
            <h4 style={{textAlign: "right"}}>
              { items.length } ite{ items.length === 1 ? 'm' : 'ns' }.  {/* Total Items Count */}
            </h4>
          </div>
        </div>
        {/* Options */}
        <div className="row m-3">
          <div className="form-check col-md-3">
            <input type="checkbox" id="showCompletedCheckbox"
              className="form-check-input"
              checked={ showCompleted }
              onChange={e => setShowCompleted(!showCompleted)}
            />
            <label className="form-check-label" htmlFor="showCompletedCheckbox">
              Mostrar itens marcados
            </label>
          </div>
          <div className="col-md">
            <button className="btn btn-primary" onClick={() => setCreateNewList(true) }>Criar Nova Lista</button>
          </div>
        </div>
        {/* Create new item */}
          <div className="my-1 row m-3">
            <label className="col-md-auto" htmlFor="newItem">Novo Item:</label>
            <input className="form-control col-md" id="newItem"
              placeholder="Insira um novo item"
              value={ newItem }
              onChange={e => setNewItem(e.target.value)}
            />
            <button className="btn btn-primary col-md-auto"
              onClick={ CreateNewItem }>
                Adicionar
            </button>
          </div>
        {/* Items Tables */}
        <div className="container-fluid mt-3">
          {/* Uncompleted Items */}
          <ItemsTable
            caption={ String(items.length - doneItems)
              .concat((items.length - doneItems) === 1 ? ' item pendente' : ' itens pendentes') }
            items={ items.filter(t => t.done === false) }
            toggleTodo={ ToggleItem }
          />
          {/* Completed Items */}
          { showCompleted &&
            <ItemsTable
              caption={ '' + doneItems +
                (doneItems === 1 ? ' item finalizado' : ' itens finalizados') }
              items={ items.filter(t => t.done === true) }
              toggleTodo={ ToggleItem }
             />
          }
        </div>
      </div>
    );
  }
}

// MISC
function isValidStr(str) {
  if(!str || 0 === str.length || str.match(/^ *$/))
    return false;
  
  return true;
}