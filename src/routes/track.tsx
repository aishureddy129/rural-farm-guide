import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/track")({
  component: TrackRedirect,
});

function TrackRedirect() {
  useEffect(() => {
    const query = window.location.search;

    window.location.replace(`/tracking${query}`);
  }, []);

  return null;
}