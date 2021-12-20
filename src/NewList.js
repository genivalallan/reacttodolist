import { useState } from "react";

export function NewList(props) {
  // let userName = props.userName;
  const [userName, setUserName] = useState(props.userName);
  // let listName = '';
  const [listName, setListName] = useState('');
  
  return (
    <form className="container-fluid my-1" key="newListForm"
          onSubmit={ () => props.callBack(userName.trim(), listName.trim()) }>
      <h4 className="bg-primary text-white text-center m-2">Criar Nova Lista</h4>
      <div className="row m-3">
        <label htmlFor="userName"
          className="bg-primary text-center text-white col-md-auto p-2">Nome do Usuário:</label>
        <input className="col-md form-control" id="userName"
          placeholder="Insira o nome do usuário"
          required="required"
          value={ userName }
          onChange={ e => setUserName(e.target.value) }
        />
      </div>
      <div className="row m-3">
        <label htmlFor="listName"
          className="bg-primary text-center text-white col-md-auto p-2">Nome da lista:</label>
        <input className="col-md form-control" id="listName"
          placeholder="Insira o nome da lista"
          required="required"
          value={ listName }
          onChange={ e => setListName(e.target.value) }
        />
      </div>
      <button className="btn btn-primary m-3" type="submit">Criar Lista</button>
    </form>
  );
}
