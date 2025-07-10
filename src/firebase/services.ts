import { 
  ref, 
  set, 
  get, 
  push, 
  remove, 
  update, 
  onValue, 
  off 
} from 'firebase/database';
import { database } from './config';

// Tipos
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  available: boolean;
  category: string;
}

export interface Oferta {
  id: string;
  image: string;
  price: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discountPercent: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

// Serviço de Produtos
export const productService = {
  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    try {
      const snapshot = await get(ref(database, 'products'));
      if (snapshot.exists()) {
        const products = snapshot.val();
        return Object.keys(products).map(key => ({
          id: key,
          ...products[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  },

  // Adicionar produto
  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
      const newProductRef = push(ref(database, 'products'));
      await set(newProductRef, product);
      return newProductRef.key!;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  },

  // Atualizar produto
  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    try {
      await update(ref(database, `products/${id}`), product);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  // Remover produto
  async deleteProduct(id: string): Promise<void> {
    try {
      await remove(ref(database, `products/${id}`));
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      throw error;
    }
  },

  // Escutar mudanças em tempo real
  onProductsChange(callback: (products: Product[]) => void): () => void {
    const productsRef = ref(database, 'products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const products = snapshot.val();
        const productsArray = Object.keys(products).map(key => ({
          id: key,
          ...products[key]
        }));
        callback(productsArray);
      } else {
        callback([]);
      }
    });

    return () => off(productsRef, 'value', unsubscribe);
  }
};

// Serviço de Ofertas
export const ofertaService = {
  // Buscar todas as ofertas
  async getAllOfertas(): Promise<Oferta[]> {
    try {
      const snapshot = await get(ref(database, 'ofertas'));
      if (snapshot.exists()) {
        const ofertas = snapshot.val();
        return Object.keys(ofertas).map(key => ({
          id: key,
          ...ofertas[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar ofertas:', error);
      return [];
    }
  },

  // Adicionar oferta
  async addOferta(oferta: Omit<Oferta, 'id'>): Promise<string> {
    try {
      const newOfertaRef = push(ref(database, 'ofertas'));
      await set(newOfertaRef, oferta);
      return newOfertaRef.key!;
    } catch (error) {
      console.error('Erro ao adicionar oferta:', error);
      throw error;
    }
  },

  // Atualizar oferta
  async updateOferta(id: string, oferta: Partial<Oferta>): Promise<void> {
    try {
      await update(ref(database, `ofertas/${id}`), oferta);
    } catch (error) {
      console.error('Erro ao atualizar oferta:', error);
      throw error;
    }
  },

  // Remover oferta
  async deleteOferta(id: string): Promise<void> {
    try {
      await remove(ref(database, `ofertas/${id}`));
    } catch (error) {
      console.error('Erro ao remover oferta:', error);
      throw error;
    }
  },

  // Escutar mudanças em tempo real
  onOfertasChange(callback: (ofertas: Oferta[]) => void): () => void {
    const ofertasRef = ref(database, 'ofertas');
    
    const unsubscribe = onValue(ofertasRef, (snapshot) => {
      if (snapshot.exists()) {
        const ofertas = snapshot.val();
        const ofertasArray = Object.keys(ofertas).map(key => ({
          id: key,
          ...ofertas[key]
        }));
        callback(ofertasArray);
      } else {
        callback([]);
      }
    });

    return () => off(ofertasRef, 'value', unsubscribe);
  }
};

// Serviço de Promoções
export const promotionService = {
  // Buscar todas as promoções
  async getAllPromotions(): Promise<Promotion[]> {
    try {
      const snapshot = await get(ref(database, 'promotions'));
      if (snapshot.exists()) {
        const promotions = snapshot.val();
        return Object.keys(promotions).map(key => ({
          id: key,
          ...promotions[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar promoções:', error);
      return [];
    }
  },

  // Adicionar promoção
  async addPromotion(promotion: Omit<Promotion, 'id'>): Promise<string> {
    try {
      const newPromotionRef = push(ref(database, 'promotions'));
      await set(newPromotionRef, promotion);
      return newPromotionRef.key!;
    } catch (error) {
      console.error('Erro ao adicionar promoção:', error);
      throw error;
    }
  },

  // Atualizar promoção
  async updatePromotion(id: string, promotion: Partial<Promotion>): Promise<void> {
    try {
      await update(ref(database, `promotions/${id}`), promotion);
    } catch (error) {
      console.error('Erro ao atualizar promoção:', error);
      throw error;
    }
  },

  // Remover promoção
  async deletePromotion(id: string): Promise<void> {
    try {
      await remove(ref(database, `promotions/${id}`));
    } catch (error) {
      console.error('Erro ao remover promoção:', error);
      throw error;
    }
  },

  // Escutar mudanças em tempo real
  onPromotionsChange(callback: (promotions: Promotion[]) => void): () => void {
    const promotionsRef = ref(database, 'promotions');
    
    const unsubscribe = onValue(promotionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const promotions = snapshot.val();
        const promotionsArray = Object.keys(promotions).map(key => ({
          id: key,
          ...promotions[key]
        }));
        callback(promotionsArray);
      } else {
        callback([]);
      }
    });

    return () => off(promotionsRef, 'value', unsubscribe);
  }
}; 