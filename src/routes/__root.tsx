import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import appCss from "../styles.css?url";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

import { I18nProvider } from "@/lib/i18n";

import { supabase } from "@/lib/supabase";

import { reportLovableError } from "../lib/lovable-error-reporting";

/* =========================================================
   404 PAGE
========================================================= */

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ERROR PAGE
========================================================= */

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ROOT ROUTE
========================================================= */

export const Route =
  createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()({
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },

        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },

        {
          title:
            "GramSahay AI — Smart Rural Assistance Platform",
        },

        {
          name: "description",
          content:
            "AI guidance, crop diagnosis, government schemes, mandi prices and civic reporting for farmers and rural communities.",
        },

        {
          property: "og:type",
          content: "website",
        },

        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],

      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },

        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },

        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },

        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
        },

        {
          rel: "icon",
          href: "/favicon.ico",
          type: "image/x-icon",
        },

        /* =====================================================
           PWA MANIFEST
        ===================================================== */

        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
      ],
    }),

    shellComponent: RootShell,

    component: RootComponent,

    notFoundComponent: NotFoundComponent,

    errorComponent: ErrorComponent,
  });

/* =========================================================
   ROOT SHELL
========================================================= */

function RootShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}

        <Scripts />
      </body>
    </html>
  );
}

/* =========================================================
   ROOT COMPONENT
========================================================= */

function RootComponent() {
  const { queryClient } =
    Route.useRouteContext();

  const pathname =
    useRouterState({
      select: (state) =>
        state.location.pathname,
    });

  const [checkingAccess, setCheckingAccess] =
    useState(false);

  /* =======================================================
     PUBLIC PAGES
  ======================================================= */

  const publicPaths = [
    "/",
    "/login",
    "/admin-login",
  ];

  const isPublicPage =
    publicPaths.includes(pathname);

  /* =======================================================
     ADMIN PAGE
  ======================================================= */

  const isAdminPage =
    pathname === "/admin";

  const isAdminLoginPage =
    pathname === "/admin-login";

  /* =======================================================
     CITIZEN PAGES
  ======================================================= */

  const citizenPaths = [
    "/assistant",
    "/crop-doctor",
    "/schemes",
    "/weather",
    "/market",
    "/my-farm",
    "/issue-map",
    "/knowledge",
    "/services",
    "/report",
    "/tracking",
  ];

  const isCitizenPage =
    citizenPaths.includes(pathname);

  /* =======================================================
     ACCESS CONTROL
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function checkAccess() {
      /* =====================================================
         PUBLIC PAGES
      ===================================================== */

      if (isPublicPage) {
        setCheckingAccess(false);
        return;
      }

      setCheckingAccess(true);

      try {
        /* ===================================================
           GET CURRENT SUPABASE SESSION
        =================================================== */

        const {
          data: { session },
        } =
          await supabase.auth.getSession();

        /* ===================================================
           ADMIN DASHBOARD
        =================================================== */

        if (isAdminPage) {
          if (!session) {
            if (!cancelled) {
              window.location.href =
                "/admin-login";
            }

            return;
          }

          /* ===============================================
             CHECK ADMIN TABLE
          =============================================== */

          const {
            data: adminUser,
            error: adminError,
          } =
            await supabase
              .from("admin_users")
              .select("user_id")
              .eq(
                "user_id",
                session.user.id,
              )
              .maybeSingle();

          /* ===============================================
             USER IS NOT ADMIN
          =============================================== */

          if (
            adminError ||
            !adminUser
          ) {
            await supabase.auth.signOut();

            if (!cancelled) {
              window.location.href =
                "/admin-login";
            }

            return;
          }

          /* ===============================================
             ADMIN VERIFIED
          =============================================== */

          if (!cancelled) {
            setCheckingAccess(false);
          }

          return;
        }

        /* ===================================================
           CITIZEN PAGES
        =================================================== */

        if (isCitizenPage) {
          if (!session) {
            if (!cancelled) {
              window.location.href =
                "/login";
            }

            return;
          }

          /* ===============================================
             CHECK WHETHER CURRENT USER IS ADMIN
          =============================================== */

          const {
            data: adminUser,
            error: adminError,
          } =
            await supabase
              .from("admin_users")
              .select("user_id")
              .eq(
                "user_id",
                session.user.id,
              )
              .maybeSingle();

          /* ===============================================
             ADMIN TRYING TO OPEN CITIZEN PAGE
          =============================================== */

          if (
            !adminError &&
            adminUser
          ) {
            await supabase.auth.signOut();

            if (!cancelled) {
              window.location.href =
                "/login";
            }

            return;
          }

          /* ===============================================
             NORMAL CITIZEN
          =============================================== */

          if (!cancelled) {
            setCheckingAccess(false);
          }

          return;
        }

        /* ===================================================
           OTHER ROUTES
        =================================================== */

        if (!cancelled) {
          setCheckingAccess(false);
        }
      } catch (error) {
        console.error(
          "ACCESS CHECK ERROR:",
          error,
        );

        /* =================================================
           CITIZEN ACCESS ERROR
        ================================================= */

        if (
          isCitizenPage &&
          !cancelled
        ) {
          window.location.href =
            "/login";

          return;
        }

        /* =================================================
           ADMIN ACCESS ERROR
        ================================================= */

        if (
          isAdminPage &&
          !cancelled
        ) {
          window.location.href =
            "/admin-login";

          return;
        }

        if (!cancelled) {
          setCheckingAccess(false);
        }
      }
    }

    void checkAccess();

    return () => {
      cancelled = true;
    };
  }, [
    pathname,
    isPublicPage,
    isAdminPage,
    isCitizenPage,
  ]);

  /* =======================================================
     CHECKING ACCESS SCREEN
  ======================================================= */

  if (
    checkingAccess &&
    (
      isCitizenPage ||
      isAdminPage
    )
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            G
          </div>

          <p className="text-sm text-muted-foreground">
            Checking access...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ADMIN LOGIN + ADMIN DASHBOARD

     NO CITIZEN HEADER
     NO CITIZEN FOOTER
  ======================================================= */

  if (
    isAdminPage ||
    isAdminLoginPage
  ) {
    return (
      <QueryClientProvider
        client={queryClient}
      >
        <I18nProvider>
          <div className="min-h-screen bg-background">
            <Outlet />
          </div>
        </I18nProvider>
      </QueryClientProvider>
    );
  }

  /* =======================================================
     ROLE SELECTION + CITIZEN LOGIN

     NO SITE HEADER
     NO SITE FOOTER
  ======================================================= */

  if (
    pathname === "/" ||
    pathname === "/login"
  ) {
    return (
      <QueryClientProvider
        client={queryClient}
      >
        <I18nProvider>
          <div className="min-h-screen bg-background">
            <Outlet />
          </div>
        </I18nProvider>
      </QueryClientProvider>
    );
  }

  /* =======================================================
     CITIZEN FEATURES

     HEADER + FOOTER APPEAR ONLY AFTER LOGIN
  ======================================================= */

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <I18nProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />

          <main className="flex-1">
            <Outlet />
          </main>

          <SiteFooter />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}