import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton } from '@/components/logout-button';

type User = { id: string; name: string; email: string; role: string };
async function currentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}/auth/me`, { headers: { cookie: cookieStore.toString() }, cache: 'no-store' });
    if (!response.ok) return null;
    return (await response.json()).user;
  } catch { return null; }
}

export default async function DashboardPage() {
  const user = await currentUser(); if (!user) redirect('/login');
  const stats = [['Clients','0'],['Pending posts','0'],['Scheduled today','0'],['Published today','0'],['Failed','0']];
  return <main className="dashboard">
    <aside className="sidebar"><div className="brand">NextServe AI</div><nav className="nav"><Link className="active" href="/dashboard">Overview</Link><Link href="#">Clients</Link><Link href="#">Content studio</Link><Link href="#">Calendar</Link><Link href="#">Analytics</Link></nav><div className="userbox"><strong>{user.name}</strong><div style={{color:'#93a69e',fontSize:13,marginTop:5}}>{user.email}</div></div></aside>
    <section className="main"><header className="topbar"><div><div className="eyebrow" style={{color:'var(--green)'}}>Agency overview</div><h1>Good to see you, {user.name.split(' ')[0]}.</h1></div><div className="actions"><button className="btn btn-secondary">+ Add client</button><button className="btn btn-primary">Generate content</button><LogoutButton /></div></header><section className="stats">{stats.map(([label,value])=><article className="stat" key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="workspace"><article className="panel"><h3>Upcoming content</h3><p className="muted">Your scheduled posts will appear here.</p><div className="empty"><div><strong>No posts scheduled yet</strong><p>Create your first AI campaign to fill the calendar.</p><button className="btn btn-primary">Generate first campaign</button></div></div></article><article className="panel"><h3>AI marketing manager</h3><p className="muted">Recommendations based on your activity.</p><div className="empty"><div><strong>Add your first client</strong><p>I’ll start learning their brand and marketing goals.</p></div></div></article></section></section>
  </main>;
}
