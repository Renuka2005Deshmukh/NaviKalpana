
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login failed!");
        return;
      }

      if (result.message === "Login successful!") {

        localStorage.setItem("userId", result.userId);

        setSuccess("Login successful! Welcome to NaviKalpana.");

        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else {
        setError(result.message);
      }

    } catch (err) {
      console.error(err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-image">
        <div className="image-text">
          <h1>NaviKalpana</h1>
          <p>Turn Waste into Creative Ideas</p>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-card">

          <h1>Welcome Back!</h1>
          <p>Login to continue your creative journey.</p>

          <form onSubmit={handleLogin}>

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              minLength="6"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            {error && (
              <p className="error-message">{error}</p>
            )}

            {success && (
              <p className="success-message">{success}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
