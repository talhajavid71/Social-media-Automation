'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try { await api(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(values) }); router.push('/dashboard'); router.refresh(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to continue.'); }
    finally { setLoading(false); }
  }
  return <div className="auth-card">
    <div className="eyebrow">{mode === 'login' ? 'Welcome back' : 'Start building'}</div>
    <h2>{mode === 'login' ? 'Sign in to your workspace' : 'Create your account'}</h2>
    <p className="muted">{mode === 'login' ? 'Continue managing your clients and campaigns.' : 'Set up your agency workspace in less than a minute.'}</p>
    <form className="form" onSubmit={submit}>
      {error && <div className="alert alert-error">{error}</div>}
      {mode === 'register' && <div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" minLength={2} required autoComplete="name" /></div>}
      <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" minLength={8} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></div>
      <button className="btn btn-primary" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
    </form>
    <div className="form-foot"><span>{mode === 'login' ? <>New here? <Link className="link" href="/register">Create account</Link></> : <>Already registered? <Link className="link" href="/login">Sign in</Link></>}</span>{mode === 'login' && <Link className="link" href="/forgot-password">Forgot password?</Link>}</div>
  </div>;
}
