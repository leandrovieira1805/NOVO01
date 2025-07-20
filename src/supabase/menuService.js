import { supabase } from './config'

// Função para obter dados do menu
export const getMenuData = async () => {
  try {
    console.log('Supabase: Carregando dados do menu...')
    
    // Buscar configuração
    const { data: configData, error: configError } = await supabase
      .from('menu_config')
      .select('*')
      .single()
    
    if (configError && configError.code !== 'PGRST116') {
      console.error('Supabase: Erro ao carregar configuração:', configError)
    }
    
    // Buscar produtos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false })
    
    if (productsError) {
      console.error('Supabase: Erro ao carregar produtos:', productsError)
      throw productsError
    }
    
    const result = {
      products: products || [],
      dailyOffer: configData?.daily_offer || null,
      pixKey: configData?.pix_key || '',
      pixName: configData?.pix_name || '',
      lastUpdate: configData?.updated_at || new Date().toISOString()
    }
    
    console.log('Supabase: Dados carregados com sucesso:', {
      productsCount: result.products.length,
      hasConfig: !!configData
    })
    
    return result
    
  } catch (error) {
    console.error('Supabase: Erro ao carregar dados:', error)
    throw error
  }
}

// Função para salvar configuração
export const saveMenuConfig = async (config) => {
  try {
    console.log('Supabase: Salvando configuração...')
    
    const { data, error } = await supabase
      .from('menu_config')
      .upsert({
        daily_offer: config.dailyOffer,
        pix_key: config.pixKey,
        pix_name: config.pixName,
        updated_at: new Date().toISOString()
      })
      .select()
    
    if (error) {
      console.error('Supabase: Erro ao salvar configuração:', error)
      throw error
    }
    
    console.log('Supabase: Configuração salva com sucesso')
    return data[0]
    
  } catch (error) {
    console.error('Supabase: Erro ao salvar configuração:', error)
    throw error
  }
}

// Função para adicionar produto
export const addProduct = async (product) => {
  try {
    console.log('Supabase: Adicionando produto:', product.name)
    
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        available: product.available !== false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
    
    if (error) {
      console.error('Supabase: Erro ao adicionar produto:', error)
      throw error
    }
    
    console.log('Supabase: Produto adicionado com sucesso:', data[0].name)
    return data[0]
    
  } catch (error) {
    console.error('Supabase: Erro ao adicionar produto:', error)
    throw error
  }
}

// Função para atualizar produto
export const updateProduct = async (productId, updates) => {
  try {
    console.log('Supabase: Atualizando produto:', productId)
    
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
      .select()
    
    if (error) {
      console.error('Supabase: Erro ao atualizar produto:', error)
      throw error
    }
    
    console.log('Supabase: Produto atualizado com sucesso')
    return data[0]
    
  } catch (error) {
    console.error('Supabase: Erro ao atualizar produto:', error)
    throw error
  }
}

// Função para deletar produto
export const deleteProduct = async (productId) => {
  try {
    console.log('Supabase: Deletando produto:', productId)
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    
    if (error) {
      console.error('Supabase: Erro ao deletar produto:', error)
      throw error
    }
    
    console.log('Supabase: Produto deletado com sucesso')
    return true
    
  } catch (error) {
    console.error('Supabase: Erro ao deletar produto:', error)
    throw error
  }
}

// Função para definir oferta do dia
export const setDailyOffer = async (offer) => {
  try {
    console.log('Supabase: Definindo oferta do dia:', offer?.name || 'removida')
    
    const { data, error } = await supabase
      .from('menu_config')
      .upsert({
        daily_offer: offer,
        updated_at: new Date().toISOString()
      })
      .select()
    
    if (error) {
      console.error('Supabase: Erro ao definir oferta:', error)
      throw error
    }
    
    console.log('Supabase: Oferta do dia definida com sucesso')
    return data[0]
    
  } catch (error) {
    console.error('Supabase: Erro ao definir oferta:', error)
    throw error
  }
}

// Função para atualizar configuração Pix
export const updatePixConfig = async (pixKey, pixName) => {
  try {
    console.log('Supabase: Atualizando configuração Pix...')
    
    const { data, error } = await supabase
      .from('menu_config')
      .upsert({
        pix_key: pixKey,
        pix_name: pixName,
        updated_at: new Date().toISOString()
      })
      .select()
    
    if (error) {
      console.error('Supabase: Erro ao atualizar Pix:', error)
      throw error
    }
    
    console.log('Supabase: Configuração Pix atualizada com sucesso')
    return data[0]
    
  } catch (error) {
    console.error('Supabase: Erro ao atualizar Pix:', error)
    throw error
  }
}

// Função para limpar todos os dados
export const clearAllData = async () => {
  try {
    console.log('Supabase: Limpando todos os dados...')
    
    // Limpar produtos
    const { error: productsError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Deletar todos
    
    if (productsError) {
      console.error('Supabase: Erro ao limpar produtos:', productsError)
      throw productsError
    }
    
    // Limpar configuração
    const { error: configError } = await supabase
      .from('menu_config')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Deletar todos
    
    if (configError) {
      console.error('Supabase: Erro ao limpar configuração:', configError)
      throw configError
    }
    
    console.log('Supabase: Todos os dados foram limpos com sucesso')
    return true
    
  } catch (error) {
    console.error('Supabase: Erro ao limpar dados:', error)
    throw error
  }
}

// Função para escutar mudanças em tempo real
export const subscribeToMenuChanges = (callback) => {
  console.log('Supabase: Configurando listeners em tempo real...')
  
  // Listener para produtos
  const productsSubscription = supabase
    .channel('products-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'products' },
      (payload) => {
        console.log('Supabase: Mudança detectada em produtos:', payload.eventType)
        // Recarregar dados
        getMenuData().then(callback).catch(console.error)
      }
    )
    .subscribe()
  
  // Listener para configuração
  const configSubscription = supabase
    .channel('config-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'menu_config' },
      (payload) => {
        console.log('Supabase: Mudança detectada em configuração:', payload.eventType)
        // Recarregar dados
        getMenuData().then(callback).catch(console.error)
      }
    )
    .subscribe()
  
  // Retornar função para cancelar listeners
  return () => {
    console.log('Supabase: Cancelando listeners...')
    supabase.removeChannel(productsSubscription)
    supabase.removeChannel(configSubscription)
  }
} 