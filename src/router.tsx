import HomePage from "./pages/HomePage";
import HallsPage from "./pages/HallsPage";
import HallDetailsPage from "./pages/HallDetailsPage";

const routes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "halls",
    element: <HallsPage />,
  },
  {
    path: "halls/:id",
    element: <HallDetailsPage />,
  },
];

export default routes;