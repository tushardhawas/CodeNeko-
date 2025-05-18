import { GithubIcon, TwitterIcon, LinkedinIcon, HeartIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme-provider";
import catMascotLight from "@/assets/cat-mascot-enhanced.svg";
import catMascotDark from "@/assets/cat-mascot-dark.svg";

export function Footer() {
  const { theme } = useTheme();
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  return (
    <footer className="relative border-t py-12 overflow-hidden">
      {/* Code symbols */}
      <div className="code-symbols pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="absolute left-[10%] top-[20%]">
          <div className="code-symbol float" style={{ animationDelay: "0.3s" }}>{"{"}</div>
        </div>
        <div className="absolute right-[10%] bottom-[20%]">
          <div className="code-symbol float" style={{ animationDelay: "1.2s" }}>{"}"}</div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 fade-in-left">
            <img src={catMascot} alt="CodeNeko" className="h-10 w-10 hover-scale" />
            <span className="text-xl font-bold">CodeNeko</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 fade-in-up">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Home
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Features
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Blog
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4 fade-in-right">
            <a
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground fade-in-up delay-300">
          <p>© {new Date().getFullYear()} CodeNeko. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            <span className="text-xs">Made with</span>
            <HeartIcon className="h-3 w-3 text-primary animate-pulse-slow" />
            <span className="text-xs">for developers everywhere</span>
          </p>
          <p className="mt-1">
            <span className="text-xs italic">It's not just a tracker. It's a habit. It's your coding companion.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
