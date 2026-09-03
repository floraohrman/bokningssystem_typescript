import type { Booking } from "../types/booking";

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export const availableTimes: TimeSlot[] = [
   { startTime: "08:00", endTime: "10:30" },
   { startTime: "10:30", endTime: "13:00" },
   { startTime: "13:00", endTime: "15:30" },
   { startTime: "15:30", endTime: "18:00" },
   { startTime: "18:00", endTime: "20:30" },
];

export function isTimeAvailable(
    bookings: Booking[],
    hallId: string,
    date: string,
    timeSlot: TimeSlot
): boolean {
    const startTime = `${date}T${timeSlot.startTime}:00`;
    const endTime = `${date}T${timeSlot.endTime}:00`;

    const existingBooking: Booking | undefined = bookings.find(
        (booking) =>
            booking.hallId === hallId &&
            booking.status === "confirmed" &&
            booking.startTime < endTime &&
            booking.endTime > startTime
    );

    return existingBooking === undefined;
};
