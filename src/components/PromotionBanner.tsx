import React from 'react';
import { X } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discountPercent: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

interface PromotionBannerProps {
  promotions: Promotion[];
  onClose: () => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ promotions, onClose }) => {
  // Filtrar promoções ativas e dentro do período válido
  const activePromotions = promotions.filter(promotion => {
    if (!promotion.active) return false;
    
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    
    return now >= startDate && now <= endDate;
  });

  if (activePromotions.length === 0) return null;

  // Pegar a primeira promoção ativa
  const currentPromotion = activePromotions[0];

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {currentPromotion.image && (
            <img 
              src={currentPromotion.image} 
              alt={currentPromotion.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              🔥 {currentPromotion.title} 🔥
            </h3>
            <p className="text-sm opacity-90">
              {currentPromotion.description}
            </p>
            <p className="text-lg font-bold mt-1">
              {currentPromotion.discountPercent}% DE DESCONTO!
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Fechar banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};