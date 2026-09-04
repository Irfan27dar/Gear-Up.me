import type { Metadata } from 'next';
import { AuthForm } from '@/components/account/AuthForm';

export const metadata: Metadata = { title: 'Create account', robots: { index: false } };

export default function RegisterPage() {
  return (
    <div className="shell flex justify-center py-16">
      <AuthForm mode="register" />
    </div>
  );
}
