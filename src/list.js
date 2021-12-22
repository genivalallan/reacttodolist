import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, ListGroup, ListGroupItem,
          Button } from "react-bootstrap";

export default function List() {
  const [userName, setUserName] = useState(useParams().userName);
  const [listIndex, setListIndex] = useState(useParams().listIndex);
  const [appData, setAppData] = useState(() => {
    const storedData = window.sessionStorage.getItem("react-todo-app-data");
    const data = JSON.parse(storedData);
    return (data && (Array.isArray(data) ? data : [data])) || [];
  });
  const [userIndex, setUserIndex] = useState(() => appData.findIndex(user => user.userName === userName));
  let navigate = useNavigate();

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
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate(`/${userName}`)}>
          Voltar
        </Button>
        {/* <Button variant="primary" onClick={props.acceptAction}>
          Criar Lista
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}