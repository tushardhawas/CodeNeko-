import { animate, stagger } from "motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { TypingAnimation } from "@/components/TypingAnimation";
import { PlayIcon, ChevronDownIcon } from "lucide-react";
import catMascotLight from "@/assets/cat-mascot-enhanced.svg";
import catMascotDark from "@/assets/cat-mascot-dark.svg";

export function Hero() {
  const { theme } = useTheme();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const catRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const productivityRef = useRef<HTMLDivElement>(null);

  // Use the appropriate cat mascot based on theme
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  useEffect(() => {
    // Animate the cat mascot floating
    if (catRef.current) {
      animate(
        catRef.current,
        { y: [0, -20, 0] },
        {
          duration: 4,
          repeat: Infinity,
        }
      );
    }

    // Fade in text elements
    if (titleRef.current) {
      animate(
        titleRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, delay: 0.2 }
      );
    }

    if (subtitleRef.current) {
      animate(
        subtitleRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, delay: 0.4 }
      );
    }

    if (ctaRef.current) {
      animate(
        ctaRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, delay: 0.6 }
      );
    }

    // Animate stats counter
    if (statsRef.current) {
      const statItems = Array.from(statsRef.current.children);
      animate(
        statItems,
        { opacity: [0, 1], scale: [0.8, 1] },
        {
          delay: stagger(0.1),
          duration: 0.5,
        }
      );
    }

    // Animate productivity visualization
    if (productivityRef.current) {
      animate(
        productivityRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, delay: 1.0 }
      );

      // Animate the progress bar
      const progressBar = productivityRef.current.querySelector('.progress-bar');
      if (progressBar) {
        animate(
          progressBar as HTMLElement,
          { width: ['0%', '75%'] },
          { duration: 1.5, delay: 1.2 }
        );
      }
    }
  }, []);

  const handleCatClick = () => {
    if (catRef.current) {
      animate(
        catRef.current,
        { rotate: [0, 15, -15, 0] },
        { duration: 0.5 }
      );
      setShowSpeechBubble(prev => !prev);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] left-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-[30%] right-[20%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/20 to-primary/20 blur-3xl animate-pulse-slow" style={{ animationDuration: '10s' }}></div>
      </div>

      {/* Floating code elements */}
      {/* <div className="code-symbols pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[15%]">
          <div className="code-symbol float" style={{ animationDelay: "0s" }}>{"{"}</div>
        </div>
        <div className="absolute right-[8%] bottom-[20%]">
          <div className="code-symbol float" style={{ animationDelay: "1s" }}>{"}"}</div>
        </div>
        <div className="absolute left-[25%] bottom-[10%]">
          <div className="code-symbol float-rotate" style={{ animationDelay: "1.5s" }}>{"/>"}</div>
        </div>
        <div className="absolute right-[20%] top-[12%]">
          <div className="code-symbol float-rotate" style={{ animationDelay: "0.5s" }}>{"</"}</div>
        </div>
        <div className="absolute left-[15%] top-[60%]">
          <div className="code-symbol float" style={{ animationDelay: "2s" }}>{"["}</div>
        </div>
        <div className="absolute right-[15%] top-[40%]">
          <div className="code-symbol float" style={{ animationDelay: "2.5s" }}>{"]"}</div>
        </div>
        <div className="absolute left-[40%] top-[5%]">
          <div className="code-symbol float-rotate" style={{ animationDelay: "3s" }}>{"()"}</div>
        </div>
        <div className="absolute right-[40%] bottom-[5%]">
          <div className="code-symbol float-rotate" style={{ animationDelay: "3.5s" }}>{";"}</div>
        </div>
      </div> */}

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Interactive Cat Mascot */}
          <div
            className="group relative mb-8 h-48 w-48 cursor-pointer transition-transform hover:scale-110"
            onClick={handleCatClick}
          >
            <img
              ref={catRef}
              src={catMascot}
              alt="CodeNeko Mascot"
              className="h-full w-full"
            />

            {/* Speech bubble */}
            {showSpeechBubble && (
              <div className="absolute -right-4 -top-16 w-48 rounded-lg bg-card p-3 shadow-lg">
                <p className="text-sm">Meow! I'll help you code more efficiently!</p>
                <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-card"></div>
              </div>
            )}
          </div>

          <h1
            ref={titleRef}
            className="mb-4 text-4xl font-bold md:text-6xl"
          >
            CodeNeko – The Ultimate Dev Companion
          </h1>

          <p
            ref={subtitleRef}
            className="mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl"
          >
            <TypingAnimation text="Track. Grow. Code. With your personal cat assistant." delay={70} />
          </p>

          {/* Stats Counter */}
          <div
            ref={statsRef}
            className="mb-10 flex flex-wrap justify-center gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Hours Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">30%</div>
              <div className="text-sm text-muted-foreground">Productivity Boost</div>
            </div>
          </div>

          {/* Multiple CTAs */}
          <div ref={ctaRef} className="flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg">
              <PlayIcon className="mr-2 h-4 w-4" /> Watch Demo
            </Button>
          </div>

          {/* Productivity Visualization */}
          <div ref={productivityRef} className="mt-12 w-full max-w-md">
            <div className="mb-2 flex justify-between text-xs">
              <span>Productivity this week</span>
              <span className="text-primary">+27%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="progress-bar h-full rounded-full bg-gradient-to-r from-primary to-purple-500"
                style={{ width: '0%', transition: 'width 1s ease-in-out' }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center">
          <span className="mb-1 text-sm text-muted-foreground">Scroll to explore</span>
          <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
