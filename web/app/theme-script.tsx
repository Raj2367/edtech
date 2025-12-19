export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
      if (stored === "dark" || (!stored && prefersDark)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (_) {}
  })();
          `,
      }}
    />
  );
}
