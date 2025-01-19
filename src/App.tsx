import React, { useState } from 'react';
import { Phone, MapPin, Clock, CreditCard, Truck, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import MISTOIMAGE from './assets/HANBURGES/MISTO.png';
import XDUPLOEGGIMAGE from './assets/HANBURGES/XDUPLO-EGG.png';
import XARRETADOIMAGE from './assets/HANBURGES/XARRETADO.png';
import XBATATABURGAOIMAGE from './assets/HANBURGES/XBATATA-BURGAO.png';
import XBURGUERIMAGE from './assets/HANBURGES/XBURGUER.png';
import XBurguerBACONIMAGE from './assets/HANBURGES/XBURGUER-BACON.png';
import XCALABRESAIMAGE from './assets/HANBURGES/XCALABRESA.png';
import XEGGIMAGE from './assets/HANBURGES/XEGG.png';
import XPRESUNTOImage from './assets/HANBURGES/XPRESUNTO.png';
import HANBURGUERIMAGE from './assets/HANBURGES/HANBURGUER.png';
import XEggBaconImage from './assets/HANBURGES/XEGG-BACON.png';
import BATATAESPECIALIMAGE from './assets/BATATA-ESPECIAL.png';
import BATATASIMPLESIMAGE from './assets/BATATA-SIMPLES.png';
import BISTECAIMAGE from './assets/BISTECA.png';
import BOLOCHOCOLATEIMAGE from './assets/BOLO-CHOCOLATE.png';
import CALDOCOSTELAIMAGE from './assets/CALDO-COSTELA.png';
import CARNESOLIMAGE from './assets/CARNE-SOL.png';
import COXINHAASAIMAGE from './assets/COXINHA-ASA.png';
import CUZCUZPEQUENOIMAGE from './assets/CUZCUZ-PEQUENO.png';
import HOTDOGIMAGE from './assets/HOT-DOG.png';
import SUCOSIMAGE from './assets/SUCOS.png';
import COCACOLA1LIMAGE from './assets/BEBIDAS/COCA-COLA-1L.png';
import GUARANA1LIMAGE from './assets/BEBIDAS/GUARANA-1L.png';
import ITAIPAVA1LIMAGE from './assets/BEBIDAS/ITAIPAVA-473ML.png';
import ITAIPAVA600MLIMAGE from './assets/BEBIDAS/ITAIPAVA-600ML.png';
import SKOL473MLIMAGE from './assets/BEBIDAS/SKOL-473ML.png';
import SKOL600MLIMAGE from './assets/BEBIDAS/SKOL-600ML.png';
import LOGO from './assets/LOGO.png';

interface Item {
  name: string;
  price: number;
  description?: string;
  quantity?: number;
  image?: string;
}

interface CartItem extends Item {
  quantity: number;
}

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  needChange: boolean;
  changeFor?: string;
}

const HANBURGES = [
  { name: 'Misto Quente', price: 6.00, image: MISTOIMAGE, description: 'Pão, Presunto, Queijo e Creme de Requeijão.' },
  { name: 'Hamburguer', price: 7.00, image: HANBURGUERIMAGE, description: 'Pão, Carne, Creme de Requeijão e Salada.' },
  { name: 'X-Burguer', price: 9.00, image: XBURGUERIMAGE, description: 'Pão, Carne, Queijo, Presunto, Maionese e Salada.' },
  { name: 'X-Presunto', price: 9.00, image: XPRESUNTOImage, description: 'Pão, Carne, Queijo e Presunto.' },
  { name: 'X-Egg', price: 9.00, image: XEGGIMAGE, description: 'Pão, Carne, Queijo, Ovo e Salada.' },
  { name: 'X-Calabresa', price: 9.00, image: XCALABRESAIMAGE, description: 'Pão, Linguiça Calabresa, Queijo e Salada.' },
  { name: 'X-Burguer Bacon', price: 10.00, image: XBurguerBACONIMAGE, description: 'Pão, Carne, Queijo, Bacon e Salada.' },
  { name: 'X-Egg Bacon', price: 11.00, image: XEggBaconImage, description: 'Pão, Carne, Queijo, Bacon e Ovo.' },
  { name: 'X-Duplo Egg', price: 14.00, image: XDUPLOEGGIMAGE, description: 'Pão, Duas Carnes, Queijo e Dois Ovos.' },
  { name: 'X-Batata Burgão', price: 13.00, image: XBATATABURGAOIMAGE, description: 'Pão, Carne, Queijo e Batata Palha.' },
  { name: 'X-Arretado', price: 16.00, image: XARRETADOIMAGE, description: 'Pão, Carne, Queijo, Jalapeño e Salada.' }
];

const doces = [
  { name: 'Bolo de Chocolate', price: 5.00, image: BOLOCHOCOLATEIMAGE },
  { name: 'Hot Dog', price: 8.00, image: HOTDOGIMAGE },
];

const petiscos = [
  { name: 'Carne de Sol', price: 27.00, image: CARNESOLIMAGE },
  { name: 'Bisteca', price: 27.00, image: BISTECAIMAGE },
  { name: 'Coxinha da Asa de Frango', price: 27.00, image: COXINHAASAIMAGE },
  { name: 'Caldo de Costela', price: 7.00, image: CALDOCOSTELAIMAGE },
  { name: 'Batata Frita Simples', price: 11.00, image: BATATASIMPLESIMAGE },
  { name: 'Batata Frita Especial', price: 13.00, image: BATATAESPECIALIMAGE },
  { name: 'Cuscuz Grande', price: 11.00 },
  { name: 'Cuscuz Pequeno', price: 9.00, image: CUZCUZPEQUENOIMAGE },
];

const bebidas = [
  { name: 'Suco 500ml', price: 6.00, image: SUCOSIMAGE },
  { name: '1L Guaraná Pet', price: 8.00, image: GUARANA1LIMAGE },
  { name: '1L Coca-Cola Pet', price: 9.00, image: COCACOLA1LIMAGE },
  { name: 'Itaipava 600ml', price: 8.00, image: ITAIPAVA600MLIMAGE },
  { name: 'Skol 600ml', price: 9.00, image: SKOL600MLIMAGE },
  { name: 'Latão Itaipava', price: 5.00, image: ITAIPAVA1LIMAGE },
  { name: 'Latão Skol', price: 6.00, image: SKOL473MLIMAGE }
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    phone: '',
    address: '',
    paymentMethod: '',
    needChange: false,
    changeFor: ''
  });

  const addToCart = (item: Item) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
    toast.success('Item adicionado ao carrinho!');
  };

  const removeFromCart = (itemName: string) => {
    setCart(currentCart => currentCart.filter(item => item.name !== itemName));
    toast.success('Item removido do carrinho!');
  };

  const updateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemName);
      return;
    }
    setCart(currentCart =>
      currentCart.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const total = getTotalPrice();
    const orderMessage = `*Novo Pedido*\n\nCliente: ${orderForm.name}\nTelefone: ${orderForm.phone}\nEndereço: ${orderForm.address}\n\nItens:\n${cart.map(item => `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}\nForma de Pagamento: ${orderForm.paymentMethod}${orderForm.needChange ? `\nTroco para: R$ ${orderForm.changeFor}` : ''}`;
    
    const whatsappUrl = `https://wa.me/+5587996175314?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    setCart([]);
    setIsCheckoutOpen(false);
    toast.success('Pedido enviado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Botão do Carrinho */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center space-x-2"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center">
          {cart.length}
        </span>
      </button>

      {/* Modal do Carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Seu carrinho está vazio</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal de Checkout */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={orderForm.name}
                  onChange={e => setOrderForm({ ...orderForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={orderForm.phone}
                  onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Endereço</label>
                <textarea
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={orderForm.address}
                  onChange={e => setOrderForm({ ...orderForm, address: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Forma de Pagamento</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={orderForm.paymentMethod}
                  onChange={e => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  <option value="PIX">PIX</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão">Cartão</option>
                </select>
              </div>

              {orderForm.paymentMethod === 'Dinheiro' && (
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={orderForm.needChange}
                      onChange={e => setOrderForm({ ...orderForm, needChange: e.target.checked })}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Precisa de troco?</span>
                  </label>
                  
                  {orderForm.needChange && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">Troco para quanto?</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={orderForm.changeFor}
                        onChange={e => setOrderForm({ ...orderForm, changeFor: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Enviar Pedido
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Seção Principal */}
      <header className="relative h-[60vh] bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=3270&auto=format&fit=crop")',
            opacity: 0.6
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center">
            <img src={LOGO} alt='Logo' className='w-32 h-auto mb-4' />
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-yellow-400 shadow-lg">
              ARRETADO BURGUER
            </h1>
            <p className="text-2xl md:text-3xl text-white">
              Os melhores hambúrgueres artesanais da região
            </p>
          </div>
        </div>
      </header>

      {/* Seção de Informações */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <Clock className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Horário</h3>
                <p>18:00 - 23:00</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Truck className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Entrega</h3>
                <p>Taxa R$ 5,00</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CreditCard className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Pagamento</h3>
                <p>PIX, Dinheiro, Cartão</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção do Cardápio */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Cardápio</h2>
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Lanches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {HANBURGES.map((item) => (
                <div key={item.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-48 h-auto object-cover mb-4" />
                  )}
                  <h4 className="text-xl font-semibold">{item.name}</h4>
                  {item.description && (
                    <p className="text-gray-600 text-center mb-2">{item.description}</p>
                  )}
                  <p className="text-3xl text-green-600 font-bold mt-2">R$ {item.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Doces</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {doces.map((doce) => (
                <div key={doce.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                  <h4 className="text-xl font-semibold">{doce.name}</h4>
                  <p className="text-3xl text-green-600 font-bold mt-2">R$ {doce.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => addToCart(doce)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Petiscos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {petiscos.map((petisco) => (
                <div key={petisco.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                  <h4 className="text-xl font-semibold">{petisco.name}</h4>
                  <p className="text-3xl text-green-600 font-bold mt-2">R$ {petisco.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => addToCart(petisco)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Bebidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              {bebidas.map((bebida) => (
                <div key={bebida.name} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                  <h4 className="text-xl font-semibold">{bebida.name}</h4>
                  <p className="text-3xl text-green-600 font-bold mt-2">R$ {bebida.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => addToCart(bebida)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">ARRETADO BURGUER</h2>
              <p className="mt-2">Os melhores hambúrgueres artesanais</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <a 
                href="https://wa.me/+5587996175314"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-400 hover:text-green-300"
              >
                <Phone className="w-5 h-5" />
                <span>(87) 99617-5314</span>
              </a>
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="w-5 h-5" />
                <span>Petrolina, PE</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;