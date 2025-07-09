import React from 'react';
import { X } from 'lucide-react';

interface PromotionBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="font-semibold text-sm md:text-base">
            🔥 Promoção Especial! Desconto de 10% em todos os produtos! 🔥
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Fechar banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};