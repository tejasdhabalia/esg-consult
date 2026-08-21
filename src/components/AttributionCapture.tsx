"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Runs captureAttribution once, as early as possible in the session.
 *
 * Rendered in the root layout so it fires on whichever page the visitor
 * happens to land on, which is usually an article rather than the homepage.
 * Renders nothing.
 */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
