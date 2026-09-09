import { createBrowserRouter } from "react-router";

import App from "./App";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import BookingPage from "./pages/BookingPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
    ],
  },
]);
