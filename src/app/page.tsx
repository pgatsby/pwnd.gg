"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = (event: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email.trim().toLowerCase() === "test@test.com" && password === "password") {
      setError("");
      router.push("/profile/Tester");
    } else {
      setError("Invalid credentials. Try test@test.com / password.");
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroGraphic}>
          <div className={styles.heroLogo}>PWND.GG</div>
          <p className={styles.heroTagline}>
            The home for competitive gamers. Track your progress, flex your stats, and connect with
            players chasing the podium.
          </p>
        </div>
      </section>

      <section className={styles.authSection}>
        <div className={styles.brandMark}>PWND.GG</div>
        <h1>Happening now</h1>
        <h2>Join the arena today.</h2>

        <div className={styles.socialActions}>
          <button className={`${styles.socialButton} ${styles.google}`}>
            Sign up with Google
          </button>
          <button className={`${styles.socialButton} ${styles.apple}`}>
            Sign up with Apple
          </button>
        </div>

        <div className={styles.divider}>
          <span />
          <p>or</p>
          <span />
        </div>

        <form className={styles.signupForm} onSubmit={handleAuth}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.primaryButton}>
            Create account
          </button>
        </form>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <p className={styles.terms}>
          By signing up, you agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
        </p>

        <div className={styles.loginCard}>
          <p>Already have an account?</p>
          <button type="button" className={styles.secondaryButton} onClick={handleAuth}>
            Sign in
          </button>
        </div>
      </section>
    </div>
  );
}
