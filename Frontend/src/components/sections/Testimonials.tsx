import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Frontend Developer",
    content: "CodeNeko helped me realize I was spending too much time debugging and not enough time planning. The weekly insights are game-changing!",
    avatar: "AC",
    delay: "delay-100",
  },
  {
    name: "Sarah Johnson",
    role: "Full Stack Engineer",
    content: "I love how the cat mascot celebrates my coding streaks. It's a small thing, but it keeps me motivated to code every day.",
    avatar: "SJ",
    delay: "delay-300",
  },
  {
    name: "Miguel Rodriguez",
    role: "Software Architect",
    content: "The language usage stats helped me identify that I needed to diversify my skills. Now I'm learning Rust thanks to CodeNeko's suggestions.",
    avatar: "MR",
    delay: "delay-500",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-500/5 to-primary/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '10s' }}></div>
      </div>

      {/* Code symbols */}
      <div className="code-symbols pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[40%]">
          <div className="code-symbol float-rotate" style={{ animationDelay: "1.5s" }}>{'"'}</div>
        </div>
        <div className="absolute right-[5%] bottom-[30%]">
          <div className="code-symbol float" style={{ animationDelay: "2.5s" }}>{'"'}</div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="fade-in-up mb-4 text-3xl font-bold md:text-4xl">What Developers Say</h2>
          <p className="fade-in-up delay-100 mx-auto max-w-2xl text-lg text-muted-foreground">
            Hear from developers who've improved their coding habits with CodeNeko.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`fade-in-right hover-lift overflow-hidden ${testimonial.delay}`}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <Avatar className="border-2 border-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="relative">
                  <QuoteIcon className="absolute -left-1 -top-1 h-5 w-5 text-primary/20" />
                  <p className="pl-4 text-muted-foreground">{testimonial.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
