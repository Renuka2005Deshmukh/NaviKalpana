import { useState } from "react";
import "./SmartRecommendation.css";
import { Link } from "react-router-dom";

function SmartRecommendations() {
  const [materialIds, setMaterialIds] = useState([]);
  const [budget, setBudget] = useState(500);
  const [purpose, setPurpose] = useState("Home Decor");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const materials = [
    { id: 1, name: "Plastic Bottles" },
    { id: 2, name: "Paper" },
    { id: 3, name: "Cardboard" },
    { id: 4, name: "Glass Bottles" }
  ];

  const handleMaterialChange = (id) => {
    setMaterialIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleRecommend = async () => {
    if (materialIds.length === 0) {
      alert("Please select at least one material");
      return;
    }

    setLoading(true);
    setIdeas([]);

    try {
      const response = await fetch(
        "http://localhost:8080/api/ideas/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            materialIds,
            budget: Number(budget),
            purpose
          })
        }
      );

      if (!response.ok) {
        throw new Error("Recommendation request failed");
      }

      const data = await response.json();
      setIdeas(data);
    } catch (error) {
      alert("Unable to get recommendations. Check backend.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="smart-page">
      <Link to="/" className="back-home-btn">
        ← Back to home
      </Link>
      <h1>♻️ Smart Reuse Studio</h1>
      <p>Select multiple waste materials and discover creative ideas!</p>

      <h3>Select Materials</h3>

      <div className="smart-materials">
        {materials.map((material) => (
          <label key={material.id}>
            <input
              type="checkbox"
              checked={materialIds.includes(material.id)}
              onChange={() => handleMaterialChange(material.id)}
            />
            {material.name}
          </label>
        ))}
      </div>

      <h3>Your Budget (₹)</h3>
      <input
        type="number"
        min="0"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <h3>Select Purpose</h3>
      <select
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      >
        <option>Home Decor</option>
        <option>Gifts</option>
        <option>College Projects</option>
      </select>

      <button onClick={handleRecommend} disabled={loading}>
        {loading ? "Finding Ideas..." : "Get Smart Recommendations"}
      </button>

      <div className="smart-results">
        {ideas.map((idea) => (
          <div className="smart-card" key={idea.idea_id}>
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <p>Purpose: {idea.purpose}</p>
            <p>Estimated Cost: ₹{idea.estimated_cost}</p>
            <p>Materials: {idea.material_names}</p>
            <p>Difficulty: {idea.difficulty}</p>
          </div>
        ))}

        {!loading && ideas.length === 0 && (
          <p>No recommendations yet. Select materials and click the button.</p>
        )}
      </div>
    </div>
  );
}

export default SmartRecommendations;