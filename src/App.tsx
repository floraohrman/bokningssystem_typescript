import { Outlet } from "react-router";

function App() {
  return (
    <>
      <main>
        <h1>Studio Spot</h1>
        <Outlet />
      </main>
    </>
  );
}

export default App;
