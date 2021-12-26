import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Modal, InputGroup, FormControl,
        Card, ListGroup, ListGroupItem,
        Container, Row, Col } from "react-bootstrap";
import { TodoList } from "./constructors";

export default function Todos() {
  const [appData, setAppData] = useState(() => {
    const storedData = window.sessionStorage.getItem("react-todo-app-data");
    const data = JSON.parse(storedData);
    return (data && (Array.isArray(data) ? data : [data])) || [];
  });
  const [userName, setUserName] = useState(useParams().userName);
  const [userIndex, setUserIndex] = useState(() => appData.findIndex(user => user.userName === userName));
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showTodoListModal, setShowTodoListModal] = useState(false);
  const [listIndex, setListIndex] = useState(null);
  const navigate = useNavigate();

  if (userIndex < 0) return (
    <h3 className="text-white text-center bg-primary p-3">
      O usuário {userName} não foi encontrado!
    </h3>
  );
  else return (
    <>
      <h3 className="text-white text-center bg-primary p-3">
        Página das tarefas de {userName}!
      </h3>
      <Button variant="secondary" className="m-2 ms-4 px-4 p-2" onClick={() => navigate("/")}>
        Voltar
      </Button>
      <Button className="m-2 p-2" variant="primary" onClick={() => setShowNewListModal(true)}>
         Criar Nova Lista
      </Button>

      <CreateCardsList todos={appData[userIndex].todos}
        userName={userName} />
      <CreateNewListModal showModal={showNewListModal}
        dismissModal={() => setShowNewListModal(false)}
        acceptAction={() => {
          let newAppData = appData;
          newAppData[userIndex].todos.push(
            new TodoList(document.getElementById("listNameInput").value,
                          document.getElementById("listDescInput").value));
          window.sessionStorage.setItem("react-todo-app-data", JSON.stringify(newAppData));
          setShowNewListModal(false);
          setAppData(newAppData);
        }} />
    </>
  );
}

function CreateCardsList(props) {
  if (!Array.isArray(props.todos) || props.todos.length < 1)
    return null;
  
  function MakeRows() {
    let rows = [];
    for (let i = 0, l = props.todos.length; i < l; i += 3) {
      rows.push(<Row><MakeCols index={i} max={i+3 >= l ? l : i+3} /></Row>);
    }
    return rows;
  }
  function MakeCols(colsProps) {
    let cols = [];
    for (let j = colsProps.index; j < colsProps.max; j++) {
      cols.push(
        <Col className="p-3" sm={3} key={j}>
          <Card className="card-hover">
            <Link to={`/${props.userName}/${j}`} style={{ textDecoration: "none", color: "black"}}>
              <Card.Body>
                <Card.Title>{props.todos[j].listName}</Card.Title>
                <Card.Text>{props.todos[j].description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                {/* <MakeItemsList list={props.todos[j].items} /> */}
              </ListGroup>
            </Link>
            <Card.Body>
              <Button className="rounded-circle m-2" variant="primary">&#10010;</Button>
              <Button className="rounded-circle m-2" variant="danger">&#128465;</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return cols;
  }
  // function MakeItemsList(itemsProps) {

  // }
  return (
    <Container>
      <MakeRows />
    </Container>
  );
}

function CreateNewListModal(props) {
  
  return (
    <Modal show={props.showModal} onHide={props.dismissModal}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Nova Lista</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Título:</InputGroup.Text>
          <FormControl id="listNameInput" placeholder="Título da lista" autoFocus/>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Descrição:</InputGroup.Text>
          <FormControl as="textarea" id="listDescInput" placeholder="Descrição da lista" autoFocus/>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.dismissModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={props.acceptAction}>
          Criar Lista
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
