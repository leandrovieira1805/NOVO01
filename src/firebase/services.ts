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

// Mock data storage (localStorage fallback)
const getStorageKey = (key: string) => `firebase_mock_${key}`;

// Serviço de Produtos
export const productService = {
  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    try {
      const stored = localStorage.getItem(getStorageKey('products'));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  },

  // Adicionar produto
  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
      const products = await this.getAllProducts();
      const newProduct: Product = {
        id: Date.now().toString(),
        ...product
      };
      products.push(newProduct);
      localStorage.setItem(getStorageKey('products'), JSON.stringify(products));
      return newProduct.id;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  },

  // Atualizar produto
  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    try {
      const products = await this.getAllProducts();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...product };
        localStorage.setItem(getStorageKey('products'), JSON.stringify(products));
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  // Remover produto
  async deleteProduct(id: string): Promise<void> {
    try {
      const products = await this.getAllProducts();
      const filtered = products.filter(p => p.id !== id);
      localStorage.setItem(getStorageKey('products'), JSON.stringify(filtered));
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      throw error;
    }
  },

  // Escutar mudanças em tempo real (mock - usa polling)
  onProductsChange(callback: (products: Product[]) => void): () => void {
    let lastData = '';
    const interval = setInterval(async () => {
      try {
        const products = await this.getAllProducts();
        const currentData = JSON.stringify(products);
        if (currentData !== lastData) {
          lastData = currentData;
          callback(products);
        }
      } catch (error) {
        console.error('Erro ao verificar mudanças:', error);
      }
    }, 1000); // Verifica a cada 1 segundo

    return () => clearInterval(interval);
  }
};

// Serviço de Ofertas
export const ofertaService = {
  // Buscar todas as ofertas
  async getAllOfertas(): Promise<Oferta[]> {
    try {
      const stored = localStorage.getItem(getStorageKey('ofertas'));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao buscar ofertas:', error);
      return [];
    }
  },

  // Adicionar oferta
  async addOferta(oferta: Omit<Oferta, 'id'>): Promise<string> {
    try {
      const ofertas = await this.getAllOfertas();
      const newOferta: Oferta = {
        id: Date.now().toString(),
        ...oferta
      };
      ofertas.push(newOferta);
      localStorage.setItem(getStorageKey('ofertas'), JSON.stringify(ofertas));
      return newOferta.id;
    } catch (error) {
      console.error('Erro ao adicionar oferta:', error);
      throw error;
    }
  },

  // Atualizar oferta
  async updateOferta(id: string, oferta: Partial<Oferta>): Promise<void> {
    try {
      const ofertas = await this.getAllOfertas();
      const index = ofertas.findIndex(o => o.id === id);
      if (index !== -1) {
        ofertas[index] = { ...ofertas[index], ...oferta };
        localStorage.setItem(getStorageKey('ofertas'), JSON.stringify(ofertas));
      }
    } catch (error) {
      console.error('Erro ao atualizar oferta:', error);
      throw error;
    }
  },

  // Remover oferta
  async deleteOferta(id: string): Promise<void> {
    try {
      const ofertas = await this.getAllOfertas();
      const filtered = ofertas.filter(o => o.id !== id);
      localStorage.setItem(getStorageKey('ofertas'), JSON.stringify(filtered));
    } catch (error) {
      console.error('Erro ao remover oferta:', error);
      throw error;
    }
  },

  // Escutar mudanças em tempo real (mock - usa polling)
  onOfertasChange(callback: (ofertas: Oferta[]) => void): () => void {
    let lastData = '';
    const interval = setInterval(async () => {
      try {
        const ofertas = await this.getAllOfertas();
        const currentData = JSON.stringify(ofertas);
        if (currentData !== lastData) {
          lastData = currentData;
          callback(ofertas);
        }
      } catch (error) {
        console.error('Erro ao verificar mudanças:', error);
      }
    }, 1000); // Verifica a cada 1 segundo

    return () => clearInterval(interval);
  }
};

// Serviço de Promoções
export const promotionService = {
  // Buscar todas as promoções
  async getAllPromotions(): Promise<Promotion[]> {
    try {
      const stored = localStorage.getItem(getStorageKey('promotions'));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao buscar promoções:', error);
      return [];
    }
  },

  // Adicionar promoção
  async addPromotion(promotion: Omit<Promotion, 'id'>): Promise<string> {
    try {
      const promotions = await this.getAllPromotions();
      const newPromotion: Promotion = {
        id: Date.now().toString(),
        ...promotion
      };
      promotions.push(newPromotion);
      localStorage.setItem(getStorageKey('promotions'), JSON.stringify(promotions));
      return newPromotion.id;
    } catch (error) {
      console.error('Erro ao adicionar promoção:', error);
      throw error;
    }
  },

  // Atualizar promoção
  async updatePromotion(id: string, promotion: Partial<Promotion>): Promise<void> {
    try {
      const promotions = await this.getAllPromotions();
      const index = promotions.findIndex(p => p.id === id);
      if (index !== -1) {
        promotions[index] = { ...promotions[index], ...promotion };
        localStorage.setItem(getStorageKey('promotions'), JSON.stringify(promotions));
      }
    } catch (error) {
      console.error('Erro ao atualizar promoção:', error);
      throw error;
    }
  },

  // Remover promoção
  async deletePromotion(id: string): Promise<void> {
    try {
      const promotions = await this.getAllPromotions();
      const filtered = promotions.filter(p => p.id !== id);
      localStorage.setItem(getStorageKey('promotions'), JSON.stringify(filtered));
    } catch (error) {
      console.error('Erro ao remover promoção:', error);
      throw error;
    }
  },

  // Escutar mudanças em tempo real (mock - usa polling)
  onPromotionsChange(callback: (promotions: Promotion[]) => void): () => void {
    let lastData = '';
    const interval = setInterval(async () => {
      try {
        const promotions = await this.getAllPromotions();
        const currentData = JSON.stringify(promotions);
        if (currentData !== lastData) {
          lastData = currentData;
          callback(promotions);
        }
      } catch (error) {
        console.error('Erro ao verificar mudanças:', error);
      }
    }, 1000); // Verifica a cada 1 segundo

    return () => clearInterval(interval);
  }
}; 