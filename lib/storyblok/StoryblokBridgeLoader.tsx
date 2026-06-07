"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Loads the Storyblok Visual-Editor bridge ONLY inside the editor iframe
 * (detected by the `_storyblok` query param Storyblok appends). On any editor
 * change it calls router.refresh(), which re-runs the server fetch in Draft
 * Mode — so the headless-rendered page reflects edits live without a manual
 * reload.
 *
 * Outside the editor this renders nothing and loads no script: zero production
 * overhead. Render it once in the [lang] layout.
 */
export function StoryblokBridgeLoader() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("_storyblok")) return;

    const SCRIPT_ID = "storyblok-js-bridge";
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://app.storyblok.com/f/storyblok-v2-latest.js";
    script.async = true;
    script.onload = () => {
      const Bridge = (
        window as unknown as { StoryblokBridge?: new () => {
          on: (events: string[], cb: () => void) => void;
        } }
      ).StoryblokBridge;
      if (!Bridge) return;
      const bridge = new Bridge();
      bridge.on(["input", "published", "change"], () => router.refresh());
    };
    document.body.appendChild(script);
  }, [router]);

  return null;
}
