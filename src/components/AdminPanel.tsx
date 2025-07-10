import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash, Eye, EyeOff, Upload } from 'lucide-react';
import { productService, ofertaService, promotionService } from '../firebase/services';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  available: boolean;
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

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  promotions: Promotion[];
  onUpdatePromotions: (promotions: Promotion[]) => void;
  ofertas: Oferta[];
  onUpdateOfertas: (ofertas: Oferta[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  promotions,
  onUpdatePromotions,
  ofertas,
  onUpdateOfertas
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'ofertas'>('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPromotionForm, setShowPromotionForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  // Remover o estado local de ofertas e usar as props
  // const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [ofertaForm, setOfertaForm] = useState({
    image: '',
    price: 0
  });
  const [showOfertaForm, setShowOfertaForm] = useState(false);
  const [editingOferta, setEditingOferta] = useState<Oferta | null>(null);

  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    category: 'lanches',
    description: '',
    image: '',
    available: true
  });

  const [promotionForm, setPromotionForm] = useState({
    title: '',
    description: '',
    image: '',
    discountPercent: 0,
    active: true,
    startDate: '',
    endDate: ''
  });

  const categories = [
    { id: 'lanches', label: 'Lanches' },
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'doces', label: 'Doces' },
    { id: 'cuscuz', label: 'Cuscuz' },
    { id: 'combo-salgados', label: 'Combo de Salgados' }
  ];

  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        // Atualizar produto existente
        await productService.updateProduct(editingProduct.id, productForm);
      } else {
        // Adicionar novo produto
        await productService.addProduct(productForm);
      }
      
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        price: 0,
        category: 'lanches',
        description: '',
        image: '',
        available: true
      });
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Verifique a conexão com o Firebase.');
    }
  };

  const handlePromotionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPromotion) {
        // Atualizar promoção existente
        await promotionService.updatePromotion(editingPromotion.id, promotionForm);
      } else {
        // Adicionar nova promoção
        await promotionService.addPromotion(promotionForm);
      }
      
      setShowPromotionForm(false);
      setEditingPromotion(null);
      setPromotionForm({
        title: '',
        description: '',
        image: '',
        discountPercent: 0,
        active: true,
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error('Erro ao salvar promoção:', error);
      alert('Erro ao salvar promoção. Verifique a conexão com o Firebase.');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      image: product.image,
      available: product.available
    });
    setShowProductForm(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setPromotionForm({
      title: promotion.title,
      description: promotion.description,
      image: promotion.image,
      discountPercent: promotion.discountPercent,
      active: promotion.active,
      startDate: promotion.startDate,
      endDate: promotion.endDate
    });
    setShowPromotionForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await productService.deleteProduct(productId);
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto. Verifique a conexão com o Firebase.');
      }
    }
  };

  const handleDeletePromotion = async (promotionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta promoção?')) {
      try {
        await promotionService.deletePromotion(promotionId);
      } catch (error) {
        console.error('Erro ao excluir promoção:', error);
        alert('Erro ao excluir promoção. Verifique a conexão com o Firebase.');
      }
    }
  };

  const toggleProductAvailability = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      await productService.updateProduct(productId, { available: !product.available });
    }
  };

  const togglePromotionActive = (promotionId: string) => {
    const updatedPromotions = promotions.map(p => 
      p.id === promotionId ? { ...p, active: !p.active } : p
    );
    onUpdatePromotions(updatedPromotions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Painel Administrativo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 border-r">
            <div className="p-4">
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left p-2 rounded ${
                  activeTab === 'products' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
              >
                Produtos
              </button>
              <button
                onClick={() => setActiveTab('ofertas')}
                className={`w-full text-left p-2 rounded mt-2 ${
                  activeTab === 'ofertas' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
              >
                Ofertas
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'products' && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Gerenciar Produtos</h3>
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Adicionar Produto
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-center mb-2">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                      </div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-green-600 font-bold">R$ {product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => toggleProductAvailability(product.id)}
                          className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                            product.available 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {product.available ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{product.available ? 'Disponível' : 'Indisponível'}</span>
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'ofertas' && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Gerenciar Ofertas</h3>
                  <button
                    onClick={() => setShowOfertaForm(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Adicionar Oferta
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ofertas.map((oferta) => (
                    <div key={oferta.id} className="border rounded-lg p-4 flex flex-col items-center">
                      <img src={oferta.image} alt="Oferta" className="w-32 h-32 object-cover rounded mb-2" />
                      <span className="text-lg font-bold text-green-700 mb-2">R$ {oferta.price.toFixed(2)}</span>
                        <button
                        onClick={async () => await ofertaService.deleteOferta(oferta.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs mt-2"
                        >
                        Remover
                        </button>
                    </div>
                  ))}
                </div>
                {showOfertaForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                      <h3 className="text-lg font-semibold mb-4">Adicionar Oferta</h3>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const novaOferta = {
                          id: Date.now().toString(),
                          image: ofertaForm.image,
                          price: ofertaForm.price
                        };
                        await ofertaService.addOferta({ image: novaOferta.image, price: novaOferta.price });
                        setShowOfertaForm(false);
                        setOfertaForm({ image: '', price: 0 });
                      }} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Imagem</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const imageData = await handleImageUpload(file);
                                setOfertaForm(prev => ({ ...prev, image: imageData }));
                              }
                            }}
                            className="w-full border rounded px-3 py-2"
                          />
                          {ofertaForm.image && (
                            <div className="mt-2">
                              <img src={ofertaForm.image} alt="Preview" className="w-20 h-20 object-cover rounded border" />
                              <button type="button" onClick={() => setOfertaForm(prev => ({ ...prev, image: '' }))} className="ml-2 text-red-500 text-sm">Remover</button>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Valor</label>
                          <input
                            type="number"
                            step="0.01"
                            value={ofertaForm.price || ''}
                            onChange={e => setOfertaForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                            className="w-full border rounded px-3 py-2"
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded flex-1">Adicionar</button>
                          <button type="button" onClick={() => { setShowOfertaForm(false); setOfertaForm({ image: '', price: 0 }); }} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Form Modal */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
              </h3>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border rounded px-3 py-2"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Imagem</label>
                  <div className="space-y-2">
                  <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const imageData = await handleImageUpload(file);
                            setProductForm(prev => ({ ...prev, image: imageData }));
                          } catch (error) {
                            alert('Erro ao fazer upload da imagem');
                          }
                        }
                      }}
                    className="w-full border rounded px-3 py-2"
                    />
                    {productForm.image && (
                      <div className="mt-2">
                        <img 
                          src={productForm.image} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => setProductForm(prev => ({ ...prev, image: '' }))}
                          className="ml-2 text-red-500 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productForm.available}
                    onChange={(e) => setProductForm(prev => ({ ...prev, available: e.target.checked }))}
                    className="mr-2"
                  />
                  <label className="text-sm">Disponível</label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded flex-1"
                  >
                    {editingProduct ? 'Atualizar' : 'Adicionar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                      setProductForm({
                        name: '',
                        price: 0,
                        category: 'lanches',
                        description: '',
                        image: '',
                        available: true
                      });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Promotion Form Modal */}
        {showPromotionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {editingPromotion ? 'Editar Promoção' : 'Adicionar Promoção'}
              </h3>
              <form onSubmit={handlePromotionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    value={promotionForm.title}
                    onChange={(e) => setPromotionForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    value={promotionForm.description}
                    onChange={(e) => setPromotionForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Desconto (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={promotionForm.discountPercent}
                    onChange={(e) => setPromotionForm(prev => ({ ...prev, discountPercent: parseInt(e.target.value) }))}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Imagem</label>
                  <div className="space-y-2">
                  <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const imageData = await handleImageUpload(file);
                            setPromotionForm(prev => ({ ...prev, image: imageData }));
                          } catch (error) {
                            alert('Erro ao fazer upload da imagem');
                          }
                        }
                      }}
                    className="w-full border rounded px-3 py-2"
                    />
                    {promotionForm.image && (
                      <div className="mt-2">
                        <img 
                          src={promotionForm.image} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => setPromotionForm(prev => ({ ...prev, image: '' }))}
                          className="ml-2 text-red-500 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Início</label>
                  <input
                    type="date"
                    value={promotionForm.startDate}
                    onChange={(e) => setPromotionForm(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Fim</label>
                  <input
                    type="date"
                    value={promotionForm.endDate}
                    onChange={(e) => setPromotionForm(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={promotionForm.active}
                    onChange={(e) => setPromotionForm(prev => ({ ...prev, active: e.target.checked }))}
                    className="mr-2"
                  />
                  <label className="text-sm">Ativa</label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded flex-1"
                  >
                    {editingPromotion ? 'Atualizar' : 'Adicionar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPromotionForm(false);
                      setEditingPromotion(null);
                      setPromotionForm({
                        title: '',
                        description: '',
                        image: '',
                        discountPercent: 0,
                        active: true,
                        startDate: '',
                        endDate: ''
                      });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};