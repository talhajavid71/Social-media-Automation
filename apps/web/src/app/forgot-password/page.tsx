'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth-layout';
import { api } from '@/lib/api';

export default function ForgotPage() {
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try { const result = await api<{ message: string; resetToken?: string }>('/auth/forgot-password', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) }); setMessage(result.resetToken ? `${result.message} Development token: ${result.resetToken}` : result.message); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to continue.'); } finally { setLoading(false); }
  }
  return <AuthLayout><div className="auth-card"><div className="eyebrow">Account recovery</div><h2>Reset your password</h2><p className="muted">Enter your email and we’ll prepare a secure reset link.</p><form className="form" onSubmit={submit}>{error && <div className="alert alert-error">{error}</div>}{message && <div className="alert alert-success">{message}</div>}<div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required /></div><button className="btn btn-primary" disabled={loading}>{loading ? 'Please wait…' : 'Send reset link'}</button></form><div className="form-foot"><Link className="link" href="/login">Back to sign in</Link></div></div></AuthLayout>;
}
