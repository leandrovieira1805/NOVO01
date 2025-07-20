import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getMenuData, 
  saveMenuConfig, 
  addProduct as supabaseAddProduct,
  updateProduct as supabaseUpdateProduct,
  deleteProduct as supabaseDeleteProduct,
  setDailyOffer as supabaseSetDailyOffer,
  updatePixConfig as supabaseUpdatePixConfig,
  clearAllData as supabaseClearAllData,
  subscribeToMenuChanges
} from '../supabase/menuService';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

const defaultProducts = [
  {
    id: 1,
    name: 'Hot Dog Tradicional',
    price: 8.50,
    image: 'https://images.pexels.com/photos/4676401/pexels-photo-4676401.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lanches',
    available: true
  },
  {
    id: 2,
    name: 'Hot Dog Especial',
    price: 12.00,
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lanches',
    available: true
  },
  {
    id: 3,
    name: 'X-Burguer',
    price: 15.00,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lanches',
    available: true
  },
  {
    id: 4,
    name: 'Batata Frita',
    price: 6.00,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lanches',
    available: true
  },
  {
    id: 5,
    name: 'Refrigerante',
    price: 4.00,
    image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bebidas',
    available: true
  }
];

// Função para salvar dados no Supabase
const saveToSupabase = async (data) => {
  try {
    await saveMenuConfig(data);
    console.log('Dados salvos no Supabase');
    return true;
  } catch (error) {
    console.error('Erro ao salvar no Supabase:', error);
    return false;
  }
};

// Função para carregar dados do Supabase
const loadFromSupabase = async () => {
  try {
    const data = await getMenuData();
    console.log('Dados carregados do Supabase:', data);
    return data;
  } catch (error) {
    console.log('Erro ao carregar do Supabase:', error);
  }
  return null;
};

export const MenuProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [dailyOffer, setDailyOffer] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pixKey, setPixKey] = useState('');
  const [pixName, setPixName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [syncTimeout, setSyncTimeout] = useState(null);

  // Carregar dados na inicialização e sincronizar em tempo real
  useEffect(() => {
    console.log('MenuContext: Inicializando com Supabase...');
    console.log('MenuContext: Ambiente:', process.env.NODE_ENV);
    console.log('MenuContext: URL atual:', window.location.href);
    
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Carregar dados do Supabase
        const supabaseData = await loadFromSupabase();
        
        if (supabaseData && supabaseData.products) {
          console.log('MenuContext: Dados carregados do Supabase');
          setProducts(supabaseData.products);
          setDailyOffer(supabaseData.dailyOffer || null);
          setPixKey(supabaseData.pixKey || '');
          setPixName(supabaseData.pixName || '');
          setLastUpdate(new Date(supabaseData.lastUpdate).getTime());
        } else {
          console.log('MenuContext: Supabase não disponível, usando dados padrão');
          setProducts(defaultProducts);
          setDailyOffer(null);
          setPixKey('');
          setPixName('');
          
          // Salvar dados padrão no Supabase
          const defaultData = {
            products: defaultProducts,
            dailyOffer: null,
            pixKey: '',
            pixName: ''
          };
          
          try {
            await saveToSupabase(defaultData);
            console.log('MenuContext: Dados padrão salvos no Supabase');
          } catch (error) {
            console.log('MenuContext: Erro ao salvar dados padrão no Supabase');
          }
        }
      } catch (error) {
        console.error('MenuContext: Erro ao carregar dados:', error);
        // Fallback para dados padrão
        setProducts(defaultProducts);
        setDailyOffer(null);
        setPixKey('');
        setPixName('');
      }

      // Verificar autenticação
      const authStatus = localStorage.getItem('hotdog_admin_auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    // Carregar dados iniciais
    loadData();
    
    // Sincronização em tempo real com Supabase
    const unsubscribe = subscribeToMenuChanges((data) => {
      if (data) {
        console.log('MenuContext: Mudança detectada no Supabase, atualizando...');
        console.log(`📦 Produtos recebidos: ${data.products?.length || 0}`);
        console.log('MenuContext: Timestamp da mudança:', data.lastUpdate);
        console.log('MenuContext: Produtos IDs:', data.products?.map(p => p.id).slice(-5));
        
        // Debounce para evitar múltiplas atualizações
        if (syncTimeout) {
          clearTimeout(syncTimeout);
        }
        
        const timeout = setTimeout(() => {
          // Verificar se é apenas mudança nas configurações Pix
          const currentProductCount = products.length;
          const newProductCount = data.products?.length || 0;
          const isOnlyPixChange = currentProductCount === newProductCount && 
                                 (pixKey !== data.pixKey || pixName !== data.pixName);
          
          if (isOnlyPixChange) {
            console.log('💳 Apenas configurações Pix alteradas, atualizando apenas Pix');
            setPixKey(data.pixKey || '');
            setPixName(data.pixName || '');
            setLastUpdate(new Date(data.lastUpdate).getTime());
          } else {
            // Atualizar todos os dados
            setProducts(data.products || []);
            setDailyOffer(data.dailyOffer || null);
            setPixKey(data.pixKey || '');
            setPixName(data.pixName || '');
            setLastUpdate(new Date(data.lastUpdate).getTime());
          }
          
          console.log('✅ Dados atualizados com sucesso');
        }, 100); // 100ms de debounce
        
        setSyncTimeout(timeout);
      }
    });
    
    // Cleanup
    return () => {
      unsubscribe();
      if (syncTimeout) {
        clearTimeout(syncTimeout);
      }
    };
  }, []);

  // Função para salvar produtos
  const saveProducts = async (newProducts) => {
    console.log('MenuContext: Salvando produtos:', newProducts.length);
    setProducts(newProducts);
    
    // Salvar no Supabase
    setIsSaving(true);
    const dataToSave = {
      products: newProducts,
      dailyOffer,
      pixKey,
      pixName
    };
    
    const success = await saveToSupabase(dataToSave);
    if (success) {
      console.log('MenuContext: Produtos salvos no Supabase com sucesso');
      setLastUpdate(new Date().getTime());
    } else {
      console.log('MenuContext: Erro ao salvar no Supabase');
    }
    setIsSaving(false);
  };

  // Função para adicionar produto
  const addProduct = async (product) => {
    console.log('MenuContext: Adicionando produto:', product.name);
    try {
      const newProduct = await supabaseAddProduct(product);
      console.log('MenuContext: Produto adicionado com sucesso');
      
      // A sincronização em tempo real vai atualizar automaticamente
      // Não precisamos forçar atualização manual
      
      return newProduct;
    } catch (error) {
      console.error('MenuContext: Erro ao adicionar produto:', error);
      throw error;
    }
  };

  // Função para atualizar produto
  const updateProduct = async (id, updatedProduct) => {
    console.log('MenuContext: Atualizando produto ID:', id);
    try {
      await supabaseUpdateProduct(id, updatedProduct);
      console.log('MenuContext: Produto atualizado com sucesso');
      
      // A sincronização em tempo real vai atualizar automaticamente
    } catch (error) {
      console.error('MenuContext: Erro ao atualizar produto:', error);
      throw error;
    }
  };

  // Função para deletar produto
  const deleteProduct = async (id) => {
    console.log('MenuContext: Deletando produto ID:', id);
    try {
      await supabaseDeleteProduct(id);
      console.log('MenuContext: Produto deletado com sucesso');
      
      // A sincronização em tempo real vai atualizar automaticamente
    } catch (error) {
      console.error('MenuContext: Erro ao deletar produto:', error);
      throw error;
    }
  };

  // Função para definir oferta do dia
  const setOffer = async (offer) => {
    try {
      await supabaseSetDailyOffer(offer);
      console.log('MenuContext: Oferta salva no Supabase com sucesso');
    } catch (error) {
      console.error('MenuContext: Erro ao salvar oferta:', error);
      throw error;
    }
  };

  // Função para atualizar configuração Pix
  const updatePixConfig = async (key, name) => {
    try {
      await supabaseUpdatePixConfig(key, name);
      console.log('MenuContext: Configuração Pix salva no Supabase com sucesso');
    } catch (error) {
      console.error('MenuContext: Erro ao salvar configuração Pix:', error);
      throw error;
    }
  };

  // Função de login
  const login = (username, password) => {
    if (username === 'admin' && password === 'hotdog123') {
      setIsAuthenticated(true);
      localStorage.setItem('hotdog_admin_auth', 'true');
      return true;
    }
    return false;
  };

  // Função de logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('hotdog_admin_auth');
  };

  // Função para forçar sincronização
  const forceRefresh = async () => {
    console.log('MenuContext: Forçando sincronização...');
    setIsLoading(true);
    
    try {
      // Recarregar dados do Supabase
      const supabaseData = await loadFromSupabase();
      if (supabaseData) {
        setProducts(supabaseData.products || []);
        setDailyOffer(supabaseData.dailyOffer || null);
        setPixKey(supabaseData.pixKey || '');
        setPixName(supabaseData.pixName || '');
        setLastUpdate(new Date(supabaseData.lastUpdate).getTime());
        console.log('MenuContext: Sincronização concluída');
      } else {
        console.log('MenuContext: Nenhuma atualização encontrada');
      }
    } catch (error) {
      console.error('MenuContext: Erro na sincronização:', error);
    }
    
    setIsLoading(false);
  };

  // Função para limpar dados
  const clearData = async () => {
    console.log('MenuContext: Limpando todos os dados...');
    
    try {
      await supabaseClearAllData();
      console.log('MenuContext: Dados limpos no Supabase');
    } catch (error) {
      console.error('MenuContext: Erro ao limpar dados no Supabase:', error);
    }
  };

  // Função para restaurar produtos padrão
  const restoreDefaults = async () => {
    console.log('MenuContext: Restaurando produtos padrão...');
    
    try {
      // Limpar dados primeiro
      await supabaseClearAllData();
      
      // Adicionar produtos padrão
      for (const product of defaultProducts) {
        await supabaseAddProduct(product);
      }
      
      console.log('MenuContext: Produtos padrão restaurados no Supabase');
    } catch (error) {
      console.error('MenuContext: Erro ao restaurar produtos padrão:', error);
    }
  };

  return (
    <MenuContext.Provider value={{
      products,
      dailyOffer,
      isAuthenticated,
      pixKey,
      pixName,
      isLoading,
      isSaving,
      lastUpdate,
      addProduct,
      updateProduct,
      deleteProduct,
      setOffer,
      updatePixConfig,
      login,
      logout,
      forceRefresh,
      clearData,
      restoreDefaults
    }}>
      {children}
    </MenuContext.Provider>
  );
};