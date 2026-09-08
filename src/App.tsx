import { Outlet } from "react-router";

function App() {
  return (
    <>
      <header>
        <h1>Ballers</h1>
      </header>

      <Outlet />

      <footer>
        <p>&copy; 2024 Ballers</p>
      </footer>
    </>
  );
}

export default App;