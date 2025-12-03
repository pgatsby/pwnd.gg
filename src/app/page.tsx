"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useStackApp } from "@stackframe/stack";
import { KnownErrors } from "@stackframe/stack-shared";
import styles from "./page.module.css";

const getReadableError = (error: unknown) => {
  if (!error) return "Something went wrong. Please try again.";
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in error && typeof (error as { message?: string }).message === "string") {
    return (error as { message: string }).message;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "humanReadableMessage" in error &&
    typeof (error as { humanReadableMessage?: string }).humanReadableMessage === "string"
  ) {
    return (error as { humanReadableMessage: string }).humanReadableMessage;
  }
  return "Unable to complete that request. Please try again.";
};

const profileReturnUrl = () =>
  typeof window === "undefined" ? undefined : `${window.location.origin}/profile`;

const shouldAttemptAutoCreate = (error: unknown) =>
  error instanceof KnownErrors.EmailPasswordMismatch || error instanceof KnownErrors.UserNotFound;

export default function Home() {
  const router = useRouter();
  const stackApp = useStackApp();

  const [credentialEmail, setCredentialEmail] = useState("");
  const [credentialPassword, setCredentialPassword] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const sendToProfile = () => router.push("/profile");

  const handleCredentialAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCredentialError("");
    setIsAuthenticating(true);

    const email = credentialEmail.trim();

    try {
      const loginResult = await stackApp.signInWithCredential({
        email,
        password: credentialPassword,
        noRedirect: true,
      });

      if (loginResult.status === "ok") {
        sendToProfile();
        return;
      }

      if (!shouldAttemptAutoCreate(loginResult.error)) {
        setCredentialError(getReadableError(loginResult.error));
        return;
      }

      const signupResult = await stackApp.signUpWithCredential({
        email,
        password: credentialPassword,
        noRedirect: true,
        noVerificationCallback: true,
      });

      if (signupResult.status === "ok") {
        sendToProfile();
      } else {
        setCredentialError(getReadableError(signupResult.error));
      }
    } catch (err) {
      setCredentialError(getReadableError(err));
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setCredentialError("");
    try {
      const returnTo = profileReturnUrl();
      await stackApp.signInWithOAuth(provider, returnTo ? { returnTo } : undefined);
    } catch (err) {
      setCredentialError(getReadableError(err));
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
        <h1>Sign in to PWND.GG</h1>
        <h2>We’ll create your account automatically if you’re new.</h2>

        <div className={styles.socialActions}>
          <button
            type="button"
            className={`${styles.socialButton} ${styles.google}`}
            onClick={() => handleOAuth("google")}
          >
            Continue with Google
          </button>
          <button
            type="button"
            className={`${styles.socialButton} ${styles.apple}`}
            onClick={() => handleOAuth("apple")}
          >
            Continue with Apple
          </button>
        </div>

        <div className={styles.divider}>
          <span />
          <p>or</p>
          <span />
        </div>

        <form className={styles.signupForm} onSubmit={handleCredentialAuth}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={credentialEmail}
              onChange={(e) => setCredentialEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={credentialPassword}
              onChange={(e) => setCredentialPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.primaryButton} disabled={isAuthenticating}>
            {isAuthenticating ? "Working..." : "Continue"}
          </button>
        </form>

        {credentialError && <p className={styles.errorMessage}>{credentialError}</p>}

        <p className={styles.terms}>
          By signing up, you agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
        </p>

        <div className={styles.loginCard}>
          <p>
            Already part of the community? Enter your credentials above to sign in immediately. New
            here? Submit the same form and we’ll spin up your account automatically.
          </p>
        </div>
      </section>
    </div>
  );
}
