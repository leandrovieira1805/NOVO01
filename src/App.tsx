import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Coffee, 
  Sandwich, 
  Pizza, 
  IceCream, 
  Wine,
  Star,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  rating?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

// Sample data
const categories: Category[] = [
  { id: 'all', label: 'Todos', icon: Coffee },
  { id: 'bebidas', label: 'Bebidas', icon: Wine },
  { id: 'lanches', label: 'Lanches', icon: Sandwich },
  { id: 'pizzas', label: 'Pizzas', icon: Pizza },
  { id: 'sobremesas', label: 'Sobremesas', icon: IceCream },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Hambúrguer Artesanal',
    price: 25.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'lanches',
    description: 'Hambúrguer com carne artesanal, queijo e molho especial',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    category: 'pizzas',
    description: 'Pizza tradicional com molho de tomate, mussarela e manjericão',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Suco Natural de Laranja',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
    category: 'bebidas',
    description: 'Suco natural de laranja fresquinho',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Brownie com Sorvete',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    category: 'sobremesas',
    description: 'Brownie quente com sorvete de baunilha',
    rating: 4.6
  },
];

const offerProduct = {
  id: 999,
  name: 'Combo Especial',
  originalPrice: 45.90,
  offerPrice: 29.90,
  image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
  description: 'Hambúrguer + Batata + Refrigerante',
  discount: '35% OFF'
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2">🍔 Delivery Express</h1>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>30-45 min</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>Centro da cidade</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-1" />
              <span>(11) 99999-9999</span>
            </div>
          </div>
        </div>
      </header>

      {/* Offer Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 mx-2 mt-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold mb-2">
            {offerProduct.discount}
          </div>
          <img 
            src={offerProduct.image} 
            alt={offerProduct.name}
            className="w-full max-w-xs mx-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
          <h3 className="text-lg font-bold text-gray-900 mt-2">{offerProduct.name}</h3>
          <p className="text-sm text-gray-800 mb-2">{offerProduct.description}</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm line-through text-gray-700">R$ {offerProduct.originalPrice.toFixed(2)}</span>
            <span className="text-xl font-bold text-red-700 animate-pulse block">R$ {offerProduct.offerPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => addToCart({
              id: offerProduct.id,
              name: offerProduct.name,
              price: offerProduct.offerPrice,
              image: offerProduct.image,
              category: 'ofertas',
              description: offerProduct.description
            })}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-bold mt-2 hover:bg-red-700 transition-colors"
          >
            Pedir Agora!
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Categorias</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center p-3 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs mt-1">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  {product.rating && (
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-current" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                  )}
                </div>
                {product.description && (
                  <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-400">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center p-1 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'text-yellow-500'
                      : 'text-white hover:text-yellow-500'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs">{category.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex justify-center px-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-green-600 p-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="text-xl font-bold text-white bg-red-600 px-3 py-2 rounded-full shadow-lg animate-pulse block">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-gray-800 w-full max-w-md rounded-t-lg max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">Carrinho</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-96">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Carrinho vazio</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 bg-gray-700 p-3 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-green-400">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-red-600 hover:bg-red-700 p-1 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-green-600 hover:bg-green-700 p-1 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-xl font-bold text-green-400">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors">
                  Finalizar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}