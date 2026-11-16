import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";



function Home() {
  
  const [search, setSearch] = useState("");

  const materials = [
    {
      id: 1,
      name: "Plastic Bottles",
      image: "/images/plastic.jpg",
      description: "Create beautiful flower pots from plastic bottles.",
      color: "pink",
    },
    {
      id: 2,
      name: "Paper Crafts",
      image: "/images/paper.jpg",
      description: "Turn old paper into beautiful handmade crafts.",
      color: "blue",
    },
    {
      id: 3,
      name: "Cardboard",
      image: "/images/cardboard.jpg",
      description: "Make useful organizers using cardboard boxes.",
      color: "purple",
    },
    {
      id: 4,
      name: "Glass Bottles",
      image: "/images/glassbottles.jpg",
      description: "Transform glass bottles into home decorations.",
      color: "peach",
    },
  ];

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <a href="#home" className="logo">
          🌸 NaviKalpana
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#materials">Materials</a>
          <a href="#ideas">Ideas</a>
          <Link to="/budgetideas">Budget Ideas</Link>
          <Link to="/purposeideas">Purpose Ideas</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

       <Link to="/login">Login</Link>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">

          <span className="tagline">
            ♻️ THINK GREEN, CREATE SMART
          </span>

          <h1>
            Turn Waste Into
            <span> Creative Ideas!</span>
          </h1>

          <p>
            Don't throw it away, give it a new life!
            Discover creative ways to reuse unused
            materials and turn them into something beautiful.
          </p>

          <a href="#materials" className="explore-btn">
            Explore Materials →
          </a>

          <div className="hero-stats">
            <span>🌱 Save Nature</span>
            <span>💡 Be Creative</span>
            <span>♻️ Reuse More</span>
          </div>

        </div>

        <div className="hero-image">
          <img
            src="/images/hero.jpg"
            alt="Creative handmade recycled products"
          />
          <div className="image-caption">
            <h3>Reuse. Recycle. Reimagine.</h3>
            <p>Small ideas, Big impact!</p>
          </div>
        </div>

      </section>

     {/* About Section */}
<section className="about" id="about">

  <div className="about-image">
    <img
      src="/images/glass.jpg"
      alt="Creative handmade recycled crafts"
    />
  </div>

  <div className="about-content">

    <span className="section-tag">ABOUT NAVIKALPANA</span>

    <h2>
      Give Waste a <span>Beautiful New Life!</span>
    </h2>

    <p>
      NaviKalpana helps you discover creative ways
      to reuse waste materials. Select unused materials,
      explore innovative ideas and create useful products
      while protecting our environment.
    </p>

    <div className="about-highlights">
      <span>♻️ Reuse</span>
      <span>🌱 Recycle</span>
      <span>💡 Create</span>
    </div>

  </div>

</section>

      {/* Material Section */}
      <section className="materials-section" id="materials">

        <span className="section-tag">DISCOVER & CREATE</span>

        <h2>Explore Your Materials</h2>

        <p className="section-description">
          What waste materials do you have?
          Search and discover new possibilities!
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search materials... e.g. Plastic, Paper"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span>🔍</span>

        </div>

        <div className="material-grid">

          {filteredMaterials.length > 0 ? (

            filteredMaterials.map((material) => (

              <div
                className={`material-card ${material.color}`}
                key={material.id}
              >

                <img
                  src={material.image}
                  alt={material.name}
                  className="material-image"
                />

                <div className="material-info">

                  <h3>{material.name}</h3>

                  <p>{material.description}</p>

                  <Link to="/ideas" state={{
                    material:material.name
                  }}
                  className="card-btn">Explore Ideas</Link>

                </div>

              </div>

            ))

          ) : (

            <p className="no-results">
              No materials found. Try another search!
            </p>

          )}

        </div>

      </section>

      {/* Ideas Section */}
      <section className="ideas-section" id="ideas">

        <span className="section-tag">OUR BENEFITS</span>

        <h2>Why Choose NaviKalpana?</h2>

        <div className="ideas-grid">

          <div className="idea-card">
            <span>♻️</span>
            <h3>Reduce Waste</h3>
            <p>
              Help reduce waste by reusing unused materials.
            </p>
          </div>

          <div className="idea-card">
            <span>💡</span>
            <h3>Creative Ideas</h3>
            <p>
              Discover innovative DIY project ideas.
            </p>
          </div>

          <div className="idea-card">
            <span>💰</span>
            <h3>Save Money</h3>
            <p>
              Create useful products with a small budget.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="footer">

        <h2>🌸 NaviKalpana</h2>

        <p>Turn Waste into Creative Ideas!</p>

        <p className="copyright">
          © 2026 NaviKalpana. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;
