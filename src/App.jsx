import { useState, useEffect } from "react";
import Header from "./components/Header";
import CapitalsMap from "./components/CapitalsMap";
import styles from "./App.module.css";

export default function App() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Sync theme classes for custom CSS and ArcGIS Calcite components
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
    root.classList.toggle("calcite-mode-dark", isDark);
    root.classList.toggle("calcite-mode-light", !isDark);
  }, [isDark]);

  // Sync theme classes when OS/browser theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={styles.appShell}>
      <Header isDark={isDark} onToggle={() => setIsDark((prev) => !prev)} />
      <CapitalsMap isDark={isDark} />
    </div>
  );
}
