import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: { default: 'Admin | Capriole Perfumes', template: '%s | Admin | Capriole Perfumes' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide root layout chrome on admin pages */}
      <style>{`
        body > header,
        body > footer,
        .whatsapp-float,
        .drawer { display: none !important; }
        body > main { padding-top: 0 !important; }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#070707' }}>
        <AdminSidebar />
        <main className="admin-main" style={{ padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </>
  )
}

