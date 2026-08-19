import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";

// Aktyor melumati backend-de yoxdur, numune ucun statik saxlanilib.
const SAMPLE_ACTORS = [
  { name: "Jason Momoa", image: "/images/actors/actor1.jpg" },
  { name: "Dwayne Johnson", image: "/images/actors/actor2.jpg" },
  { name: "Anne Hathaway", image: "/images/actors/actor3.jpg" },
  { name: "Tom Holland", image: "/images/actors/actor4.jpg" },
  { name: "Ana de Armas", image: "/images/actors/actor5.jpg" },
];

const CharactorsSection = () => {
  const [tab, setTab] = useState("actors"); // "directors" | "actors"
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const data = await getMovies({ limit: 100 });
        // Rejissorlarin unikal siyahisi - real backend datasindan
        const uniqueDirectors = [
          ...new Set(data.movies.map((m) => m.director)),
        ].map((name) => ({ name, image: "/images/directors/default-director.jpg" }));
        setDirectors(uniqueDirectors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDirectors();
  }, []);

  const items = tab === "directors" ? directors : SAMPLE_ACTORS;

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Charactors</h2>
        <div className="collection-toggle">
          <button
            className={`collection-toggle-btn ${tab === "directors" ? "active" : ""}`}
            onClick={() => setTab("directors")}
          >
            Directors
          </button>
          <button
            className={`collection-toggle-btn ${tab === "actors" ? "active" : ""}`}
            onClick={() => setTab("actors")}
          >
            Actors
          </button>
        </div>
      </div>

      <div className="scroll-row">
        {items.map((person) => (
          <div key={person.name} className="character-card">
            <img className="character-avatar" src={person.image} alt={person.name} />
            <p className="character-name">{person.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CharactorsSection;