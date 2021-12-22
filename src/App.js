import { useState } from "react";
import { Button, Modal, InputGroup, FormControl, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserTodos } from "./constructors";

export default function App() {
  const [appData, setAppData] = useState(() => {
    const storedData = window.sessionStorage.getItem("react-todo-app-data");
    const data = JSON.parse(storedData);
    return data || [];
  });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-center">
        <h4 className="bg-primary text-white text-center m-2 p-2 rounded-3 mid-size">
          Lista De Usuários
        </h4>
      </div>
      <div className="d-flex justify-content-center">
        <Button className="m-3" variant="primary" onClick={() => setShowModal(true)}>
          Criar Novo Usuário
        </Button>
        <Button className="m-3" variant="danger" onClick={() => {
          window.sessionStorage.clear();
          setAppData([]);
          window.alert("Todos os dados foram apagados com sucesso!");
        }}>
          Limpar Todos Os Dados
        </Button>
      </div>

      {appData.map((user, i) => (
        <div key={i} className="mid-size p-3">
          <Link to={`/${user.userName}`} style={{ textDecoration: "none", color: "black" }}>
            <Card className="card-hover">
              <Card.Header>{user.userName}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {user.items?.length ?? 0} listas.{" "}
                  {(user.items?.length ?? 0) > 0 ? user.items.length : "0"}{" "}
                  Tarefas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Usuário:</InputGroup.Text>
            <FormControl
              id="userNameInput"
              placeholder="Nome do usuário"
              autoFocus
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => {
              let newAppData = [...appData,
                new UserTodos(document.getElementById("userNameInput").value)];
              window.sessionStorage.setItem("react-todo-app-data", JSON.stringify(newAppData));
              setShowModal(false);
              setAppData(newAppData);
          }}>
            Criar Usuário
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
