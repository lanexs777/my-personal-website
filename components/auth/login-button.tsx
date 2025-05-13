import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';

export function LoginButton() {
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleLogin} variant="outline">
      Sign in with Google
    </Button>
  );
}