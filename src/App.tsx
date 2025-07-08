import { useState } from 'react';
import { ShoppingCart, X as XIcon, Trash2 as TrashIcon, MapPin, Phone, Clock } from 'lucide-react';
import HEROIMAGE from './assets/HERO.jpeg';
import LOGOIMAGE from './assets/LOGO.png';
import XBURGUERIMAGE from './assets/HANBURGES/XBURGUER.png';
import XBURGUERARRETADOIMAGE from './assets/HANBURGES/XARRETADO.png';
import COCAIMAGE from './assets/BEBIDAS/COCA-COLA-1L.png';
import GUARANAIMAGE from './assets/BEBIDAS/GUARANA-1L.png';
import AGUAIMAGE from './assets/BEBIDAS/SKOL-600ML.png';
import AGUAGASIMAGE from './assets/BEBIDAS/SKOL-473ML.png';
import ACAIIMAGE from './assets/BEBIDAS/SUCOS.png';
import PICOLEIMAGE from './assets/HOT-DOG.png';
import MILKSHAKEIMAGE from './assets/BOLO-CHOCOLATE.png';
import BATATAIMAGE from './assets/BATATA-SIMPLES.png';
import BATATASPECIALIMAGE from './assets/BATATA-ESPECIAL.png';
import ISCADEFRANGOIMAGE from './assets/Petiscos/COXINHA-ASA.png';
import COMBODUPLOIMAGE from './assets/COMBOS/COMBO-DUPLO.png';
import COMBOTRIPLOIMAGE from './assets/COMBOS/COMBO-BAITA-BURGAO.png';
import COMBOARRETAADOIMAGE from './assets/COMBOS/COMBO-ARRETAADO.png';
import { QRCodeSVG } from 'qrcode.react';
import MISTOIMAGE from './assets/HANBURGES/MISTO.png';
import HANBURGUERIMAGE from './assets/HANBURGES/HANBURGUER.png';
import XBATATABURGAOIMAGE from './assets/HANBURGES/XBATATA-BURGAO.png';
import XBURGUERBACONIMAGE from './assets/HANBURGES/XBURGUER-BACON.png';
import XCALABRESAIMAGE from './assets/HANBURGES/XCALABRESA.png';
import XDUPLOEGGIMAGE from './assets/HANBURGES/XDUPLO-EGG.png';
import XEGGIMAGE from './assets/HANBURGES/XEGG.png';
import XEGGBACONIMAGE from './assets/HANBURGES/XEGG-BACON.png';
import XPRESUNTOIMAGE from './assets/HANBURGES/XPRESUNTO.png';
import ITAIPAVA473IMAGE from './assets/BEBIDAS/ITAIPAVA-473ML.png';
import ITAIPAVA600IMAGE from './assets/BEBIDAS/ITAIPAVA-600ML.png';
import CARNESOLIMAGE from './assets/Petiscos/CARNE-SOL.png';
import CALDOIMAGE from './assets/Petiscos/CALDO-COSTELA.png';
import BISTECAIMAGE from './assets/Petiscos/BISTECA.png';
import CUZIMAGE from './assets/CUZCUZ-PEQUENO.png';

interface Item {
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('hamburgueres');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    number: '',
    referencePoint: '',
    paymentMethod: '',
    needChange: false,
    changeFor: '',
    deliveryType: '',
    deliveryFee: 0,
    localidade: '',
  });
  const [showOrderForm, setShowOrderForm] = useState(false);

  const PIX_CODE = "00020126330014BR.GOV.BCB.PIX0111130436084965204000053039865802BR5925LEANDRO VIEIRA NASCIMENTO6012Lagoa grande62070503***63049093";
  const PIX_INFO = {
    nome: "BRUNO OLIVEIRA SILVIA",
    chave: "87996005036",
    cidade: "Lagoa Grande"
  };

  const addToCart = (item: Item) => {
    try {
      setCartItems(prevItems => [...prevItems, {
        name: item.name,
        price: item.price,
        quantity: 1
      }]);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
    }
  };

  const removeFromCart = (itemName: string) => {
    try {
      setCartItems(prevItems => 
        prevItems.filter(item => item.name !== itemName)
      );
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  };

  const updateQuantity = (itemName: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        removeFromCart(itemName);
        return;
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.name === itemName
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  };

  const getTotalPrice = () => {
    try {
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Erro ao calcular total:', error);
      return 0;
    }
  };

  const handleFinishOrder = () => {
    if (cartItems.length === 0) {
      alert('Adicione itens ao carrinho antes de finalizar o pedido');
      return;
    }
    setShowOrderForm(true);
  };

  const handleSubmitOrder = () => {
    try {
      if (!orderForm.name || !orderForm.phone) {
        alert('Por favor, preencha nome e telefone');
        return;
      }

      if (orderForm.deliveryType === 'delivery' && !orderForm.address) {
        alert('Por favor, preencha o endereço para entrega');
        return;
      }

      const deliveryFee = orderForm.deliveryType === 'delivery' ? orderForm.deliveryFee : 0;
      const total = getTotalPrice() + deliveryFee;

      const message = `*🌭 NOVO PEDIDO - HOTDOG DA PRAÇA 🌭*\n\n` +
        `*DADOS DO CLIENTE*\n` +
        `*Nome:* ${orderForm.name}\n` +
        `*Telefone:* ${orderForm.phone}\n` +
        `*Tipo:* ${orderForm.deliveryType === 'delivery' ? '🛵 Entrega' : '🏃 Retirada'}\n` +
        (orderForm.deliveryType === 'delivery' ? `*Endereço:* ${orderForm.address}\n` +
        `*Bairro:* ${orderForm.neighborhood}\n` +
        `*Número:* ${orderForm.number}\n` +
        `*Ponto de Referência:* ${orderForm.referencePoint}\n` : '') +
        '\n*📋 ITENS DO PEDIDO:*\n' +
        cartItems.map(item => 
          `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n') +
        `\n\n*💰 RESUMO DO PEDIDO:*` +
        `\n*Subtotal:* R$ ${getTotalPrice().toFixed(2)}` +
        (orderForm.deliveryType === 'delivery' ? `\n*Taxa de entrega:* R$ ${orderForm.deliveryFee.toFixed(2)}` : '') +
        `\n*Total:* R$ ${total.toFixed(2)}\n\n` +
        `*💳 PAGAMENTO:*\n` +
        `*Forma:* ${
          orderForm.paymentMethod === 'pix' ? '💠 PIX' :
          orderForm.paymentMethod === 'cartao' ? '💳 Cartão' :
          '💵 Dinheiro'
        }` +
        (orderForm.paymentMethod === 'pix' ? 
          `\n*Chave PIX (CPF):* ${PIX_INFO.chave}\n*Nome:* ${PIX_INFO.nome}\n*Cidade:* ${PIX_INFO.cidade}` : '') +
        (orderForm.paymentMethod === 'dinheiro' && orderForm.needChange ? 
          `\n*Troco para:* R$ ${orderForm.changeFor}` : '') +
        '\n\n*⏰ Tempo estimado de entrega: 30-45 minutos*\n' +
        '*📍 Acompanhe seu pedido pelo WhatsApp*';

      window.open(
        `https://wa.me/5587996175314?text=${encodeURIComponent(message)}`,
        '_blank'
      );

      // Limpa o carrinho e fecha o modal
      setCartItems([]);
      setIsCartOpen(false);
      setShowOrderForm(false);
      setOrderForm({
        name: '',
        phone: '',
        address: '',
        neighborhood: '',
        number: '',
        referencePoint: '',
        paymentMethod: '',
        needChange: false,
        changeFor: '',
        deliveryType: '',
        deliveryFee: 0,
        localidade: '',
      });
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao enviar pedido. Tente novamente.');
    }
  };

  const categories = [
    { id: 'bebidas', label: 'Bebidas', icon: ShoppingCart },
    { id: 'lanches', label: 'Lanches', icon: ShoppingCart },
    { id: 'cuscuz', label: 'Cuscuz', icon: ShoppingCart },
    { id: 'combo-salgados', label: 'Combo de Salgados', icon: ShoppingCart },
  ];

  const lanches: Item[] = [
    { name: 'Coxinha de carne seca com queijo', price: 6.00 },
    { name: 'Coxinha de frango cremoso', price: 5.00 },
    { name: 'Enroladinho (Misto, Salsicha)', price: 4.00 },
    { name: 'Hot Dog', price: 8.00 },
    // Pastel P
    { name: 'Pastel P - Carne seca com queijo', price: 7.00 },
    { name: 'Pastel P - Carne moída com queijo', price: 7.00 },
    { name: 'Pastel P - Calabresa com queijo', price: 7.00 },
    { name: 'Pastel P - Frango com queijo', price: 7.00 },
    { name: 'Pastel P - Bacon com queijo', price: 7.00 },
    { name: 'Pastel P - Misto', price: 7.00 },
    { name: 'Pastel P - Queijo', price: 7.00 },
    // Pastel G (sabores e complementos podem ser descritos na descrição)
    { name: 'Pastel G', price: 15.00, description: 'Escolha até 2 sabores: Bacon, Carne moída, Carne seca, Frango, Presunto, Queijo. Até 3 complementos: Azeitona, Catupiry, Cheddar, Cebola, Tomate, Milho.' },
  ];

  const bebidas: Item[] = [
    // 1L
    { name: 'Fanta 1L', price: 10.00 },
    { name: 'Coca-Cola 1L', price: 10.00 },
    { name: 'Cajuína 1L', price: 10.00 },
    { name: 'Guaraná 1L', price: 10.00 },
    // 350ml
    { name: 'Fanta 350ml', price: 5.00 },
    { name: 'Coca-Cola 350ml', price: 5.00 },
    { name: 'Coca Zero 350ml', price: 5.00 },
    { name: 'Guaraná 350ml', price: 5.00 },
    // Sucos 500ml
    { name: 'Suco de Morango 500ml', price: 7.00 },
    { name: 'Suco de Goiaba 500ml', price: 7.00 },
    { name: 'Suco de Graviola 500ml', price: 7.00 },
    { name: 'Suco de Caju 500ml', price: 7.00 },
    { name: 'Suco de Maracujá 500ml', price: 7.00 },
  ];

  const doces: Item[] = [
    { name: 'Bolo de Chocolate', price: 5.00, image: MILKSHAKEIMAGE },
  
  ];

  const cuscuz: Item[] = [
    { name: 'Cuscuz com frango e catupiry', price: 14.00 },
    { name: 'Cuscuz com costela', price: 15.00 },
    { name: 'Cuscuz com calabresa e bacon', price: 16.00 },
  ];

  const petiscos: Item[] = [
    { name: 'Carne de Sol', price: 27.00, image: CARNESOLIMAGE },
    { name: 'Bisteca', price: 27.00, image: BISTECAIMAGE },
    { name: 'Coxinha da Asa de Frango', price: 27.00, image: ISCADEFRANGOIMAGE },
    { name: 'Caldo de Costela', price: 7.00, image: CALDOIMAGE },
    { name: 'Batata Frita Simples', price: 11.00, image: BATATAIMAGE },
    { name: 'Batata Frita Especial', price: 13.00, image: BATATASPECIALIMAGE },
    { name: 'Cuscuz Pequeno', price: 9.00, image: CUZIMAGE },
  ];

  const comboSalgados: Item[] = [
    { name: 'Combo de Salgados', price: 38.00, description: 'Inclui: Coxinha, Pastel, Enroladinho, Batata' },
  ];

  return (
    <div className="min-h-screen bg-zinc-900">
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed top-4 right-4 bg-green-600 text-white p-2 rounded-full shadow-lg z-50 hover:bg-green-700"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </button>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon size={24} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Seu carrinho está vazio</p>
            ) : (
              <>
                {/* Lista de itens */}
                <div className="space-y-4 mb-4">
                  {cartItems.map(item => (
                    <div key={item.name} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-green-600">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulário de pedido */}
                {showOrderForm ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Telefone</label>
                      <input
                        type="text"
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    {orderForm.deliveryType === 'delivery' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Endereço</label>
                          <input
                            type="text"
                            value={orderForm.address}
                            onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bairro</label>
                          <input
                            type="text"
                            value={orderForm.neighborhood}
                            onChange={(e) => setOrderForm(prev => ({ ...prev, neighborhood: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Localidade</label>
                          <select
                            value={orderForm.localidade}
                            onChange={(e) => {
                              const localidade = e.target.value;
                              let taxa = 0;
                              if (localidade === 'Lagoa Grande') taxa = 4;
                              else if (localidade === 'Izacolândia') taxa = 5;
                              setOrderForm(prev => ({ ...prev, localidade, deliveryFee: taxa }));
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          >
                            <option value="">Selecione a localidade</option>
                            <option value="Lagoa Grande">Lagoa Grande</option>
                            <option value="Izacolândia">Izacolândia</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Número</label>
                          <input
                            type="text"
                            value={orderForm.number}
                            onChange={(e) => setOrderForm(prev => ({ ...prev, number: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ponto de Referência</label>
                          <input
                            type="text"
                            value={orderForm.referencePoint}
                            onChange={(e) => setOrderForm(prev => ({ ...prev, referencePoint: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Forma de Pagamento</label>
                      <select
                        value={orderForm.paymentMethod}
                        onChange={(e) => {
                          const method = e.target.value;
                          setOrderForm(prev => ({ ...prev, paymentMethod: method }));
                          if (method === 'dinheiro') {
                            const needsChange = window.confirm('Você precisa de troco?');
                            setOrderForm(prev => ({ ...prev, needChange: needsChange }));
                          }
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="">Selecione uma forma de pagamento</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="cartao">Cartão</option>
                        <option value="pix">PIX</option>
                      </select>
                    </div>
                    {orderForm.needChange && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Valor para troco</label>
                        <input
                          type="text"
                          value={orderForm.changeFor}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, changeFor: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          placeholder="R$ 0,00"
                        />
                      </div>
                    )}
                    {orderForm.paymentMethod === 'pix' && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-bold text-center mb-4">Pagamento PIX</h3>
                        <div className="flex justify-center mb-4">
                          <QRCodeSVG value={PIX_CODE} size={200} />
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="font-semibold text-center">Informações PIX</p>
                          <p><span className="font-medium">Nome:</span> {PIX_INFO.nome}</p>
                          <p><span className="font-medium">Chave PIX (CPF):</span> {PIX_INFO.chave}</p>
                          <p><span className="font-medium">Cidade:</span> {PIX_INFO.cidade}</p>
                          <p className="text-xs text-gray-500 mt-2 text-center">
                            Após realizar o pagamento, clique em "Finalizar Pedido"
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Tipo de Entrega</label>
                      <select
                        value={orderForm.deliveryType}
                        onChange={(e) => {
                          const type = e.target.value;
                          setOrderForm(prev => {
                            let taxa = 0;
                            if (type === 'delivery') {
                              if (prev.neighborhood.trim().toLowerCase() === 'lagoa grande') taxa = 4;
                              else if (prev.neighborhood.trim().toLowerCase() === 'izacolandia' || prev.neighborhood.trim().toLowerCase() === 'izacolândia') taxa = 5;
                            }
                            return { ...prev, deliveryType: type, deliveryFee: taxa };
                          });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="">Selecione um tipo de entrega</option>
                        <option value="delivery">Entrega</option>
                        <option value="retirada">Retirada</option>
                      </select>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">Subtotal:</span>
                        <span className="text-xl font-bold text-green-600">
                          R$ {getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                      {orderForm.deliveryType === 'delivery' && (
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold">Taxa de Entrega:</span>
                          <span className="text-xl font-bold text-green-600">
                            R$ {orderForm.deliveryFee.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">Total:</span>
                        <span className="text-xl font-bold text-green-600">
                          R$ {(getTotalPrice() + orderForm.deliveryFee).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmitOrder}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Finalizar Pedido
                    </button>
                  </div>
                ) : (
                  // ... botão existente para ir para o formulário
                  <button
                    onClick={handleFinishOrder}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Finalizar Pedido
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <section className="relative h-[300px] flex items-center justify-center">
          <div className="absolute inset-0">
            <img src={HEROIMAGE} alt="Hero Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 text-center">
            <img
              src={LOGOIMAGE}
              alt="Logo"
              className="w-28 h-28 mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">HOTDOG DA PRAÇA</h1>
            <div className="text-white space-y-2 max-w-xl mx-auto px-4">
              <div className="grid grid-cols-3 gap-4 text-sm mt-6">
                <div className="flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Rua Principal, 123</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>(87) 99617-5314</span>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>18:00 - 23:00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-zinc-800 sticky top-0 z-10">
          <nav className="max-w-3xl mx-auto px-4 py-2">
            <div className="flex justify-center items-center space-x-8">
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
                    <Icon className="w-4 h-4 mb-0.5" />
                    <span className="text-xs">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <main className="max-w-xl mx-auto px-4 py-6">
          {selectedCategory === 'lanches' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Lanches</h3>
              <div className="space-y-4">
                {lanches.map((item) => (
                  <div key={item.name} className="bg-white p-3 rounded-lg shadow-md">
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">{item.name}</h4>
                    {item.description && (
                      <p className="text-gray-600 mb-2 text-sm text-center">{item.description}</p>
                    )}
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'bebidas' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Bebidas</h3>
              <div className="space-y-4">
                {bebidas.map((item) => (
                  <div key={item.name} className="bg-white p-3 rounded-lg shadow-md">
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">{item.name}</h4>
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'sobremesas' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Sobremesas</h3>
              <div className="space-y-4">
                {doces.map((item) => (
                  <div key={item.name} className="bg-white p-3 rounded-lg shadow-md">
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">{item.name}</h4>
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'cuscuz' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Cuscuz</h3>
              <div className="space-y-4">
                {cuscuz.map((item) => (
                  <div key={item.name} className="bg-white p-3 rounded-lg shadow-md">
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">{item.name}</h4>
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'petiscos' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Petiscos</h3>
              <div className="space-y-4">
                {petiscos.map((item) => (
                  <div key={item.name} className="bg-white p-3 rounded-lg shadow-md">
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">{item.name}</h4>
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'combo-salgados' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Combo de Salgados</h3>
              <div className="space-y-4">
                {comboSalgados.map((item) => (
                  <div key={item.name} className="bg-white p-3 rounded-lg shadow-md">
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">{item.name}</h4>
                    {item.description && (
                      <p className="text-gray-600 mb-2 text-sm text-center">{item.description}</p>
                    )}
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="flex flex-col items-center space-y-3">
              <img src={LOGOIMAGE} alt="Logo" className="w-16 h-16" />
              <div>
                <h2 className="text-xl font-bold text-yellow-400">HOTDOG DA PRAÇA</h2>
                <p className="mt-1 text-sm">Os melhores hambúrgueres artesanais da região</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://wa.me/5587996175314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  <Phone className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>(87) 99617-5314</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Lagoa Grande-PE</span>
                </div>
              </div>
              <p className="text-xs text-gray-400"> 2024 Todos os direitos reservados</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;