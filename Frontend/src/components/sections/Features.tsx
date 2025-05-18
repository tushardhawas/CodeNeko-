import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3Icon, ClockIcon, TrophyIcon, BrainCog } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const features = [
  {
    title: "Coding Tracker",
    description: "Track time spent, files/projects, and automatically detect languages.",
    icon: ClockIcon,
  },
  {
    title: "Stats Dashboard",
    description: "Visualize language usage, project hours, and contribution patterns.",
    icon: BarChart3Icon,
  },
  {
    title: "AI Weekly Summary",
    description: "Get AI-powered insights on your progress and improvement areas.",
    icon: BrainCog,
  },
  {
    title: "Gamification Layer",
    description: "Earn XP, unlock achievements, and maintain streaks to stay motivated.",
    icon: TrophyIcon,
  },
];

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

// Keyframes for floating code symbols
const floatingKeyframes = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  @keyframes floatRotate {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }

  .float {
    animation: float 6s ease-in-out infinite;
  }

  .float-rotate {
    animation: floatRotate 8s ease-in-out infinite;
  }

  .code-symbol {
    font-family: monospace;
    font-size: 4rem;
    font-weight: bold;
    opacity: 0.15;
    color: var(--color-primary);
  }
`;

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      {/* Inject keyframes for floating animations */}
      <style dangerouslySetInnerHTML={{ __html: floatingKeyframes }} />

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-primary/5 to-purple-500/5 blur-3xl animate-pulse-slow" style={{ animationDuration: '12s' }}></div>
      </div>

      {/* Code symbols */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[3%] top-[30%]">
          <motion.div
            className="code-symbol float-rotate"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {"{"}
          </motion.div>
        </div>
        <div className="absolute right-[5%] top-[60%]">
          <motion.div
            className="code-symbol float"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {"}"}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            variants={titleVariants}
          >
            Core Features
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            variants={titleVariants}
          >
            Everything you need to track your coding journey and boost productivity.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden border-2 border-border/50 transition-colors hover:border-primary/20 dark:hover:border-primary/20">
                <CardHeader className="pb-2">
                  <motion.div
                    className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "var(--color-primary-20)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
