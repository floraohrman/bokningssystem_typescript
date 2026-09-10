import { createBrowserRouter } from "react-router";

import App from "./App";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import BookingPage from "./pages/BookingPage";
import HallsPage from "./pages/HallsPage";
import HallPage from "./pages/HallPage";

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
      {
        path: "/halls",
        element: <HallsPage />,
      },
      {
        path: "/halls/:id",
        element: <HallPage />,
      },
    ],
  },
]);
