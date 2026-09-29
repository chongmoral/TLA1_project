import { useState, useRef, useEffect } from "react";

const MAX_ATTEMPTS = 3;
const LOCK_SECONDS = 10;

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null); // { type, message } or null
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockSeconds, setLockSeconds] = useState(0);
  const passwordRef = useRef(null);

  const isLocked = lockSeconds > 0;

  // Countdown timer: runs every time lockSeconds changes
  useEffect(() => {
    if (lockSeconds <= 0) return;
    const timer = setTimeout(() => setLockSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer); // cleanup
  }, [lockSeconds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked || isLoading) return;

    setFeedback(null);
    setIsLoading(true);

    // Fake 1-second server delay
    setTimeout(() => {
      const isValid =
        username.trim() === "admin" && password.trim() === "secret123";

      if (isValid) {
        setFeedback({
          type: "success",
          message: "Authentication successful! Redirecting...",
        });
        setTimeout(() => onLoginSuccess(username.trim()), 800);
      } else {
        const newAttempts = attempts + 1;
        setPassword("");

        if (newAttempts >= MAX_ATTEMPTS) {
          setAttempts(0);
          setLockSeconds(LOCK_SECONDS);
          setFeedback({
            type: "warning",
            message: "Too many failed attempts. The form is temporarily locked.",
          });
        } else {
          setAttempts(newAttempts);
          setFeedback({
            type: "danger",
            message: `Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempt(s) left.`,
          });
          passwordRef.current?.focus();
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="card shadow border-0 p-4">
      <div className="text-center mb-4">
        <h1 className="h4 fw-bold">Sign In</h1>
        <p className="text-muted small">
          Enter your portal credentials to continue
        </p>
      </div>

      {feedback && (
        <div className={`alert alert-${feedback.type}`} role="alert">
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label fw-semibold">
            Username
          </label>
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLocked || isLoading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label fw-semibold">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="passwordInput"
              className="form-control"
              placeholder="••••••••"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked || isLoading}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100 py-2 fw-semibold"
          disabled={isLocked || isLoading}
        >
          {isLocked ? (
            `Locked (${lockSeconds}s)`
          ) : isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Authenticating...
            </>
          ) : (
            "Authenticate"
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;