"use client";

import { useEffect, useState } from "react";

export function TranslateButton() {
  const [translated, setTranslated] = useState(false);

  useEffect(() => {
    setTranslated(document.cookie.includes("googtrans=/es/en"));

    // Load Google Translate script (reads cookie on init)
    if (!document.getElementById("gt-script")) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "es", autoDisplay: false },
          "google_translate_element"
        );
      };
      const script = document.createElement("script");
      script.id = "gt-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  function handleClick() {
    if (translated) {
      // Clear cookie and reload to restore original
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
    } else {
      // Set cookie to translate to English and reload
      document.cookie = "googtrans=/es/en; path=/";
      document.cookie = "googtrans=/es/en; path=/; domain=." + window.location.hostname;
    }
    window.location.reload();
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="rounded border border-neutral-300 px-2 py-0.5 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-900"
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
