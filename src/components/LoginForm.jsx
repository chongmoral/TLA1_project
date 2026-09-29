import { useState, useRef } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null); // { type, message } or null
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "admin" && password.trim() === "secret123") {
      setFeedback({ type: "success", message: "Authentication successful! Redirecting..." });
    } else {
      setFeedback({ type: "danger", message: "Invalid credentials. Please try again." });
      setPassword("");
      passwordRef.current.focus();
    }
  };

  return (
    <div className="card shadow border-0 p-4">
      <div className="text-center mb-4">
        <h1 className="h4 fw-bold">Sign In</h1>
        <p className="text-muted small">Enter your portal credentials to continue</p>
      </div>

      {feedback && (
        <div className={`alert alert-${feedback.type}`} role="alert">
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label fw-semibold">Username</label>
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label fw-semibold">Password</label>
          <input
            type="password"
            id="passwordInput"
            className="form-control"
            placeholder="••••••••"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 py-2 fw-semibold">
          Authenticate
        </button>
      </form>
    </div>
  );
}

export default LoginForm;