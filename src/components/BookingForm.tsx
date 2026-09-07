import { useState } from "react";

import type { NewBooking } from "../types/booking";
import type { Sport } from "../types/sport";

import {
  createBooking,
  getBookings,
} from "../api/api";

import {
  isTimeAvailable,
} from "../utils/availableTime";

import "./BookingForm.css";

interface BookingFormProps {
  hallId: string;
  hallName: string;
  sport: Sport;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
}

export function BookingForm({
  hallId,
  hallName,
  sport,
  date,
  startTime,
  endTime,
  price,
}: BookingFormProps) {
  const [customerName, setCustomerName] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
  event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
) {
  event.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      const latestBookings =
        await getBookings();

      const available =
        isTimeAvailable(
          latestBookings,
          hallId,
          date,
          {
            startTime,
            endTime,
          }
        );

      
      if (!available) {
        setMessage(
          "Tyvärr har tiden precis blivit bokad av någon annan."
        );

        return;
      }

      // Skapar bokningen som ska skickas
      // till json-server.
      const newBooking: NewBooking = {
        hallId,
        sport,
        customerName,
        customerEmail,
        startTime:
          `${date}T${startTime}:00`,
        endTime:
          `${date}T${endTime}:00`,
        price,
        status: "confirmed",
      };

      await createBooking(newBooking);

      setMessage(
        "Bokningen är genomförd!"
      );

      setCustomerName("");
      setCustomerEmail("");
    } catch (error) {
      console.error(error);

      setMessage(
        "Något gick fel vid bokningen."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="booking-page">
      <div className="booking-layout">

        <div className="booking-form-card">
          <h2>
            Fyll i dina uppgifter
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">
                Förnamn och efternamn
              </label>

              <input
                id="name"
                type="text"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(
                    event.target.value
                  )
                }
                placeholder="Ditt namn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                E-post
              </label>

              <input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(event) =>
                  setCustomerEmail(
                    event.target.value
                  )
                }
                placeholder="din@email.se"
                required
              />
            </div>

            <button
              type="submit"
              className="booking-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Kontrollerar..."
                : "Boka"}
            </button>

            {message && (
              <p className="booking-message">
                {message}
              </p>
            )}

          </form>
        </div>

        <aside className="booking-summary">
          <h2>{hallName}</h2>

          <div className="summary-row">
            <span>Sport</span>

            <strong>
              {sport}
            </strong>
          </div>

          <div className="summary-row">
            <span>Datum</span>

            <strong>
              {date}
            </strong>
          </div>

          <div className="summary-row">
            <span>Tid</span>

            <strong>
              {startTime}
              {" - "}
              {endTime}
            </strong>
          </div>

          <div className="summary-divider" />

          <div
            className="
              summary-row
              summary-total
            "
          >
            <span>Totalt</span>

            <strong>
              {price} kr
            </strong>
          </div>
        </aside>

      </div>
    </section>
  );
}