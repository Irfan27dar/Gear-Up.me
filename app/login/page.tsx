import type { Metadata } from 'next';
import { AuthForm } from '@/components/account/AuthForm';

export const metadata: Metadata = { title: 'Sign in', robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="shell flex justify-center py-16">
      <AuthForm mode="login" />
    </div>
  );
}
