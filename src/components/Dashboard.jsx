function Dashboard({ username, onLogout }) {
  return (
    <div className="card shadow border-0 p-4 text-center">
      <h1 className="h4 fw-bold">Welcome, {username}!</h1>
      <p className="text-muted small mb-4">
        You are now signed in to the portal.
      </p>
      <button className="btn btn-outline-dark w-100" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Dashboard;