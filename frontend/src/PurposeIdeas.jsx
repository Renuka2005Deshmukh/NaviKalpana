
import React, { useState } from "react";
import "./PurposeIdeas.css";
import { Link } from "react-router-dom";

function PurposeIdeas() {
  const [purpose, setPurpose] = useState("");
  const [recommendedIdeas, setRecommendedIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePurposeChange = async (e) => {
    const selectedPurpose = e.target.value;

    setPurpose(selectedPurpose);
    setRecommendedIdeas([]);
    setError("");

    if (!selectedPurpose) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/ideas/purpose/${encodeURIComponent(selectedPurpose)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch ideas");
      }

      const data = await response.json();
      setRecommendedIdeas(data);

    } catch (err) {
      console.error("Error fetching purpose ideas:", err);
      setError("Unable to load ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="purpose-page">
      <Link to="/" className="back-home-btn">
        ← Back to home
      </Link>

      <h1>Find Ideas By Purpose</h1>

      <p>Select your purpose to discover creative DIY ideas.</p>

      <select value={purpose} onChange={handlePurposeChange}>
        <option value="">Select Your Purpose</option>
        <option value="Home Decor">Home Decor</option>
        <option value="Gifts">Gifts</option>
        <option value="College Projects">College Projects</option>
        <option value="Gardening">Gardening</option>
      </select>

      {loading && <p>Loading ideas...</p>}

      {error && <p>{error}</p>}

      {purpose && !loading && !error && (
        <div className="purpose-results">
          <h2>Recommended Ideas for {purpose}</h2>

          {recommendedIdeas.length > 0 ? (
            recommendedIdeas.map((idea, index) => (
              <div className="purpose-card" key={idea.idea_id || index}>
                <h3>{idea.idea_title}</h3>
                <p>Material: {idea.material_name}</p>
                <p>Estimated Cost: ₹{idea.estimated_cost}</p>
                <p>Purpose: {idea.purpose}</p>
              </div>
            ))
          ) : (
            <p>No ideas found for this purpose.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PurposeIdeas;
