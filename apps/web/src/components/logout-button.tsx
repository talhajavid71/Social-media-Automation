'use client';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
export function LogoutButton() { const router = useRouter(); return <button className="btn btn-secondary" onClick={async()=>{await api('/auth/logout',{method:'POST'});router.push('/login');router.refresh();}}>Sign out</button>; }
