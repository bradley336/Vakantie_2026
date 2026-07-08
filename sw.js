const CACHE="evy-manege-v1";
const KERN=["./evy-manege.html","./evy-icon.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(KERN)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request,{ignoreSearch:true}).then(r=>{
      if(r) return r;
      if(e.request.mode==="navigate") return caches.match("./evy-manege.html");
      return fetch(e.request).catch(()=>caches.match("./evy-manege.html"));
    })
  );
});
