import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'fc_theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage may be unavailable (private mode, sandboxed iframe, etc.)
  }
  return 'dark';
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  if (theme === 'light') {
    document.body.classList.add('theme-light');
  } else {
    document.body.classList.remove('theme-light');
  }
};

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Theme toggle button. Persists preference to localStorage under
 * `fc_theme` and applies/removes the `theme-light` body class.
 *
 * Icon shows the *current* state (moon = dark, sun = light); the
 * tooltip describes the action that will happen on click.
 */
export const ThemeToggle = ({ className = '', size = 'md' }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore — preference simply will not persist
    }
  }, [theme]);

  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  const sizing = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      data-theme-state={theme}
      className={`${sizing} inline-flex items-center justify-center border border-white/10 bg-white/[0.02] text-slate-400 transition-colors hover:border-fc-gold/40 hover:text-white ${className}`}
    >
      {theme === 'dark' ? <Moon className={iconSize} /> : <Sun className={iconSize} />}
    </button>
  );
};

export default ThemeToggle;
