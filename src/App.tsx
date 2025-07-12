import { useState, useEffect } from 'react';
import { ShoppingCart, Settings, X, Plus, Minus, QrCode, Eye, EyeOff } from 'lucide-react';
import { AdminPanel } from './components/AdminPanel';
import { PromotionBanner } from './components/PromotionBanner';
import { productService, ofertaService, promotionService } from './firebase/services';
import { generatePixPayload, getPixInfo } from './utils/pixUtils';
import { QRCodeSVG } from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  available: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

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

interface Oferta {
  id: string;
  image: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPromotionBanner, setShowPromotionBanner] = useState(true);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixQRCode, setPixQRCode] = useState('');
  const [showUnavailable, setShowUnavailable] = useState(false);

  // Helper function to safely format prices
  const formatPrice = (price: any): string => {
    if (price === null || price === undefined || isNaN(price)) {
      return '0.00';
    }
    const numPrice = typeof price === 'number' ? price : parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'lanches', label: 'Lanches' },
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'doces', label: 'Doces' },
    { id: 'cuscuz', label: 'Cuscuz' },
    { id: 'combo-salgados', label: 'Combo de Salgados' }
  ];

  useEffect(() => {
    // Carregar dados iniciais
    loadInitialData();

    // Configurar listeners em tempo real
    const unsubscribeProducts = productService.onProductsChange(setProducts);
    const unsubscribePromotions = promotionService.onPromotionsChange(setPromotions);
    const unsubscribeOfertas = ofertaService.onOfertasChange(setOfertas);

    return () => {
      unsubscribeProducts();
      unsubscribePromotions();
      unsubscribeOfertas();
    };
  }, []);

  const loadInitialData = async () => {
    try {
      const [productsData, promotionsData, ofertasData] = await Promise.all([
        productService.getAllProducts(),
        promotionService.getAllPromotions(),
        ofertaService.getAllOfertas()
      ]);
      
      setProducts(productsData);
      setPromotions(promotionsData);
      setOfertas(ofertasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados do cardápio');
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const availabilityMatch = showUnavailable || product.available;
    return categoryMatch && availabilityMatch;
  });

  const addToCart = (product: Product) => {
    if (!product.available) {
      toast.error('Este produto não está disponível no momento');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Carrinho limpo!');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.price && typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generatePixPayment = () => {
    const total = getTotalPrice();
    if (total <= 0) {
      toast.error('Carrinho vazio!');
      return;
    }

    const pixInfo = getPixInfo();
    const payload = generatePixPayload({
      ...pixInfo,
      amount: total,
      description: `Pedido - ${cart.length} itens`
    });

    setPixQRCode(payload);
    setShowPixModal(true);
  };

  const openAdminPanel = () => {
    const password = prompt('Digite a senha do administrador:');
    if (password === 'admin123') {
      setIsAdminOpen(true);
    } else if (password !== null) {
      alert('Senha incorreta!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />
      
      {/* Promotion Banner */}
      {showPromotionBanner && (
        <PromotionBanner 
          promotions={promotions} 
          onClose={() => setShowPromotionBanner(false)} 
        />
      )}

      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/src/assets/LOGO.png" 
                alt="Hotdog da Praça" 
                className="w-12 h-12 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">Hotdog da Praça</h1>
                <p className="text-gray-300 text-sm">Delícias que conquistam seu paladar</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUnavailable(!showUnavailable)}
                className={`p-2 rounded-full transition-colors ${
                  showUnavailable 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={showUnavailable ? 'Ocultar indisponíveis' : 'Mostrar indisponíveis'}
              >
                {showUnavailable ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full transition-colors"
              >
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <button
                onClick={openAdminPanel}
                className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
              >
                <Settings size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Bem-vindo ao Hotdog da Praça!</h2>
          <p className="text-xl">Os melhores sabores da cidade em um só lugar</p>
        </div>
      </section>

      {/* Ofertas Section */}
      {ofertas.length > 0 && (
        <section className="py-8 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">🔥 Ofertas Especiais 🔥</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ofertas.map((oferta) => (
                <div key={oferta.id} className="bg-gradient-to-br from-red-600 to-orange-600 rounded-lg p-4 text-center shadow-lg">
                  <img 
                    src={oferta.image} 
                    alt="Oferta especial" 
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <div className="text-2xl font-bold text-white">
                    R$ {formatPrice(oferta.price)}
                  </div>
                  <div className="text-sm text-yellow-200 mt-1">Oferta Limitada!</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-6 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                !product.available ? 'opacity-60' : ''
              }`}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {!product.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Indisponível</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                {product.description && (
                  <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-400">
                    R$ {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.available}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      product.available
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-800 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Carrinho</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Seu carrinho está vazio</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 bg-gray-700 p-3 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-yellow-400">R$ {formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-yellow-400">
                    R$ {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={generatePixPayment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                  >
                    <QrCode size={20} />
                    <span>Pagar com PIX</span>
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PIX Payment Modal */}
      {showPixModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pagamento PIX</h3>
              <button
                onClick={() => setShowPixModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCodeSVG value={pixQRCode} size={200} />
              </div>
              <p className="text-sm text-gray-300 mb-2">
                Escaneie o QR Code com seu app do banco
              </p>
              <p className="text-lg font-bold text-yellow-400">
                Total: R$ {formatPrice(getTotalPrice())}
              </p>
              <div className="mt-4 p-3 bg-gray-700 rounded text-xs">
                <p className="text-gray-300">Chave PIX:</p>
                <p className="font-mono break-all">{getPixInfo().key}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProducts={setProducts}
        promotions={promotions}
        onUpdatePromotions={setPromotions}
        ofertas={ofertas}
        onUpdateOfertas={setOfertas}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-6 mt-12">
        <p className="text-gray-400">
          © 2024 Hotdog da Praça. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;