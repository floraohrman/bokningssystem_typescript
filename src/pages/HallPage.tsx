import { Link, useParams } from "react-router";
import { halls } from "../data/halls";

function HallPage() {
  const { id } = useParams();

  const hall = halls.find((hall) => hall.id === id);

  if (!hall) {
    return (
      <main>
        <h1>Hallen hittades inte</h1>

        <Link to="/halls">← Tillbaka till våra hallar</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/halls">← Tillbaka till våra hallar</Link>

      <h1>{hall.name}</h1>

      <p>Pris: {hall.price} kr</p>

      <p>Här kan du läsa mer om {hall.name} och boka hallen för din sport.</p>

      <Link to="/calendar">Boka hallen</Link>
    </main>
  );
}

export default HallPage;
