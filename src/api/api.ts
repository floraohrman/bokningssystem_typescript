import type { Booking, NewBooking } from "../types/booking";
import type { Hall } from "../types/hall";

const BASE_URL = "http://localhost:3001";

export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function post<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post ${endpoint}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function getHalls(): Promise<Hall[]> {
  return get<Hall[]>("halls");
}

export function getBookings(): Promise<Booking[]> {
  return get<Booking[]>("bookings");
}

export function getBooking(id: string): Promise<Booking> {
  return get<Booking>(`bookings/${id}`);
}

export function createBooking(newBooking: NewBooking): Promise<Booking> {
  return post<Booking>("bookings", newBooking);
}