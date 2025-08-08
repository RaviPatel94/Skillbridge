// app/dashboard/page.tsx
import AuthGuard from '@/components/auth/AuthGuard';
import DashboardContent from '@/components/dashboard/DashboardContent';

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent />
    </AuthGuard>
  );
}