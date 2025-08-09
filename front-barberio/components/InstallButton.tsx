"use client";

import { useEffect, useState } from "react";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false); // começa como false

  useEffect(() => {
    const handler = (e: any) => {
      console.log("🔥 beforeinstallprompt disparado");
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("✅ Usuário aceitou instalar o app");
    } else {
      console.log("❌ Usuário recusou instalar o app");
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <div className="flex items-center justify-center px-4 py-3">
      <Button onClick={handleInstallClick} className="w-full">
        <Download className="mr-2 h-4 w-4" /> Instalar app
      </Button>
    </div>
  );
}
