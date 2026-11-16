
import "./Signup.css";
import React, { useState } from "react";

function Signup() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match!");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            mobile: mobile,
            password: password
          })
        }
      );

      const result = await response.text();

      if (!response.ok) {
        setError(result || "Registration failed!");
        return;
      }

      if (result === "User registered successfully!") {

        setSuccess(result);

        setFullName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");

      } else {
        setError(result);
      }

    } catch (err) {

      setError(
        "Unable to connect to server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-image">
        <div className="signup-image-text">
          <h1>NaviKalpana</h1>
          <p>Turn Waste into Creative Ideas</p>
          <span>Create • Reuse • Inspire</span>
        </div>
      </div>

      <div className="signup-form-section">
        <div className="signup-card">

          <h1>Create Account</h1>
          <p>Join us and start your creative journey!</p>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              minLength="6"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <p className="error-message">{error}</p>
            )}

            {success && (
              <p className="success-message">{success}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
            </button>

          </form>

          <div className="signup-login-text">
            Already have an account?
            <a href="/login"> Login</a>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Signup;
