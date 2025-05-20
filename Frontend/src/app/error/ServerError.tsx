import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme-provider';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

export default function ServerError() {
  const { theme } = useTheme();
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <img
        src={catMascot}
        alt="CodeNeko Mascot"
        className="mb-6 h-32 w-32 animate-pulse-slow"
      />
      <h1 className="mb-2 text-4xl font-bold">500 - Server Error</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Oops! Something went wrong on our end. Please try again later.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    </div>
  );
}
