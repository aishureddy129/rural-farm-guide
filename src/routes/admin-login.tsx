import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  type FormEvent,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

/* =========================================================
   ADMIN LOGIN ROUTE
========================================================= */

export const Route = createFileRoute(
  "/admin-login",
)({
  component: AdminLoginPage,
});

/* =========================================================
   ADMIN LOGIN PAGE
========================================================= */

function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     LOGIN
  ======================================================= */

  async function handleLogin(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      /* =================================================
         SIGN IN
      ================================================= */

      const {
        data,
        error: loginError,
      } =
        await supabase.auth.signInWithPassword(
          {
            email: email.trim(),
            password,
          },
        );

      /* =================================================
         LOGIN ERROR
      ================================================= */

      if (loginError) {
        console.error(
          "ADMIN LOGIN ERROR:",
          loginError,
        );

        setError(
          loginError.message,
        );

        return;
      }

      /* =================================================
         USER CHECK
      ================================================= */

      if (!data.user) {
        setError(
          "Login failed. Please try again.",
        );

        return;
      }

      /* =================================================
         ADMIN USER CHECK
      ================================================= */

      const {
        data: adminUser,
        error: adminError,
      } =
        await supabase
          .from("admin_users")
          .select("user_id")
          .eq(
            "user_id",
            data.user.id,
          )
          .maybeSingle();

      /* =================================================
         ADMIN CHECK ERROR
      ================================================= */

      if (adminError) {
        console.error(
          "ADMIN CHECK ERROR:",
          adminError,
        );

        await supabase.auth.signOut();

        setError(
          "Unable to verify admin access.",
        );

        return;
      }

      /* =================================================
         NOT ADMIN
      ================================================= */

      if (!adminUser) {
        await supabase.auth.signOut();

        setError(
          "You do not have admin access.",
        );

        return;
      }

      /* =================================================
         ADMIN VERIFIED
      ================================================= */

      navigate({
        to: "/admin",
      });
    } catch (error) {
      console.error(
        "ADMIN LOGIN EXCEPTION:",
        error,
      );

      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">

        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              G
            </div>

            <h1 className="text-2xl font-bold">
              GramSahay AI
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Admin Login
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Authorized officials only
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div className="space-y-2">

              <label
                htmlFor="admin-email"
                className="text-sm font-medium"
              >
                Email
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                placeholder="Enter admin email"
                autoComplete="email"
                required
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />

            </div>

            {/* PASSWORD */}

            <div className="space-y-2">

              <label
                htmlFor="admin-password"
                className="text-sm font-medium"
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />

            </div>

            {/* ERROR */}

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Checking..."
                : "Login as Admin"}
            </button>

          </form>

          {/* =================================================
              BACK
          ================================================= */}

          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/",
                })
              }
              className="text-sm text-muted-foreground hover:underline"
            >
              Back to GramSahay
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}