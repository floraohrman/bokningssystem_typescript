import { useParams } from "react-router";
import { halls } from "../data/halls";

function HallDetailsPage() {
  const { id } = useParams();

  const hall = halls.find((hall) => hall.id === id);

  if (!hall) {
    return <p>Hallen hittades inte.</p>;
  }

  return (
    <main>
      <h1>{hall.name}</h1>

      <p>Pris: {hall.price} kr</p>

      <h2>Tillgängliga tider</h2>

      <button>09:00</button>
      <button>11:30</button>
      <button>13:00</button>
      <button>15:30</button>
      <button>17:30</button>
      <button>19:30</button>
    </main>
  );
}

export default HallDetailsPage;
