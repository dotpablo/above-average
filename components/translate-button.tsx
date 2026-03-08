"use client";

import { useEffect, useState } from "react";

export function TranslateButton() {
  const [translated, setTranslated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.cookie.includes("googtrans=/es/en")) {
      setTranslated(true);
    }

    if (document.getElementById("gt-script")) {
      setReady(true);
      return;
    }

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "es", autoDisplay: false },
        "google_translate_element"
      );
      setReady(true);
    };

    const script = document.createElement("script");
    script.id = "gt-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  function handleClick() {
    if (translated) {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
    } else {
      document.cookie = "googtrans=/es/en; path=/";
      document.cookie = "googtrans=/es/en; path=/; domain=." + window.location.hostname;
    }
    window.location.reload();
  }

  if (!ready) return null;

  return (
    <>
      <button
        onClick={handleClick}
        className="rounded border border-neutral-700 px-2 py-0.5 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-400 hover:text-white"
        aria-label={translated ? "Ver en español" : "Translate to English"}
      >
        {translated ? "ES" : "EN"}
      </button>
      <div
        id="google_translate_element"
        style={{ position: "absolute", top: -9999, left: -9999, opacity: 0 }}
      />
    </>
  );
}
