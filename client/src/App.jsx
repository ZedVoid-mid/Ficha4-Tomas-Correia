import { useEffect, useState } from "react";
import Card from "./Card.jsx";

function App() {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [randomCard, setRandomCard] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const baseUrl = "http://localhost:3000/api/cartas";
    const url = filter === "Todas" ? baseUrl : `${baseUrl}?tipo=${encodeURIComponent(filter)}`;

    setLoading(true);
    setError("");

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText || "pedido inválido"}`);
        }
        return res.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
        setCards([]);
        setError("Não foi possível carregar as cartas.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  let visible = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sorted) {
    visible = [...visible].sort((a, b) => b.attack - a.attack);
  }

  function pickRandom() {
    fetch("http://localhost:3000/api/cartas/aleatoria")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText || "pedido inválido"}`);
        }
        return res.json();
      })
      .then((data) => {
        setRandomCard(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar uma carta à sorte.");
      });
  }

  return (
    <main>
      <h1>A minha coleção</h1>

      {loading ? (
        <p>A carregar...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>
            Tenho {cards.length} cartas · a mostrar {visible.length}
          </p>

          <div>
            <button onClick={() => setFilter("Todas")}>Todas</button>
            <button onClick={() => setFilter("Criatura")}>Só criaturas</button>
            <button onClick={() => setFilter("Feitiço")}>Só feitiços</button>
            <button onClick={() => setSorted(!sorted)}>
              {sorted ? "Ordem original" : "Ordenar por ataque"}
            </button>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procurar pelo nome…"
          />

          {visible.length === 0 ? (
            <p>Nenhuma carta corresponde.</p>
          ) : (
            <ul>
              {visible.map((card) => (
                <Card key={card.name} {...card} />
              ))}
            </ul>
          )}
        </>
      )}

      <h2>Carta à sorte</h2>
      <button onClick={pickRandom}>Escolher outra</button>
      {randomCard && (
        <p>
          <b>{randomCard.name}</b> — {randomCard.type} · ataque {randomCard.attack} ·
          defesa {randomCard.defense}
        </p>
      )}
    </main>
  );
}

export default App;
