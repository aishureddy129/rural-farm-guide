import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export const Route = createFileRoute(
  "/login",
)({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [checkingSession, setCheckingSession] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* =========================================================
     CHECK EXISTING CITIZEN LOGIN
  ========================================================= */

  useEffect(() => {
    async function checkExistingSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate({
          to: "/assistant",
        });

        return;
      }

      setCheckingSession(false);
    }

    void checkExistingSession();
  }, [navigate]);

  /* =========================================================
     LOGIN / SIGNUP
  ========================================================= */

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      /* =====================================================
         SIGN UP
      ===================================================== */

      if (isSignup) {
        const {
          error: signupError,
          data,
        } =
          await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                full_name: name.trim(),
              },
            },
          });

        if (signupError) {
          throw signupError;
        }

        /*
         * If Supabase immediately creates a session,
         * go directly to the citizen application.
         */

        if (data.session) {
          navigate({
            to: "/assistant",
          });

          return;
        }

        /*
         * If email confirmation is enabled,
         * show the message.
         */

        setMessage(
          "Account created successfully! You can now log in.",
        );

        setIsSignup(false);
        setPassword("");

        return;
      }

      /* =====================================================
         LOGIN
      ===================================================== */

      const {
        data,
        error: loginError,
      } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        throw loginError;
      }

      if (!data.user) {
        setError(
          "Login failed. Please try again.",
        );

        return;
      }

      /* =====================================================
         CITIZEN LOGIN SUCCESS
      ===================================================== */

      navigate({
        to: "/assistant",
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Something went wrong. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     CHECKING SESSION SCREEN
  ========================================================= */

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            G
          </div>

          <p className="text-sm text-muted-foreground">
            Checking your login...
          </p>

        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background px-4 py-12">

      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">

        <div className="w-full rounded-2xl border bg-card p-6 shadow-lg sm:p-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              G
            </div>

            <h1 className="text-2xl font-bold text-foreground">
              {isSignup
                ? "Create your account"
                : "Welcome to GramSahay AI"}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {isSignup
                ? "Create an account to use GramSahay AI"
                : "Login to your GramSahay AI account"}
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =================================================
                FULL NAME
            ================================================= */}

            {isSignup && (
              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                />

              </div>
            )}

            {/* =================================================
                EMAIL
            ================================================= */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
              />

            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete={
                  isSignup
                    ? "new-password"
                    : "current-password"
                }
                required
                minLength={6}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
              />

              {isSignup && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Password must be at least 6 characters.
                </p>
              )}

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {message && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isSignup
                  ? "Create Account"
                  : "Login"}
            </button>

          </form>

          {/* =================================================
              SIGNUP / LOGIN SWITCH
          ================================================= */}

          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
                setMessage("");
              }}
              className="text-sm font-medium text-primary hover:underline"
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Create one"}
            </button>

          </div>

          {/* =================================================
              BACK
          ================================================= */}

          <div className="mt-6 border-t pt-5 text-center">

            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/",
                })
              }
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to GramSahay AI
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}