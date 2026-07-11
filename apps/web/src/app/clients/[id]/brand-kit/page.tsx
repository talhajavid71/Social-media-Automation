'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Kit={primaryColor:string;secondaryColor:string;accentColor:string;headingFont:string;bodyFont:string;toneOfVoice?:string;targetAudience?:string;brandStory?:string;products:string[];services:string[]};
const empty:Kit={primaryColor:'#176b4b',secondaryColor:'#dfff9e',accentColor:'#13201c',headingFont:'Inter',bodyFont:'Inter',products:[],services:[]};

export default function BrandKit({params}:{params:Promise<{id:string}>}) {
 const[id,setId]=useState(''); const[kit,setKit]=useState(empty); const[saved,setSaved]=useState(false); const[error,setError]=useState('');
 useEffect(()=>{params.then(p=>{setId(p.id);api<Kit|null>(`/clients/${p.id}/brand-kit`).then(k=>k&&setKit(k)).catch(()=>undefined)})},[params]);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setError('');const v=Object.fromEntries(new FormData(e.currentTarget));const data={...v,products:String(v.products||'').split('\n').filter(Boolean),services:String(v.services||'').split('\n').filter(Boolean)};try{setKit(await api<Kit>(`/clients/${id}/brand-kit`,{method:'PUT',body:JSON.stringify(data)}));setSaved(true)}catch{setError('Saving requires the API and database to be running.')}}
 const fields:[keyof Kit,string][]=[['toneOfVoice','Tone of voice'],['targetAudience','Target audience'],['brandStory','Brand story']];
 return <main className="main"><Link className="link" href={`/clients/${id}`}>← Client profile</Link><header className="topbar"><div><div className="eyebrow" style={{color:'var(--green)'}}>Brand intelligence</div><h1>Brand Kit</h1><p className="muted">Give the AI consistent creative direction.</p></div></header>{saved&&<div className="alert alert-success">Brand Kit saved.</div>}{error&&<div className="alert alert-error">{error}</div>}<form className="modal-card form-grid" onSubmit={submit}>{(['primaryColor','secondaryColor','accentColor'] as const).map(n=><div className="field" key={n}><label>{n.replace('Color',' color')}</label><input name={n} type="color" defaultValue={kit[n]}/></div>)}{(['headingFont','bodyFont'] as const).map(n=><div className="field" key={n}><label>{n.replace('Font',' font')}</label><input name={n} defaultValue={kit[n]}/></div>)}{fields.map(([n,l])=><div className="field wide" key={n}><label>{l}</label><textarea name={n} defaultValue={String(kit[n]||'')}/></div>)}<div className="field"><label>Products (one per line)</label><textarea name="products" defaultValue={kit.products.join('\n')}/></div><div className="field"><label>Services (one per line)</label><textarea name="services" defaultValue={kit.services.join('\n')}/></div><button className="btn btn-primary">Save Brand Kit</button></form></main>;
}
