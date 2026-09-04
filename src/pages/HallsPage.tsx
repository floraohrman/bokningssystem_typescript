import { useState } from "react";

function HallsPage() {
  const [selectedHall, setSelectedHall] = useState("");

  return (
    <main>
      <h1>Våra hallar</h1>

      <p>Här kan du välja vilken hall du vill boka.</p>

      <section>
        <button onClick={() => setSelectedHall("Hall 1")}>Hall 1</button>

        <button onClick={() => setSelectedHall("Hall 2")}>Hall 2</button>

        <button onClick={() => setSelectedHall("Hall 3")}>Hall 3</button>
      </section>

      <p>Vald hall: {selectedHall}</p>

      {selectedHall === "Hall 1" && (
        <section>
          <h2>Hall 1</h2>
          <h3>Tillgängliga tider</h3>

          <button>09:00</button>
          <button>11:30</button>
          <button>13:00</button>
          <button>15:30</button>
          <button>17:30</button>
          <button>19:30</button>
        </section>
      )}

      {selectedHall === "Hall 2" && (
        <section>
          <h2>Hall 2</h2>
          <h3>Tillgängliga tider</h3>

          <button>09:00</button>
          <button>11:30</button>
          <button>13:00</button>
          <button>15:30</button>
          <button>17:30</button>
          <button>19:30</button>
        </section>
      )}

      {selectedHall === "Hall 3" && (
        <section>
          <h2>Hall 3</h2>
          <h3>Tillgängliga tider</h3>

          <button>09:00</button>
          <button>11:30</button>
          <button>13:00</button>
          <button>15:30</button>
          <button>17:30</button>
          <button>19:30</button>
        </section>
      )}
    </main>
  );
}

export default HallsPage;
