import { ref, set, get, push, remove, update, onValue, off } from 'firebase/database';
import { database } from './config';

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
  async getAllProducts(): Promise<Product[]> {
    const snapshot = await get(ref(database, 'products'));
    if (snapshot.exists()) {
      const products = snapshot.val();
      return Object.keys(products).map(key => ({
        id: key,
        ...products[key]
      }));
    }
    return [];
  },

  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    const newProductRef = push(ref(database, 'products'));
    await set(newProductRef, product);
    return newProductRef.key!;
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    await update(ref(database, `products/${id}`), product);
  },

  async deleteProduct(id: string): Promise<void> {
    await remove(ref(database, `products/${id}`));
  },

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
  async getAllOfertas(): Promise<Oferta[]> {
    const snapshot = await get(ref(database, 'ofertas'));
    if (snapshot.exists()) {
      const ofertas = snapshot.val();
      return Object.keys(ofertas).map(key => ({
        id: key,
        ...ofertas[key]
      }));
    }
    return [];
  },

  async addOferta(oferta: Omit<Oferta, 'id'>): Promise<string> {
    const newOfertaRef = push(ref(database, 'ofertas'));
    await set(newOfertaRef, oferta);
    return newOfertaRef.key!;
  },

  async updateOferta(id: string, oferta: Partial<Oferta>): Promise<void> {
    await update(ref(database, `ofertas/${id}`), oferta);
  },

  async deleteOferta(id: string): Promise<void> {
    await remove(ref(database, `ofertas/${id}`));
  },

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
  async getAllPromotions(): Promise<Promotion[]> {
    const snapshot = await get(ref(database, 'promotions'));
    if (snapshot.exists()) {
      const promotions = snapshot.val();
      return Object.keys(promotions).map(key => ({
        id: key,
        ...promotions[key]
      }));
    }
    return [];
  },

  async addPromotion(promotion: Omit<Promotion, 'id'>): Promise<string> {
    const newPromotionRef = push(ref(database, 'promotions'));
    await set(newPromotionRef, promotion);
    return newPromotionRef.key!;
  },

  async updatePromotion(id: string, promotion: Partial<Promotion>): Promise<void> {
    await update(ref(database, `promotions/${id}`), promotion);
  },

  async deletePromotion(id: string): Promise<void> {
    await remove(ref(database, `promotions/${id}`));
  },

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