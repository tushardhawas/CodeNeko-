import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/lib/theme-provider';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

export function LandingHeader() {
  const { theme } = useTheme();
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  return (
    <header className="border-b border-border/40 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={catMascot} alt="CodeNeko" className="h-10 w-10 hover-scale" />
          <span className="text-xl font-bold">CodeNeko</span>
        </Link>

        <nav className="hidden space-x-6 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/#features" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Features
          </Link>
          <Link to="/app/leaderboard" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Leaderboard
          </Link>
          <Link to="/#about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
