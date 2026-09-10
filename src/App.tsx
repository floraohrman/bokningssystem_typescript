import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      <Outlet />

      <footer>
        <p>&copy; 2024 Ballers</p>
      </footer>
    </>
  );
}

export default App;
