import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TypingAnimation({ text, delay = 50, className = "" }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, delay);
    
    return () => clearInterval(timer);
  }, [text, delay]);
  
  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}
