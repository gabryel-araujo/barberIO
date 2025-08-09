self.addEventListener("install", (event) => {
  console.log("[SW] Instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Ativado");
});


