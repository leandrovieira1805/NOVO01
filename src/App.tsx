import { useState } from 'react';
import { ShoppingCart, X as XIcon, Trash2 as TrashIcon, MapPin, Phone, Clock } from 'lucide-react';
import { AdminPanel } from './components/AdminPanel';
import { PromotionBanner } from './components/PromotionBanner';
import HEROIMAGE from './assets/HERO.jpeg';
import LOGOIMAGE from './assets/LOGO.png';
import FANTA1L from './assets/BEBIDAS/FANTA-removebg-preview.png';
import COCA1L from './assets/BEBIDAS/COCA-COLA-1L.png';
import GUARANA1L from './assets/BEBIDAS/GUARANA-1L.png';
import FANTALT from './assets/BEBIDAS/FANTA_LT-removebg-preview.png';
import COCAZERO_LT from './assets/BEBIDAS/COCA_ZERO_LT-removebg-preview.png';
import GUARANA_LT from './assets/BEBIDAS/GUARANA_LT-removebg-preview.png';
import SUCO_MORANGO from './assets/BEBIDAS/SUCO_MORANGO-removebg-preview.png';
import SUCO_GOIABA from './assets/BEBIDAS/SUCO_GOIABA-removebg-preview.png';
import SUCO_GRAVIOLA from './assets/BEBIDAS/SUCO_GRAVIOLA-removebg-preview.png';
import SUCO_CAJU from './assets/BEBIDAS/SUCO_CAJU-removebg-preview.png';
import SUCO_MARACUJA from './assets/BEBIDAS/SUCO_MARACUJA-removebg-preview.png';
import COCA_LT from './assets/BEBIDAS/COCA_LT-removebg-preview.png';
import CAJUINA1L from './assets/BEBIDAS/CAJUINA-removebg-preview.png';
import CUSCUZ_FRANGO from './assets/CUSCUZ/CUSCUZ DE FRANGO.jpeg';
import CUSCUZ_COSTELA from './assets/CUSCUZ/CUSCUZ DE COSTELS.jpeg';
import CUSCUZ_CALABRESA from './assets/CUSCUZ/CUSCUZ CALABRESA.jpg';
import TARTALETE from './assets/IMAGEN/TARTALETE.jpeg';
import COXINHA_FRANGO from './assets/IMAGEN/COXINHA DE FRANGO.jpeg';
import CACHORRO_QUENTE from './assets/IMAGEN/CACHORRO QUENTE.jpeg';
import PUDIM from './assets/IMAGEN/PUDIM.jpeg';
import COXINHA_CARNE_SECA from './assets/IMAGEN/COXINHA CARNE SECA.jpeg';
import BOLO_CHOCOLATE from './assets/IMAGEN/BOLO DE CHOCOLATE.jpeg';
import BOLO_SENHORA from './assets/IMAGEN/BOLO DE SENOURA.jpeg';
import COMBO from './assets/IMAGEN/COMBO.jpeg';
import PASTEL_P from './assets/IMAGEN/PASTEL P.jpeg';
import PASTEL_G from './assets/IMAGEN/PASTEL G.jpeg';
import ITAIPAVA_LATAO from './assets/BEBIDAS/Itaipava_latão-removebg-preview.png';
import SKOL_LATAO from './assets/BEBIDAS/Skol_latão-removebg-preview.png';
import BRAHMA_CHOPP from './assets/BEBIDAS/Brahma_chopp-removebg-preview.png';
import BUDWEISER_LONGNECK from './assets/BEBIDAS/Budweiser_long_neck-removebg-preview.png';
import HEINEKEN_LONGNECK from './assets/BEBIDAS/Heineken_long_neck-removebg-preview.png';
import AGUA_COCO from './assets/BEBIDAS/AGUA DE COCO.jpeg';
import H2OH_LIMONETO from './assets/BEBIDAS/H2oh_limoneto-removebg-preview.png';
import ENROLADINHO from './assets/IMAGEN/ENROLADINHO-removebg-preview.png';
import BARCA_COXINHA from './assets/IMAGEN/BARCA DE COXINHA.jpeg';
import BARCA_PASTEL from './assets/IMAGEN/BARCA DE PASTEL.jpeg';
import BATATA_SIMPLES from './assets/IMAGEN/BATATA SIMPLES.jpeg';
import BATATA_COMPLETA from './assets/IMAGEN/BATATA COMPLETA.jpeg';
import { generatePixPayload, getPixInfo } from './utils/pixUtils';

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

interface Product extends Item {
  id: string;
  available: boolean;
  category: string;
  image: string; // Tornar obrigatório para compatibilidade com AdminPanel
  promotion?: {
    active: boolean;
    discountPercent: number;
    originalPrice: number;
  };
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
  const [isPastelGModalOpen, setIsPastelGModalOpen] = useState(false);
  const [pastelGSelections, setPastelGSelections] = useState<{
    sabores: string[];
    complementos: string[];
  }>({
    sabores: [],
    complementos: []
  });
  const [isEnroladinhoModalOpen, setIsEnroladinhoModalOpen] = useState(false);
  const [enroladinhoSabor, setEnroladinhoSabor] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showPromotionBanner, setShowPromotionBanner] = useState(true);

  const ADMIN_PASSWORD = "admin123"; // Altere para uma senha segura
  const pixInfo = getPixInfo();

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

  const handleAdminAccess = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminOpen(true);
      setShowPasswordModal(false);
      setAdminPassword('');
    } else {
      alert('Senha incorreta!');
    }
  };

  // Inicializar produtos com IDs únicos
  useState(() => {
    const productsWithIds: Product[] = [
      ...lanches.map((item, index) => ({ ...item, id: `lanche-${index}`, available: true, category: 'lanches', image: item.image || '' })),
      ...bebidas.map((item, index) => ({ ...item, id: `bebida-${index}`, available: true, category: 'bebidas', image: item.image || '' })),
      ...doces.map((item, index) => ({ ...item, id: `doce-${index}`, available: true, category: 'doces', image: item.image || '' })),
      ...cuscuz.map((item, index) => ({ ...item, id: `cuscuz-${index}`, available: true, category: 'cuscuz', image: item.image || '' })),
      ...comboSalgados.map((item, index) => ({ ...item, id: `combo-${index}`, available: true, category: 'combo-salgados', image: item.image || '' }))
    ];
    setAllProducts(productsWithIds);
  });

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
      // NOVO: Validação da localidade
      if (orderForm.deliveryType === 'delivery' && !orderForm.localidade) {
        alert('Por favor, selecione a localidade para entrega.');
        return;
      }

      const deliveryFee = orderForm.deliveryType === 'delivery' ? orderForm.deliveryFee : 0;
      const total = getTotalPrice() + deliveryFee;

      // Gerar payload PIX para uso futuro se necessário

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
          `\n*Chave PIX (CPF):* ${pixInfo.key}\n*Nome:* ${pixInfo.name}\n*Cidade:* ${pixInfo.city}` : '') +
        (orderForm.paymentMethod === 'dinheiro' && orderForm.needChange ? 
          `\n*Troco para:* R$ ${orderForm.changeFor}` : '') +
        '\n\n*⏰ Tempo estimado de entrega: 30-45 minutos*\n' +
        '*📍 Acompanhe seu pedido pelo WhatsApp*';

      window.open(
        `https://wa.me/55999211477?text=${encodeURIComponent(message)}`,
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

  const handlePastelGSelection = () => {
    if (pastelGSelections.sabores.length === 0) {
      alert('Selecione pelo menos 1 sabor');
      return;
    }
    if (pastelGSelections.sabores.length > 2) {
      alert('Selecione no máximo 2 sabores');
      return;
    }
    if (pastelGSelections.complementos.length > 3) {
      alert('Selecione no máximo 3 complementos');
      return;
    }

    const saboresText = pastelGSelections.sabores.join(', ');
    const complementosText = pastelGSelections.complementos.length > 0 ? ` + ${pastelGSelections.complementos.join(', ')}` : '';
    
    const pastelGItem = {
      name: `Pastel G - ${saboresText}${complementosText}`,
      price: 15.00,
      description: `Sabores: ${saboresText}${complementosText ? ` | Complementos: ${complementosText}` : ''}`
    };

    addToCart(pastelGItem);
    setIsPastelGModalOpen(false);
    setPastelGSelections({ sabores: [], complementos: [] });
  };

  const handleSaboresChange = (sabor: string) => {
    setPastelGSelections(prev => ({
      ...prev,
      sabores: prev.sabores.includes(sabor) 
        ? prev.sabores.filter(s => s !== sabor)
        : prev.sabores.length < 2 
          ? [...prev.sabores, sabor]
          : prev.sabores
    }));
  };

  const handleComplementosChange = (complemento: string) => {
    setPastelGSelections(prev => ({
      ...prev,
      complementos: prev.complementos.includes(complemento)
        ? prev.complementos.filter(c => c !== complemento)
        : prev.complementos.length < 3
          ? [...prev.complementos, complemento]
          : prev.complementos
    }));
  };

  const handleEnroladinhoSelection = () => {
    if (!enroladinhoSabor) {
      alert('Selecione o sabor do Enroladinho');
      return;
    }
    const enroladinhoItem = {
      name: `Enroladinho (${enroladinhoSabor})`,
      price: 4.00,
      description: `Sabor: ${enroladinhoSabor}`
    };
    addToCart(enroladinhoItem);
    setIsEnroladinhoModalOpen(false);
    setEnroladinhoSabor('');
  };

  const categories = [
    { id: 'bebidas', label: 'Bebidas', icon: ShoppingCart },
    { id: 'lanches', label: 'Lanches', icon: ShoppingCart },
    { id: 'cuscuz', label: 'Cuscuz', icon: ShoppingCart },
    { id: 'combo-salgados', label: 'Combo de Salgados', icon: ShoppingCart },
    { id: 'doces', label: 'Doces', icon: ShoppingCart },
  ];

  const lanches: Item[] = [
    { name: 'Coxinha de carne seca com queijo', price: 6.00, image: COXINHA_CARNE_SECA },
    { name: 'Coxinha de frango cremoso', price: 5.00, image: COXINHA_FRANGO },
    { name: 'Enroladinho (Misto, Salsicha)', price: 4.00, image: ENROLADINHO },
    { name: 'Hot Dog', price: 8.00, image: CACHORRO_QUENTE },
    { name: 'Barca de Coxinha', price: 18.00, image: BARCA_COXINHA },
    { name: 'Barca de Pastel', price: 18.00, image: BARCA_PASTEL },
    { name: 'Batata Frita Simples', price: 11.00, image: BATATA_SIMPLES },
    { name: 'Batata Frita Completa', price: 18.00, image: BATATA_COMPLETA },
    // Pastel P
    { name: 'Pastel P - Carne seca com queijo', price: 7.00, image: PASTEL_P },
    { name: 'Pastel P - Carne moída com queijo', price: 7.00, image: PASTEL_P },
    { name: 'Pastel P - Calabresa com queijo', price: 7.00, image: PASTEL_P },
    { name: 'Pastel P - Frango com queijo', price: 7.00, image: PASTEL_P },
    { name: 'Pastel P - Bacon com queijo', price: 7.00, image: PASTEL_P },
    { name: 'Pastel P - Misto', price: 7.00, image: PASTEL_P },
    { name: 'Pastel P - Queijo', price: 7.00, image: PASTEL_P },
    // Pastel G (sabores e complementos podem ser descritos na descrição)
    { name: 'Pastel G', price: 15.00, image: PASTEL_G, description: 'Escolha até 2 sabores: Bacon, Carne moída, Carne seca, Frango, Presunto, Queijo. Até 3 complementos: Azeitona, Catupiry, Cheddar, Cebola, Tomate, Milho.' },
  ];

  const bebidas: Item[] = [
    { name: 'Fanta 1L', price: 10.00, image: FANTA1L },
    { name: 'Coca-Cola 1L', price: 10.00, image: COCA1L },
    { name: 'Cajuína 1L', price: 10.00, image: CAJUINA1L },
    { name: 'Guaraná 1L', price: 10.00, image: GUARANA1L },
    { name: 'Fanta 350ml', price: 5.00, image: FANTALT },
    { name: 'Coca-Cola 350ml', price: 5.00, image: COCA_LT },
    { name: 'Coca Zero 350ml', price: 5.00, image: COCAZERO_LT },
    { name: 'Guaraná 350ml', price: 5.00, image: GUARANA_LT },
    { name: 'Suco de Morango 500ml', price: 7.00, image: SUCO_MORANGO },
    { name: 'Suco de Goiaba 500ml', price: 7.00, image: SUCO_GOIABA },
    { name: 'Suco de Graviola 500ml', price: 7.00, image: SUCO_GRAVIOLA },
    { name: 'Suco de Caju 500ml', price: 7.00, image: SUCO_CAJU },
    { name: 'Suco de Maracujá 500ml', price: 7.00, image: SUCO_MARACUJA },
    { name: 'Itaipava latão', price: 6.00, image: ITAIPAVA_LATAO },
    { name: 'Skol latão', price: 6.00, image: SKOL_LATAO },
    { name: 'Brahma chopp', price: 7.00, image: BRAHMA_CHOPP },
    { name: 'Budweiser long neck', price: 7.00, image: BUDWEISER_LONGNECK },
    { name: 'Heineken long neck', price: 9.00, image: HEINEKEN_LONGNECK },
    { name: 'Água de coco', price: 4.50, image: AGUA_COCO },
    { name: 'H2oh limoneto', price: 6.00, image: H2OH_LIMONETO },
  ];

  const doces: Item[] = [
    { name: 'Bolo de Chocolate (fatia)', price: 5.00, image: BOLO_CHOCOLATE },
    { name: 'Bolo de Cenoura com Chocolate (fatia)', price: 5.00, image: BOLO_SENHORA },
    { name: 'Pudim', price: 5.00, image: PUDIM },
    { name: 'Tartelete', price: 2.00, image: TARTALETE },
  ];

  const cuscuz: Item[] = [
    { name: 'Cuscuz com frango e catupiry', price: 14.00, image: CUSCUZ_FRANGO },
    { name: 'Cuscuz com costela', price: 15.00, image: CUSCUZ_COSTELA },
    { name: 'Cuscuz com calabresa e bacon', price: 16.00, image: CUSCUZ_CALABRESA },
  ];

  const comboSalgados: Item[] = [
    { name: 'Combo de Salgados', price: 38.00, image: COMBO, description: 'Inclui: Coxinha, Pastel, Enroladinho, Batata' },
  ];

  const saboresPastelG = ['Bacon', 'Carne moída', 'Carne seca', 'Frango', 'Presunto', 'Queijo'];
  const complementosPastelG = ['Azeitona', 'Catupiry', 'Cheddar', 'Cebola', 'Tomate', 'Milho'];

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
                        <h3 className="text-lg font-bold text-center mb-4">💠 Pagamento PIX</h3>
                        
                        {/* Valor em destaque */}
                        <div className="bg-green-100 p-3 rounded-lg mb-4 text-center">
                          <p className="text-sm text-gray-600">Valor a pagar:</p>
                          <p className="text-2xl font-bold text-green-600">
                            R$ {(getTotalPrice() + orderForm.deliveryFee).toFixed(2)}
                          </p>
                        </div>
                        
                        {/* Código PIX para cópia */}
                        <div className="mb-4">
                          <p className="font-semibold mb-2 text-center">Código PIX (Cópia e Cola):</p>
                          <div className="bg-white p-3 rounded border">
                            <code className="text-xs break-all select-all">
                              {generatePixPayload({
                                ...pixInfo,
                                amount: getTotalPrice() + orderForm.deliveryFee,
                                description: `Pedido Hotdog da Praça - ${orderForm.name}`
                              })}
                            </code>
                          </div>
                          <p className="text-xs text-blue-600 mt-1 text-center">
                            👆 Toque para selecionar e copiar o código PIX
                          </p>
                        </div>
                        
                        {/* Informações PIX */}
                        <div className="space-y-2 text-sm border-t pt-3">
                          <p className="font-semibold text-center">Dados do Recebedor</p>
                          <p><span className="font-medium">Nome:</span> {pixInfo.name}</p>
                          <p><span className="font-medium">Chave PIX (CPF):</span> {pixInfo.key}</p>
                          <p><span className="font-medium">Cidade:</span> {pixInfo.city}</p>
                        </div>
                        
                        {/* Instruções */}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-800 text-center">
                            📱 <strong>Como pagar:</strong><br/>
                            1. Copie o código PIX acima<br/>
                            2. Abra seu app do banco<br/>
                            3. Escolha "PIX Copia e Cola"<br/>
                            4. Cole o código e confirme<br/>
                            5. Clique em "Finalizar Pedido"
                          </p>
                        </div>
                      </div>
                    )}
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

      {/* Modal do Pastel G */}
      {isPastelGModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Personalizar Pastel G</h2>
              <button 
                onClick={() => {
                  setIsPastelGModalOpen(false);
                  setPastelGSelections({ sabores: [], complementos: [] });
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Escolha até 2 sabores:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {saboresPastelG.map(sabor => (
                    <label key={sabor} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={pastelGSelections.sabores.includes(sabor)}
                        onChange={() => handleSaboresChange(sabor)}
                        className="rounded"
                      />
                      <span className="text-sm">{sabor}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Escolha até 3 complementos:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {complementosPastelG.map(complemento => (
                    <label key={complemento} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={pastelGSelections.complementos.includes(complemento)}
                        onChange={() => handleComplementosChange(complemento)}
                        className="rounded"
                      />
                      <span className="text-sm">{complemento}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="text-xl font-bold text-green-600">R$ 15,00</span>
                </div>
                <button
                  onClick={handlePastelGSelection}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Enroladinho */}
      {isEnroladinhoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Escolher Sabor do Enroladinho</h2>
              <button 
                onClick={() => {
                  setIsEnroladinhoModalOpen(false);
                  setEnroladinhoSabor('');
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Selecione o sabor:</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="enroladinho-sabor"
                      value="Misto"
                      checked={enroladinhoSabor === 'Misto'}
                      onChange={() => setEnroladinhoSabor('Misto')}
                      className="rounded"
                    />
                    <span className="text-sm">Misto</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="enroladinho-sabor"
                      value="Salsicha"
                      checked={enroladinhoSabor === 'Salsicha'}
                      onChange={() => setEnroladinhoSabor('Salsicha')}
                      className="rounded"
                    />
                    <span className="text-sm">Salsicha</span>
                  </label>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="text-xl font-bold text-green-600">R$ 4,00</span>
                </div>
                <button
                  onClick={handleEnroladinhoSelection}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banner de Promoções */}
      <PromotionBanner isVisible={showPromotionBanner} onClose={() => setShowPromotionBanner(false)} />

      {/* Modal de Senha Admin */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Acesso Administrativo</h3>
            <input
              type="password"
              placeholder="Digite a senha"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setAdminPassword('');
                }}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdminAccess}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Painel Admin */}
      {isAdminOpen && (
        <AdminPanel
          onClose={() => {
            setIsAdminOpen(false);
          }}
          products={allProducts}
          onUpdateProducts={setAllProducts}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <section className="relative h-[300px] flex items-center justify-center mt-16">
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
                  <span>Terezinha Nunes</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>55999211477</span>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>15:00 - 23:00</span>
                </div>
              </div>
              {/* Botão Admin (discreto) */}
              <div className="mt-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="text-xs text-gray-400 hover:text-white opacity-50 hover:opacity-100"
                >
                  Admin
                </button>
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
                {lanches.map((item) => {
                  const product = allProducts.find(p => p.name === item.name);
                  const isAvailable = product?.available !== false;
                  
                  return (
                  <div key={item.name} className={`bg-white p-3 rounded-lg shadow-md ${!isAvailable ? 'opacity-50' : ''}`}>
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">
                      {item.name}
                      {!isAvailable && <span className="text-red-500 text-sm ml-2">(Indisponível)</span>}
                    </h4>
                    {item.description && (
                      <p className="text-gray-600 mb-2 text-sm text-center">{item.description}</p>
                    )}
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        if (!isAvailable) {
                          alert('Este produto está temporariamente indisponível');
                          return;
                        }
                        item.name.startsWith('Enroladinho') ? setIsEnroladinhoModalOpen(true) : item.name === 'Pastel G' ? setIsPastelGModalOpen(true) : addToCart(item);
                      }}
                      className={`w-full py-2 rounded-lg transition-colors text-sm ${
                        isAvailable 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {!isAvailable ? 'Indisponível' : 
                       item.name.startsWith('Enroladinho') ? 'Escolher Sabor' : 
                       item.name === 'Pastel G' ? 'Personalizar' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCategory === 'bebidas' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Bebidas</h3>
              <div className="space-y-4">
                {bebidas.map((item) => {
                  const product = allProducts.find(p => p.name === item.name);
                  const isAvailable = product?.available !== false;
                  
                  return (
                  <div key={item.name} className={`bg-white p-3 rounded-lg shadow-md ${!isAvailable ? 'opacity-50' : ''}`}>
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">
                      {item.name}
                      {!isAvailable && <span className="text-red-500 text-sm ml-2">(Indisponível)</span>}
                    </h4>
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        if (!isAvailable) {
                          alert('Este produto está temporariamente indisponível');
                          return;
                        }
                        addToCart(item);
                      }}
                      className={`w-full py-2 rounded-lg transition-colors text-sm ${
                        isAvailable 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {!isAvailable ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCategory === 'doces' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Doces</h3>
              <div className="space-y-4">
                {doces.map((item) => {
                  const product = allProducts.find(p => p.name === item.name);
                  const isAvailable = product?.available !== false;
                  
                  return (
                  <div key={item.name} className={`bg-white p-3 rounded-lg shadow-md ${!isAvailable ? 'opacity-50' : ''}`}>
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">
                      {item.name}
                      {!isAvailable && <span className="text-red-500 text-sm ml-2">(Indisponível)</span>}
                    </h4>
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        if (!isAvailable) {
                          alert('Este produto está temporariamente indisponível');
                          return;
                        }
                        addToCart(item);
                      }}
                      className={`w-full py-2 rounded-lg transition-colors text-sm ${
                        isAvailable 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {!isAvailable ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCategory === 'cuscuz' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Cuscuz</h3>
              <div className="space-y-4">
                {cuscuz.map((item) => {
                  const product = allProducts.find(p => p.name === item.name);
                  const isAvailable = product?.available !== false;
                  
                  return (
                  <div key={item.name} className={`bg-white p-3 rounded-lg shadow-md ${!isAvailable ? 'opacity-50' : ''}`}>
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">
                      {item.name}
                      {!isAvailable && <span className="text-red-500 text-sm ml-2">(Indisponível)</span>}
                    </h4>
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        if (!isAvailable) {
                          alert('Este produto está temporariamente indisponível');
                          return;
                        }
                        addToCart(item);
                      }}
                      className={`w-full py-2 rounded-lg transition-colors text-sm ${
                        isAvailable 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {!isAvailable ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCategory === 'combo-salgados' && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white text-center">Combo de Salgados</h3>
              <div className="space-y-4">
                {comboSalgados.map((item) => {
                  const product = allProducts.find(p => p.name === item.name);
                  const isAvailable = product?.available !== false;
                  
                  return (
                  <div key={item.name} className={`bg-white p-3 rounded-lg shadow-md ${!isAvailable ? 'opacity-50' : ''}`}>
                    <div className="flex justify-center">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-auto object-cover mb-2 rounded-lg" style={{ width: '80%' }} />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-center">
                      {item.name}
                      {!isAvailable && <span className="text-red-500 text-sm ml-2">(Indisponível)</span>}
                    </h4>
                    {item.description && (
                      <p className="text-gray-600 mb-2 text-sm text-center">{item.description}</p>
                    )}
                    <p className="text-xl text-green-600 font-bold mb-2 text-center">R$ {item.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        if (!isAvailable) {
                          alert('Este produto está temporariamente indisponível');
                          return;
                        }
                        addToCart(item);
                      }}
                      className={`w-full py-2 rounded-lg transition-colors text-sm ${
                        isAvailable 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {!isAvailable ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                  );
                })}
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
                <p className="mt-1 text-sm">AQUI CADA LANCHE É UMA EXPERIÊNCIA NOVA</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://wa.me/55999211477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400"
                >
                  <Phone className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>(55) 99921-1477</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Terezinha Nunes</span>
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