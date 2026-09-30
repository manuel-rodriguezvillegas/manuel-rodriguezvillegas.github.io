// This compiles to a blocking classic script so the saved theme applies before paint.
(() => {
    let saved: string | null = null;
    try {
        saved = localStorage.getItem('preferredTheme');
    } catch {
        // Storage is optional in private or restricted browser contexts.
    }
    const theme = saved === 'dark' || saved === 'light'
        ? saved
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
})();
