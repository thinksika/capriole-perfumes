import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: { default: 'Admin | Capriole Perfumes', template: '%s | Admin | Capriole Perfumes' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide public site chrome on all admin pages */}
      <style>{`
        body > header,
        body > footer,
        .whatsapp-float,
        [class*="drawer"],
        [class*="Drawer"] { display: none !important; }
        body > main { padding-top: 0 !important; }

        /* Admin form inputs */
        .admin-main input:not([type="checkbox"]):not([type="radio"]),
        .admin-main select,
        .admin-main textarea {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid #2a2a2a;
          color: #F0EBE0;
          padding: 0.6rem 0.75rem;
          font-size: 0.8rem;
          font-family: DM Sans, system-ui, sans-serif;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
          border-radius: 0;
          -webkit-appearance: none;
        }
        .admin-main input:focus,
        .admin-main select:focus,
        .admin-main textarea:focus {
          border-color: #C5A15A;
        }
        .admin-main input::placeholder,
        .admin-main textarea::placeholder {
          color: #3a3a3a;
        }
        .admin-main select option {
          background: #101010;
          color: #F0EBE0;
        }
        .admin-main textarea {
          resize: vertical;
          min-height: 80px;
        }
        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          overflow-x: hidden;
          min-height: 100vh;
        }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#070707' }}>
        <AdminSidebar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </>
  )
}
