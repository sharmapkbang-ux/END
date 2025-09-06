import './globals.css';
export const metadata = { title: 'LNS Unified' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto p-6">
          <header className="flex items-center justify-between">
            <div className="text-2xl font-bold">LNS — Unified</div>
            <nav className="space-x-4">
              <a className="header-link" href="/">Home</a>
              <a className="header-link" href="/goal">Goals</a>
              <a className="header-link" href="/onboarding">Onboard</a>
              <a className="header-link" href="/dashboard">Dashboard</a>
            </nav>
          </header>
          <main className="mt-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
