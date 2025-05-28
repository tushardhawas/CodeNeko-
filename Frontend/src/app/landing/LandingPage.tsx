import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/lib/theme-provider';
import { animate, stagger } from 'motion';
import {
  ClockIcon,
  BarChart3Icon,
  BrainIcon,
  TrophyIcon,
  CodeIcon,
  HeartIcon,
  GitBranchIcon,
  CalendarIcon,
  ActivityIcon,
  CodepenIcon
} from 'lucide-react';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

export default function LandingPage() {
  const { theme } = useTheme();
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howToUseRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero section
    if (heroRef.current) {
      const title = heroRef.current.querySelector('.hero-title');
      const subtitle = heroRef.current.querySelector('.hero-subtitle');
      const buttons = heroRef.current.querySelectorAll('.hero-button');
      const mascot = heroRef.current.querySelector('.hero-mascot');
      const users = heroRef.current.querySelectorAll('.user-avatar');

      if (title) {
        animate(
          title as HTMLElement,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.8, delay: 0.2 }
        );
      }

      if (subtitle) {
        animate(
          subtitle as HTMLElement,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.8, delay: 0.4 }
        );
      }

      if (buttons.length) {
        animate(
          Array.from(buttons),
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.8, delay: stagger(0.1, { start: 0.6 }) }
        );
      }

      if (mascot) {
        animate(
          mascot as HTMLElement,
          { y: [0, -20, 0] },
          { duration: 4, repeat: Infinity }
        );
      }

      if (users.length) {
        animate(
          Array.from(users),
          { opacity: [0, 1], scale: [0.8, 1] },
          { duration: 0.5, delay: stagger(0.1, { start: 1 }) }
        );
      }
    }

    // Animate stats section
    const handleStatsIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && statsRef.current) {
          const stats = statsRef.current.querySelectorAll('.stat-item');
          animate(
            Array.from(stats),
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.5, delay: stagger(0.1) }
          );
          statsObserver.disconnect();
        }
      });
    };

    // Animate features section
    const handleFeaturesIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && featuresRef.current) {
          const features = featuresRef.current.querySelectorAll('.feature-card');
          animate(
            Array.from(features),
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.5, delay: stagger(0.1) }
          );
          featuresObserver.disconnect();
        }
      });
    };

    // Animate how to use section
    const handleHowToUseIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && howToUseRef.current) {
          const steps = howToUseRef.current.querySelectorAll('.step-card');
          animate(
            Array.from(steps),
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.5, delay: stagger(0.1) }
          );
          howToUseObserver.disconnect();
        }
      });
    };

    // Animate CTA section
    const handleCTAIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && ctaRef.current) {
          const elements = ctaRef.current.querySelectorAll('.cta-animate');
          animate(
            Array.from(elements),
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.5, delay: stagger(0.1) }
          );
          ctaObserver.disconnect();
        }
      });
    };

    const statsObserver = new IntersectionObserver(handleStatsIntersection, { threshold: 0.1 });
    const featuresObserver = new IntersectionObserver(handleFeaturesIntersection, { threshold: 0.1 });
    const howToUseObserver = new IntersectionObserver(handleHowToUseIntersection, { threshold: 0.1 });
    const ctaObserver = new IntersectionObserver(handleCTAIntersection, { threshold: 0.1 });

    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (featuresRef.current) featuresObserver.observe(featuresRef.current);
    if (howToUseRef.current) howToUseObserver.observe(howToUseRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      statsObserver.disconnect();
      featuresObserver.disconnect();
      howToUseObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20 md:py-32">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] left-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl animate-pulse-slow" style={{ animationDuration: '8s' }}></div>
          <div className="absolute -bottom-[30%] right-[20%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/20 to-primary/20 blur-3xl animate-pulse-slow" style={{ animationDuration: '10s' }}></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Cat Mascot */}
            <img
              src={catMascot}
              alt="CodeNeko Mascot"
              className="hero-mascot mb-8 h-32 w-32"
            />

            <h1 className="hero-title mb-4 text-4xl font-bold md:text-6xl">
              Code Better.
            </h1>

            <p className="hero-subtitle mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl">
              Track your coding habits and helps you become a better developer.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/app/leaderboard" className="hero-button">
                <Button size="lg" className="gap-2">
                  Leaderboard
                </Button>
              </Link>
              <Link to="/register" className="hero-button">
                <Button size="lg" variant="outline" className="gap-2">
                  VS Code Extension
                </Button>
              </Link>
            </div>

            {/* User avatars */}
            <div className="flex -space-x-4 mb-2">
              <div className="user-avatar h-12 w-12 rounded-full border-2 border-background bg-muted overflow-hidden">
                <div className="h-full w-full bg-primary/20"></div>
              </div>
              <div className="user-avatar h-12 w-12 rounded-full border-2 border-background bg-muted overflow-hidden">
                <div className="h-full w-full bg-primary/30"></div>
              </div>
              <div className="user-avatar h-12 w-12 rounded-full border-2 border-background bg-muted overflow-hidden">
                <div className="h-full w-full bg-primary/40"></div>
              </div>
              <div className="user-avatar h-12 w-12 rounded-full border-2 border-background bg-muted overflow-hidden">
                <div className="h-full w-full bg-primary/50"></div>
              </div>
              <div className="user-avatar h-12 w-12 rounded-full border-2 border-background bg-muted overflow-hidden">
                <div className="h-full w-full bg-primary/60"></div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Joined by 200+ developers</p>
          </div>
        </div>
      </section>

      {/* Stats Preview Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="stat-item">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Coding Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-3xl font-bold">4h 32m</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    +18% from yesterday
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Today</p>
              </CardContent>
            </Card>

            <Card className="stat-item">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weekly Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-3xl font-bold">21 days</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Personal best!
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>

            <Card className="stat-item">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Coding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Goal: 6h</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">4h 32m completed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Elevate Your Coding</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your progress, compete with friends, and grow as a developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically track your coding time across different projects and languages.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get insights into your coding patterns, most productive hours, and language proficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrophyIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Leaderboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Compete with friends on daily, weekly, and monthly leaderboards.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GitBranchIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Coding Streaks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build and maintain coding streaks similar to GitHub's contribution graph.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Daily Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your daily activity and set goals to improve consistently.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CodepenIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Language Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support for over 50 programming languages and frameworks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-muted-foreground">Developers tracking their time</p>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold mb-2">25.5k+</div>
              <p className="text-muted-foreground">Total coding hours logged</p>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-muted-foreground">Programming languages supported</p>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-bold mb-2">10k+</div>
              <p className="text-muted-foreground">Average daily file tracking events</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section ref={howToUseRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How to Use CodeNeko</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple setup process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="step-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  1
                </div>
                <CardTitle>Register on CodeNeko</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create an account on CodeNeko web app and get your unique API key from your profile.
                </p>
              </CardContent>
            </Card>

            <Card className="step-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  2
                </div>
                <CardTitle>Install VS Code Extension</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Download and install the CodeNeko extension for VS Code. You'll be prompted to enter your API key after installation.
                </p>
              </CardContent>
            </Card>

            <Card className="step-card border-2 border-border/50 transition-colors hover:border-primary/20">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  3
                </div>
                <CardTitle>Verify Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Check your profile on the web app to confirm your extension is connected and tracking your coding time.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-12">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Download the Extension
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="cta-animate text-3xl font-bold mb-4">Ready to level up your coding?</h2>
          <p className="cta-animate text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start tracking your coding time today and join thousands of developers who are improving their coding habits with CodeNeko.
          </p>

          <div className="cta-animate flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Continue with GitHub
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Continue with Twitter
              </Button>
            </Link>
          </div>

          <p className="cta-animate text-sm text-muted-foreground">
            Completely free, forever. No hidden costs.
          </p>
        </div>
      </section>
    </div>
  );
}
