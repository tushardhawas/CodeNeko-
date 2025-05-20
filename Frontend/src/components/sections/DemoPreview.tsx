import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CodeIcon, MousePointerClickIcon } from "lucide-react";

export function DemoPreview() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 bg-muted/50">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-blue-500/5 to-primary/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Code symbols */}
      <div className="code-symbols pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[3%] top-[20%]">
          <div className="code-symbol float" style={{ animationDelay: "0.7s" }}>{"<>"}</div>
        </div>
        <div className="absolute right-[3%] top-[20%]">
          <div className="code-symbol float-rotate" style={{ animationDelay: "1.8s" }}>{"</>"}</div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="fade-in-up mb-4 text-3xl font-bold md:text-4xl">See CodeNeko in Action</h2>
          <p className="fade-in-up delay-100 mx-auto max-w-2xl text-lg text-muted-foreground">
            A glimpse of how CodeNeko helps you track and improve your coding habits.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Dialog>
            <DialogTrigger asChild>
              <div
                className="fade-in-up delay-200 overflow-hidden rounded-xl border bg-card shadow-md transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  cursor: 'pointer'
                }}
              >
                {/* Mock Dashboard UI */}
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Your Coding Stats</h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      This Week
                    </span>
                  </div>

                  <div className="mb-8 space-y-4">
                    <div className="fade-in-left delay-300">
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm font-medium">JavaScript</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="fade-in-left delay-400">
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm font-medium">TypeScript</span>
                        <span className="text-sm text-muted-foreground">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="fade-in-left delay-500">
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm font-medium">CSS</span>
                        <span className="text-sm text-muted-foreground">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="fade-in-up delay-600 rounded-lg bg-muted p-4 text-center hover-scale">
                      <div className="text-2xl font-bold">12.5h</div>
                      <div className="text-sm text-muted-foreground">Total Time</div>
                    </div>
                    <div className="fade-in-up delay-700 rounded-lg bg-muted p-4 text-center hover-scale">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="fade-in-up delay-800 rounded-lg bg-muted p-4 text-center hover-scale">
                      <div className="text-2xl font-bold">850</div>
                      <div className="text-sm text-muted-foreground">XP Earned</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 bg-primary/5 p-4">
                  <MousePointerClickIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Click to see full dashboard</span>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-4xl">
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <CodeIcon className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">CodeNeko Dashboard</h2>
                </div>
                <p className="mb-4">
                  This is a preview of the CodeNeko dashboard. In the full version, you'll be able to:
                </p>
                <ul className="mb-6 list-inside list-disc space-y-2">
                  <li className="fade-in-left delay-100">Track your coding time across different projects</li>
                  <li className="fade-in-left delay-200">See detailed language usage statistics</li>
                  <li className="fade-in-left delay-300">Monitor your daily and weekly streaks</li>
                  <li className="fade-in-left delay-400">Get AI-powered insights about your coding patterns</li>
                  <li className="fade-in-left delay-500">Earn achievements and level up your coding profile</li>
                </ul>
                <Button className="w-full hover-scale">Join the Waitlist</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
