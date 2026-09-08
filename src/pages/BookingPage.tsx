import { Link, useLocation } from "react-router";
import { BookingForm } from "../components/BookingForm";
import type { Sport } from "../types/sport";

interface BookingState {
  hallId: string;
  hallName: string;
  sport: Sport;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
}

export default function BookingPage() {
  const location = useLocation();

  const booking =
    location.state as BookingState | null;

  if (booking === null) {
    return <p>Ingen bokning vald.</p>;
  }

  return (
   <main>
      <Link to="/calendar" className="back-link">
        ← Tillbaka till kalendern
      </Link>

      <BookingForm
        hallId={booking.hallId}
        hallName={booking.hallName}
        sport={booking.sport}
        date={booking.date}
        startTime={booking.startTime}
        endTime={booking.endTime}
        price={booking.price}
      />
    </main>
  );
}