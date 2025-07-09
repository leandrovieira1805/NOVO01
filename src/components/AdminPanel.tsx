import React, { useState } from 'react';
import { Settings, Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

interface AdminPanelProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ products, onUpdateProducts, onClose }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    category: '',
    available: true
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    onUpdateProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    onUpdateProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image || '',
        category: newProduct.category,
        available: newProduct.available ?? true
      };
      onUpdateProducts([...products, product]);
      setNewProduct({ name: '', price: 0, image: '', category: '', available: true });
      setShowAddForm(false);
    }
  };

  const toggleAvailability = (productId: string) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, available: !p.available } : p
    );
    onUpdateProducts(updatedProducts);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Settings className="mr-2" />
            Painel Administrativo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <Plus className="mr-2" size={16} />
            Adicionar Produto
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Novo Produto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome do produto"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Preço"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option value="">Selecione a categoria</option>
                <option value="lanches">Lanches</option>
                <option value="bebidas">Bebidas</option>
                <option value="doces">Doces</option>
                <option value="petiscos">Petiscos</option>
              </select>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="available"
                checked={newProduct.available}
                onChange={(e) => setNewProduct({ ...newProduct, available: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="available">Disponível</label>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Salvar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex items-center justify-between">
              {editingProduct?.id === product.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="border rounded px-2 py-1"
                  >
                    <option value="lanches">Lanches</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="doces">Doces</option>
                    <option value="petiscos">Petiscos</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateProduct(editingProduct)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-4">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    )}
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <span className={`text-sm px-2 py-1 rounded ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.available ? 'Disponível' : 'Indisponível'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAvailability(product.id)}
                      className={`px-3 py-1 rounded text-white ${product.available ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {product.available ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};