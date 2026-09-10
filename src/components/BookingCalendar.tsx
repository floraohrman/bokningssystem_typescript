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

  const navigate = useNavigate();

  const sport: Sport = "football";

  function getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();

    const difference =
      day === 0 ? -6 : 1 - day;

    start.setDate(
      start.getDate() + difference
    );

    start.setHours(0, 0, 0, 0);

    return start;
  }

  const currentWeekStart =
    getStartOfWeek(new Date());

  const [weekStart, setWeekStart] =
    useState(currentWeekStart);

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

    if (previous < currentWeekStart) {
      return;
    }

    setWeekStart(previous);
  }

  const isCurrentWeek =
    weekStart.getTime() ===
    currentWeekStart.getTime();

  
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

  
  function getMinutesRemaining(
    date: string,
    endTime: string
  ): number {
    const end =
      new Date(
        `${date}T${endTime}:00`
      );

    const now = new Date();

    const difference =
      end.getTime() - now.getTime();

    return Math.floor(
      difference / (1000 * 60)
    );
  }

  function hasSlotStarted(
    date: string,
    startTime: string
  ): boolean {
    const start =
      new Date(
        `${date}T${startTime}:00`
      );

    return start < new Date();
  }

  function formatRemainingTime(
    minutesRemaining: number
  ): string {
    const hours =
      Math.floor(
        minutesRemaining / 60
      );

    const minutes =
      minutesRemaining % 60;

    if (hours === 0) {
      return `${minutes} minuter`;
    }

    if (minutes === 0) {
      return hours === 1
        ? "1 timme"
        : `${hours} timmar`;
    }

    return hours === 1
      ? `1 timme och ${minutes} minuter`
      : `${hours} timmar och ${minutes} minuter`;
  }

  function handleTimeClick(
    date: string,
    startTime: string,
    endTime: string
  ) {
    if (selectedHall === undefined) {
      return;
    }

    const started =
      hasSlotStarted(
        date,
        startTime
      );

    const minutesRemaining =
      getMinutesRemaining(
        date,
        endTime
      );

    if (minutesRemaining <= 60) {
      return;
    }


    if (started) {
      const remainingText =
        formatRemainingTime(
          minutesRemaining
        );

      const confirmed =
        window.confirm(
          `Tiden har redan börjat. Det är ${remainingText} kvar. Är du säker på att du vill boka?`
        );

      if (!confirmed) {
        return;
      }
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

      <Link
        to="/"
        className="back-link"
      >
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
          disabled={isCurrentWeek}
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

                  const started =
                    hasSlotStarted(
                      date,
                      timeSlot.startTime
                    );

                  const minutesRemaining =
                    getMinutesRemaining(
                      date,
                      timeSlot.endTime
                    );

                  
                  const tooLate =
                    minutesRemaining <= 60;

                  return (
                    <button
                      type="button"
                      key={
                        timeSlot.startTime
                      }
                      disabled={
                        !available ||
                        tooLate
                      }
                      className={
                        !available
                          ? "time-slot booked"
                          : tooLate
                            ? "time-slot past"
                            : "time-slot"
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
                        {!available
                          ? "Bokad"
                          : tooLate
                            ? "Ej bokningsbar"
                            : started
                              ? `${formatRemainingTime(
                                  minutesRemaining
                                )} kvar`
                              : `${
                                  selectedHall
                                    ?.price ?? 0
                                } kr`}
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