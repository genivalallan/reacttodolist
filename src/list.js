import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, ListGroup, ListGroupItem,
          Button, Form } from "react-bootstrap";
import { TodoItem } from "./constructors";

export default function List() {
  const userName = useParams().userName;
  const listIndex = useParams().listIndex;
  const [input, setInput] = useState("");
  const [appData, setAppData] = useState(() => {
    const storedData = window.sessionStorage.getItem("react-todo-app-data");
    const data = JSON.parse(storedData);
    return (data && (Array.isArray(data) ? data : [data])) || [];
  });
  const userIndex = useMemo(() => appData.findIndex(user => user.userName === userName), [appData, userName]);
  let navigate = useNavigate();

  const handleInput = () => {
    if (input.length === 0) return;
    let newAppData = appData;
    newAppData[userIndex].todos[listIndex].items.push(new TodoItem(input));
    window.sessionStorage.setItem("react-todo-app-data", JSON.stringify(newAppData));
    setInput("");
    setAppData(newAppData);
  }

  return (
    <Modal fullscreen={true} show={true} onHide={() => navigate(`/${userName}`)}>
      <Modal.Header closeButton>
        <Modal.Title>{appData[userIndex].todos[listIndex].listName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {appData[userIndex].todos[listIndex].description}
        </p>
        <ListGroup className="list-group-flush">
          <MakeItemsList list={appData[userIndex].todos[listIndex].items} />
          <Form.Control plaintext value={input} onChange={e => setInput(e.target.value)} className="input-hover" id="itemInput" />
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="m-2" onClick={() => navigate(`/${userName}`)}>
          Voltar
        </Button>
        <Button variant="primary" className="m-2" onClick={handleInput}>
          Adicionar Item
        </Button>
        <Button variant="danger" className="m-2" onClick={null}>
          Excluir Lista
        </Button>
        {/* <Button variant="primary" onClick={props.acceptAction}>
          Criar Lista
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

function MakeItemsList(props) {
  return props.list.map((item, index) =>
    <ListGroupItem key={index}>
      <Form.Check type="checkbox" value={item.done} label={item.description} />
    </ListGroupItem>
  );
}