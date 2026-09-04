//** BookingCard component for displaying booking information
// -- Flora Öhrman*/

import type { Booking } from '../types/booking';

interface BookingCardProps {
    booking: Booking;
    hallName: string;
    onCancel: (bookingId: string) => void;
}

function BookingCard({ booking, 
    hallName, 
    onCancel
}: BookingCardProps) {
  return (
    <article className="booking-card">
      <h2>{hallName}</h2>

      <p>Sport: {booking.sport}</p>

      <p>
        Tid: {booking.startTime} - {booking.endTime}
      </p>

      <p>Pris: {booking.price} kr</p>

      <p>Namn: {booking.customerName}</p>

      <p>E-post: {booking.customerEmail}</p>

      <p>
        Status:{" "}
        {booking.status === "confirmed"
          ? "Bekräftad"
          : "Avbokad"}
      </p>

      {booking.status === "confirmed" && (
        <button
          type="button"
          onClick={() => onCancel(booking.id)}
        >
          Avboka
        </button>
      )}
    </article>
  );
}

export default BookingCard;