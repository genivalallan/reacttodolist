import { useParams } from "react-router-dom";

export default function Todos() {
  let { userName } = useParams();

  return (
    <div >
      <h3 className="text-white text-center bg-primary p-3">
        Página das tarefas de {userName}!
      </h3>
    </div>
  );
}