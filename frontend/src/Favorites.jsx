
import React, { useState, useEffect } from "react";
import "./Favorites.css";
import { Link } from "react-router-dom";

function Favorites() {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    const fetchFavorites = async () => {

      if (!userId) {
        setError("Please login to view your favourites.");
        setLoading(false);
        return;
      }

      try {

        const response = await fetch(
          `http://localhost:8080/api/favorites/user/${userId}`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch favourites.");
        }

        const data = await response.json();
        setFavorites(data);

      } catch (err) {

        console.error(err);
        setError("Unable to load favourites. Please try again.");

      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();

  }, [userId]);

  const removeFavorite = async (ideaId) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/favorites/remove?userId=${userId}&ideaId=${ideaId}`,
        {
          method: "DELETE"
        }
      );

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result);
      }

      setFavorites((previousFavorites) =>
        previousFavorites.filter(
          (idea) => idea.idea_id !== ideaId
        )
      );

      alert(result);

    } catch (err) {

      console.error(err);
      alert("Unable to remove favourite. Please try again.");

    }
  };

  return (
    <div className="favorites-page">

      <Link to="/" className="back-home-btn">
        ← Back to home
      </Link>

      <h1>My Favourite Ideas ❤️</h1>

      <p>Your saved creative DIY ideas will appear here.</p>

      {loading && <p>Loading favourites...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && favorites.length === 0 && (
        <div className="favorites-empty">
          <h2>No Favourite Ideas Yet!</h2>
          <p>Explore ideas and save your favourites.</p>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (

        <div className="favorites-grid">

          {favorites.map((idea) => (

            <div className="favorite-card" key={idea.favorite_id}>

              <h3>{idea.title}</h3>

              <p>{idea.description}</p>

              <p>Material: {idea.material_name}</p>

              <p>Purpose: {idea.purpose}</p>

              <p>Estimated Cost: ₹{idea.estimated_cost}</p>

              <button
                onClick={() => removeFavorite(idea.idea_id)}
              >
                Remove ❤️
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Favorites;
