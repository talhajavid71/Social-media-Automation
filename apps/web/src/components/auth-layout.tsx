import Link from 'next/link';
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="auth-shell">
    <section className="auth-art">
      <Link className="brand" href="/">NextServe Social AI</Link>
      <div className="auth-copy"><div className="eyebrow">One command. A month of marketing.</div><h1>Your always-on AI marketing manager.</h1><p>Build campaigns, create content, schedule every post, and understand what performs—inside one focused workspace.</p></div>
      <small>Built for ambitious agencies and local brands.</small>
    </section>
    <section className="auth-panel">{children}</section>
  </main>;
}
