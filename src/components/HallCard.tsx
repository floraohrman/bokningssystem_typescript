import type { Hall } from "../types/hall";

interface HallCardProps {
  hall: Hall;
}

function HallCard({ hall }: HallCardProps) {
  return (
    <article>
      <h2>{hall.name}</h2>
      <p>Pris: {hall.price} kr</p>

      <button>Visa hall</button>
    </article>
  );
}

export default HallCard;