import { useState } from "react";
import { Button, Modal, InputGroup, FormControl, Card } from "react-bootstrap";
import { UserTodos } from "./constructors";

export default function App() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
  <>
    <div className="d-flex justify-content-center">
      <h4 className="bg-primary text-white text-center m-2 p-2 rounded-3 mid-size">Lista De Usuários</h4>
    </div>
    <div className="d-flex justify-content-center mid-size">
      <Button className="m-3" variant="primary" onClick={() => setShowModal(true)}>
        Criar Novo Usuário
      </Button>
    </div>

    {users.map((user, i) => 
      <div className="mid-size p-3">
        <Card key={i} className="card-hover" onClick={() => window.alert(user.userName)}>
          <Card.Header>{user.userName}</Card.Header>
          <Card.Body>
            {/* <Card.Title>Special title treatment</Card.Title> */}
            <Card.Text>
              {user.items?.length ?? 0} listas. {(user.items?.length ?? 0) > 0 ? user.items.length : "0"} Tarefas.
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </div>
    )}

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Usuário:</InputGroup.Text>
          <FormControl id="userNameInput" placeholder="Nome do usuário" autoFocus/>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => {
          setUsers([...users, new UserTodos(document.getElementById("userNameInput").value)]);
          setShowModal(false);
          // userNameInput.value = "";
        }}>
          Criar Usuário
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
}
