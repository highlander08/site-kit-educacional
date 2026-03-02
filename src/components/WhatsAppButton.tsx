"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    window.open("https://wa.me/85988072122", "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
      onClick={openWhatsApp}
      aria-label="Entrar em contato via WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  );
}
