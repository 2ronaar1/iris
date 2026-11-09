// I.R.I.S App: lädt die Seite immer frisch aus dem Netz (neue Version sofort da), ohne Netz aus dem Speicher.
// API-Aufrufe (Anthropic, ElevenLabs) werden nie gespeichert.
const SPEICHER='iris-app-v13.4';
const SCHALE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./favicon.ico'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SPEICHER).then(c=>c.addAll(SCHALE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==SPEICHER).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(a=>{if(a.ok){const k=a.clone();caches.open(SPEICHER).then(c=>c.put(r,k))}return a}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))))});
