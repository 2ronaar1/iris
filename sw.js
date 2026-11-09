// I.R.I.S App: holt die Seite immer frisch vom Server (am HTTP-Zwischenspeicher vorbei), ohne Netz aus dem Speicher.
// API-Aufrufe (Anthropic, ElevenLabs) werden nie gespeichert.
const SPEICHER='iris-app-v13.5b';
const SCHALE=['./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./favicon.ico'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SPEICHER).then(c=>c.addAll(SCHALE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==SPEICHER).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 const seite=r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
 e.respondWith(fetch(r,{cache:seite?'no-store':'no-cache'}).then(a=>{if(a.ok){const k=a.clone();caches.open(SPEICHER).then(c=>c.put(seite?'./index.html':r,k))}return a}).catch(()=>caches.match(seite?'./index.html':r)))});
