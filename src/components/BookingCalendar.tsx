import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Booking } from "../types/booking";
import type { Hall } from "../types/hall";
import type { Sport } from "../types/sport";

import {
  getBookings,
  getHalls,
} from "../api/api";

import {
  availableTimes,
  isTimeAvailable,
} from "../utils/availableTime";

import "./BookingCalendar.css";

export function BookingCalendar() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [halls, setHalls] =
    useState<Hall[]>([]);

  const [selectedHallId, setSelectedHallId] =
    useState("1");

  const [weekStart, setWeekStart] =
    useState(new Date("2026-09-07"));

  const navigate = useNavigate();

  // Tillfälligt tills vi har sportvalet på sidan
  const sport: Sport = "football";

  useEffect(() => {
    getBookings()
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(
          "Kunde inte hämta bokningar:",
          error
        );
      });

    getHalls()
      .then((data) => {
        setHalls(data);

        if (data.length > 0) {
          setSelectedHallId(data[0].id);
        }
      })
      .catch((error) => {
        console.error(
          "Kunde inte hämta hallar:",
          error
        );
      });
  }, []);

  const selectedHall = halls.find(
    (hall) =>
      hall.id === selectedHallId
  );

  const days = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(weekStart);

      date.setDate(
        weekStart.getDate() + index
      );

      return date;
    }
  );

  function nextWeek() {
    const next =
      new Date(weekStart);

    next.setDate(
      next.getDate() + 7
    );

    setWeekStart(next);
  }

  function previousWeek() {
    const previous =
      new Date(weekStart);

    previous.setDate(
      previous.getDate() - 7
    );

    setWeekStart(previous);
  }

  function formatDate(
    date: Date
  ): string {
    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function handleTimeClick(
    date: string,
    startTime: string,
    endTime: string
  ) {
    if (selectedHall === undefined) {
      return;
    }

    navigate("/booking", {
      state: {
        hallId: selectedHall.id,
        hallName: selectedHall.name,
        sport,
        date,
        startTime,
        endTime,
        price: selectedHall.price,
      },
    });
  }

  return (
    <section className="booking-calendar">
        <Link to="/" className="back-link">
          ← Till startsidan
         </Link>

      <div className="hall-selector">
        {halls.map((hall) => (
          <button
            type="button"
            key={hall.id}
            onClick={() =>
              setSelectedHallId(
                hall.id
              )
            }
            className={
              selectedHallId === hall.id
                ? "hall-button active"
                : "hall-button"
            }
          >
            {hall.name}
          </button>
        ))}
      </div>

      <div className="calendar-navigation">
        <button
          type="button"
          onClick={previousWeek}
        >
          ← Tidigare
        </button>

        <h2>
          Välj tid
        </h2>

        <button
          type="button"
          onClick={nextWeek}
        >
          Senare →
        </button>
      </div>

      <div className="calendar">
        {days.map((day) => {
          const date =
            formatDate(day);

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
                      selectedHallId,
                      date,
                      timeSlot
                    );

                  return (
                    <button
                      type="button"
                      key={
                        timeSlot.startTime
                      }
                      disabled={
                        !available
                      }
                      className={
                        available
                          ? "time-slot"
                          : "time-slot booked"
                      }
                      onClick={() =>
                        handleTimeClick(
                          date,
                          timeSlot.startTime,
                          timeSlot.endTime
                        )
                      }
                    >
                      <strong>
                        {
                          timeSlot.startTime
                        }
                        {" - "}
                        {
                          timeSlot.endTime
                        }
                      </strong>

                      <span>
                        {available
                          ? `${
                              selectedHall
                                ?.price ??
                              0
                            } kr`
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