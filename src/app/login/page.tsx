export default function LoginPage() {
  return (
    <main>
      <h1>Log in</h1>
      <p className="lead">
        Authentication is not wired up yet. This page is a placeholder for
        Supabase Auth.
      </p>

      <div className="placeholder-card">
        <h2>Coming later</h2>
        <p>Email/password or magic-link sign-in via Supabase.</p>
      </div>

      <form aria-label="Login form (disabled)">
        <div className="placeholder-card">
          <label htmlFor="email">
            <strong>Email</strong>
            <br />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              disabled
              style={{ marginTop: "0.5rem", width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>
        <div className="placeholder-card">
          <label htmlFor="password">
            <strong>Password</strong>
            <br />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              disabled
              style={{ marginTop: "0.5rem", width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>
        <button type="submit" className="btn" disabled>
          Sign in (not implemented)
        </button>
      </form>
    </main>
  );
}
