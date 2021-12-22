import { useState } from "react";
import { useParams } from "react-router-dom";
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
  const [showModal, setShowModal] = useState(false);
  console.log(JSON.stringify(appData));
  console.log(JSON.stringify(userIndex));

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
      <Button className="m-3" variant="primary" onClick={() => setShowModal(true)}>
         Criar Nova Lista
      </Button>

      <CreateCardsList todos={appData[userIndex].todos} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => {
            let newAppData = appData;
            newAppData[userIndex].todos.push(
              new TodoList(document.getElementById("listNameInput").value,
                            document.getElementById("listDescInput").value));
            console.log(JSON.stringify(newAppData));
            window.sessionStorage.setItem("react-todo-app-data", JSON.stringify(newAppData));
            setShowModal(false);
            setAppData(newAppData);
          }}>
            Criar Lista
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CreateCardsList(props) {
  console.log(`Entrou na função CreateCardsList.\nprops.todos.length: ${props.todos.length}`);
  if (!Array.isArray(props.todos) || props.todos.length < 1)
    {console.log("Prop não é um array. Retornando."); return (<></>);}
  
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
      console.log(`Dentro do for em MakeCols.\nj: ${j}.`);
      cols.push(
        <Col className="p-3" sm={3} key={j}>
          <Card>
            <Card.Body>
              <Card.Title>{props.todos[j].listName}</Card.Title>
              <Card.Text>{props.todos[j].description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {/* <MakeItemsList list={props.todos[j].items} /> */}
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="primary">Adicionar</Button>
              <Button variant="danger">Remover</Button>
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