// app/signin/page.tsx
import AuthGuard from '@/components/auth/AuthGuard';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <SignInForm />
      </div>
    </AuthGuard>
  );
}