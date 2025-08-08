// app/signup/page.tsx
import AuthGuard from '@/components/auth/AuthGuard';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <SignUpForm />
      </div>
    </AuthGuard>
  );
}