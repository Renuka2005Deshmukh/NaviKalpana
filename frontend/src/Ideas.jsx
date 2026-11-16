
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Ideas.css";

function Ideas() {
  const location = useLocation();
  const navigate = useNavigate();

  const material = location.state?.material || "Plastic Bottles";

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8080/api/ideas/material/${encodeURIComponent(material)}`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch ideas!");
        }

        const data = await response.json();
        setIdeas(data);
      } catch (err) {
        setError("Unable to connect to server. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [material]);

  const saveToFavorites = async (idea) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first to add favourites!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/favorites/add?userId=${userId}&ideaId=${idea.idea_id}`,
        {
          method: "POST"
        }
      );

     const result = await response.text();

console.log("Favorite API Status:", response.status);
console.log("Favorite API Response:", result);

if (!response.ok) {
  throw new Error(result);
}

alert(result);
    } catch (err) {
      alert("Unable to add favourite. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="ideas-page">
      <button
        className="ideas-back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <h1 className="ideas-heading">
        {material} - Creative Ideas
      </h1>

      <p>
        Discover creative ways to reuse {material}.
      </p>

      {loading && <p>Loading ideas...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && ideas.length === 0 && (
        <p>No ideas found for this material.</p>
      )}

      <div className="ideas-grid">
        {ideas.map((idea) => (
          <div className="idea-card" key={idea.idea_id}>
            <img
              src={
                material === "Plastic Bottles"
                  ? "/images/plastic.jpg"
                  : material === "Paper"
                  ? "/images/paper.jpg"
                  : material === "Cardboard"
                  ? "/images/cardboard.jpg"
                  : "/images/glass.jpg"
              }
              alt={material}
              className="idea-image"
            />

            <h2>{idea.title}</h2>

            <p>{idea.description}</p>

            <p>
              <strong>Difficulty:</strong> {idea.difficulty}
            </p>

            <p>
              <strong>Estimated Cost:</strong> ₹{idea.estimated_cost}
            </p>

            <button
              className="card-btn"
              onClick={() =>
                navigate("/idea-details", {
                  state: {
                    idea: idea,
                    material: material
                  }
                })
              }
            >
              View Details
            </button>

            <button
              className="favorite-btn"
              onClick={() => saveToFavorites(idea)}
            >
              ❤️ Add to Favourites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ideas;
