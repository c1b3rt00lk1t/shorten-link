import { useState, useEffect } from "react";

export function useMatchMedia(query: string) {
  const isBrowser = typeof window !== "undefined";
  const [matches, setMatches] = useState(
    isBrowser ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }
    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query, isBrowser]);
  return matches;
}
