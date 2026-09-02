import type { Sport } from "./sport";

export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
  id: string;
  hallId: string;
  sport: Sport;
  customerName: string;
  customerEmail: string;
  startTime: string;
  endTime: string;
  price: number;
  status: BookingStatus;
}

export type NewBooking = Omit<Booking, "id">;
