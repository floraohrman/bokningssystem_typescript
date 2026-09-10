import { Link } from "react-router";
import type { Hall } from "../types/hall";

interface HallCardProps {
  hall: Hall;
}

function HallCard({ hall }: HallCardProps) {
  return (
    <article>
      <h2>{hall.name}</h2>

      <p>Pris: {hall.price} kr</p>

      <Link to={`/halls/${hall.id}`}>VISA HALL {hall.id}</Link>
    </article>
  );
}

export default HallCard;
