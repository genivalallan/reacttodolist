import React, { Component } from 'react';

export class NewList extends Component {
  constructor(props){
    super(props);

    this.state = {
      userName: props.userName,
      listName: ''
    };
  }

  render = () => 
    <form className="container-fluid my-1" key="newListForm"
          onSubmit={ () => this.props.callBack(this.state.userName.trim(), this.state.listName.trim()) }>
      <h4 className="bg-primary text-white text-center m-2">Criar Nova Lista</h4>
      <div className="row m-3">
        <label htmlFor="userName"
          className="bg-primary text-center text-white col-md-auto p-2">Nome do Usuário:</label>
        <input className="col-md form-control" id="userName"
          placeholder="Insira o nome do usuário"
          required="required"
          value={ this.state.userName }
          onChange={ e => this.setState({ userName: e.target.value }) }
        />
      </div>
      <div className="row m-3">
        <label htmlFor="listName"
          className="bg-primary text-center text-white col-md-auto p-2">Nome da lista:</label>
        <input className="col-md form-control" id="listName"
          placeholder="Insira o nome da lista"
          required="required"
          value={ this.state.listName }
          onChange={ e => this.setState({ listName: e.target.value }) }
        />
      </div>
      <button className="btn btn-primary m-3" type="submit">Criar Lista</button>
    </form>
}
