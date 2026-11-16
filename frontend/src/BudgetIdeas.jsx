
import React, { useState } from "react";
import "./BudgetIdeas.css";
import { Link } from "react-router-dom";

function BudgetIdeas() {
  const [budget, setBudget] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBudgetChange = async (e) => {
    const value = e.target.value;

    setBudget(value);
    setIdeas([]);
    setError("");

    if (value === "" || Number(value) <= 0) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/ideas/budget/${value}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch budget ideas");
      }

      const data = await response.json();
      setIdeas(data);

    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="budget-page">

      <Link to="/" className="back-home-btn">
        ← Back to home
      </Link>

      <h1>Find Ideas Within Your Budget</h1>

      <p>
        Enter your budget to discover creative DIY ideas.
      </p>

      <input
        type="number"
        placeholder="Enter your budget (₹)"
        value={budget}
        min="1"
        onChange={handleBudgetChange}
      />

      {loading && <p>Loading ideas...</p>}

      {error && <p className="error-message">{error}</p>}

      {budget !== "" && Number(budget) > 0 && !loading && !error && (
        <div className="budget-results">

          <h2>Recommended Ideas</h2>

          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <div className="budget-card" key={idea.idea_id}>

                <h3>{idea.title}</h3>

                <p>
                  Material: {idea.material_name}
                </p>

                <p>
                  Estimated Cost: ₹{idea.estimated_cost}
                </p>

                <p>
                  Purpose: {idea.purpose}
                </p>

              </div>
            ))
          ) : (
            <p>No ideas found within this budget.</p>
          )}

        </div>
      )}

      {(!budget || Number(budget) <= 0) && (
        <p>Please enter a valid budget.</p>
      )}

    </div>
  );
}

export default BudgetIdeas;
