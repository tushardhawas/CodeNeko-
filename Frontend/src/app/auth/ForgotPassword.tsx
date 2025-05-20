import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/lib/theme-provider';
import catMascotLight from '@/assets/cat-mascot-enhanced.svg';
import catMascotDark from '@/assets/cat-mascot-dark.svg';

export default function ForgotPassword() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const catMascot = theme === 'dark' ? catMascotDark : catMascotLight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <img src={catMascot} alt="CodeNeko" className="h-16 w-16" />
          <h1 className="text-3xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-4 rounded-lg border border-border p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Check your email</h3>
            <p className="text-muted-foreground">
              We've sent a password reset link to {email}
            </p>
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Back to login</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending reset link...' : 'Send reset link'}
              </Button>
            </form>

            <div className="text-center text-sm">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
