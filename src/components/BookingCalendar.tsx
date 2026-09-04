import { useEffect, useState } from "react";
import type { Booking } from "../types/booking";
import { getBookings } from "../api/api";
import {
  availableTimes,
  isTimeAvailable,
} from "../utils/availableTime";

import "./BookingCalendar.css";

export function BookingCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [weekStart, setWeekStart] = useState(
    new Date("2026-09-07")
  );

  // Tillfälligt hallId för test.
  // Senare kan detta komma från HallPage / React Router.
  const hallId = "1";

  useEffect(() => {
    getBookings()
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Kunde inte hämta bokningar:", error);
      });
  }, []);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);

    date.setDate(
      weekStart.getDate() + index
    );

    return date;
  });

  
  function nextWeek() {
    const next = new Date(weekStart);

    next.setDate(
      next.getDate() + 7
    );

    setWeekStart(next);
  }

  function previousWeek() {
    const previous = new Date(weekStart);

    previous.setDate(
      previous.getDate() - 7
    );

    setWeekStart(previous);
  }

  // Gör om Date till formatet:
  // 2026-09-07
  // Detta format används av isTimeAvailable()
  function formatDate(date: Date): string {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <section className="booking-calendar">
      <div className="calendar-navigation">
        <button
          type="button"
          onClick={previousWeek}
        >
          ← Tidigare
        </button>

        <h2>Välj tid</h2>

        <button
          type="button"
          onClick={nextWeek}
        >
          Senare →
        </button>
      </div>

      <div className="calendar">
        {days.map((day) => {
          const date = formatDate(day);

          return (
            <div
              key={date}
              className="day-column"
            >
              <h3>
                {day.toLocaleDateString(
                  "sv-SE",
                  {
                    weekday: "short",
                  }
                )}
              </h3>

              <p>
                {day.getDate()}
              </p>

              {availableTimes.map(
                (timeSlot) => {
                  const available =
                    isTimeAvailable(
                      bookings,
                      hallId,
                      date,
                      timeSlot
                    );

                  return (
                    <button
                      type="button"
                      key={timeSlot.startTime}
                      disabled={!available}
                      className={
                        available
                          ? "time-slot"
                          : "time-slot booked"
                      }
                    >
                      <strong>
                        {timeSlot.startTime} -{" "}
                        {timeSlot.endTime}
                      </strong>

                      <span>
                        {available
                          ? "500 kr"
                          : "Bokad"}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}