const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  doc, 
  getDoc, 
  collection,
  getDocs
} = require('firebase/firestore');
const { createClient } = require('@supabase/supabase-js');

// Configuração do Firebase (origem)
const firebaseConfig = {
  apiKey: "AIzaSyAuZ1SJWxlwWtgVhV3qnBafoytho59WE4I",
  authDomain: "device-streaming-77144326.firebaseapp.com",
  databaseURL: "https://device-streaming-77144326-default-rtdb.firebaseio.com",
  projectId: "device-streaming-77144326",
  storageBucket: "device-streaming-77144326.firebasestorage.app",
  messagingSenderId: "375948005973",
  appId: "1:375948005973:web:99b7ff4736d6c17f927adc"
};

// Configuração do Supabase (destino)
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sua-chave-anonima';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicializar Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 MIGRAÇÃO: Firebase → Supabase\n');

async function migrateToSupabase() {
  try {
    console.log('📋 Verificando dados no Firebase...');
    
    // 1. Buscar dados da estrutura antiga
    const oldRef = doc(db, 'menu', 'menu_data');
    const oldSnap = await getDoc(oldRef);
    
    let firebaseProducts = [];
    let firebaseConfig = {
      dailyOffer: null,
      pixKey: '',
      pixName: ''
    };
    
    if (oldSnap.exists()) {
      const oldData = oldSnap.data();
      firebaseProducts = oldData.products || [];
      firebaseConfig = {
        dailyOffer: oldData.dailyOffer || null,
        pixKey: oldData.pixKey || '',
        pixName: oldData.pixName || ''
      };
      
      console.log(`📦 Encontrados ${firebaseProducts.length} produtos na estrutura antiga`);
    }
    
    // 2. Buscar dados da nova estrutura (se existir)
    try {
      const productsQuery = collection(db, 'products');
      const productsSnap = await getDocs(productsQuery);
      const newProducts = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (newProducts.length > 0) {
        firebaseProducts = newProducts;
        console.log(`📦 Encontrados ${newProducts.length} produtos na nova estrutura`);
      }
      
      const configRef = doc(db, 'menu', 'menu_config');
      const configSnap = await getDoc(configRef);
      if (configSnap.exists()) {
        const configData = configSnap.data();
        firebaseConfig = {
          dailyOffer: configData.dailyOffer || null,
          pixKey: configData.pixKey || '',
          pixName: configData.pixName || ''
        };
      }
    } catch (error) {
      console.log('⚠️ Nova estrutura não encontrada, usando dados da estrutura antiga');
    }
    
    if (firebaseProducts.length === 0) {
      console.log('✅ Nenhum produto para migrar');
      return;
    }
    
    console.log('\n🔄 Iniciando migração para Supabase...');
    
    // 3. Migrar configuração
    console.log('⚙️ Migrando configuração...');
    const { error: configError } = await supabase
      .from('menu_config')
      .upsert({
        daily_offer: firebaseConfig.dailyOffer,
        pix_key: firebaseConfig.pixKey,
        pix_name: firebaseConfig.pixName,
        updated_at: new Date().toISOString()
      });
    
    if (configError) {
      console.error('❌ Erro ao migrar configuração:', configError);
      throw configError;
    }
    console.log('✅ Configuração migrada');
    
    // 4. Migrar produtos
    console.log(`📦 Migrando ${firebaseProducts.length} produtos...`);
    
    const productsToInsert = firebaseProducts.map(product => ({
      name: product.name,
      price: parseFloat(product.price) || 0,
      image: product.image || '',
      category: product.category || 'Lanches',
      available: product.available !== false,
      created_at: product.createdAt || new Date().toISOString(),
      updated_at: product.updatedAt || new Date().toISOString()
    }));
    
    const { error: productsError } = await supabase
      .from('products')
      .insert(productsToInsert);
    
    if (productsError) {
      console.error('❌ Erro ao migrar produtos:', productsError);
      throw productsError;
    }
    
    console.log(`✅ ${firebaseProducts.length} produtos migrados`);
    
    // 5. Verificar migração
    console.log('\n🔍 Verificando migração...');
    const { data: verifyProducts, error: verifyError } = await supabase
      .from('products')
      .select('*');
    
    if (verifyError) {
      console.error('❌ Erro ao verificar produtos:', verifyError);
    } else {
      console.log(`✅ Verificação: ${verifyProducts.length} produtos no Supabase`);
      
      if (verifyProducts.length === firebaseProducts.length) {
        console.log('🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!');
        console.log('\n📊 Resumo:');
        console.log(`   - Produtos migrados: ${verifyProducts.length}`);
        console.log(`   - Configuração: Migrada`);
        console.log(`   - Firebase: ${firebaseProducts.length} produtos`);
        console.log(`   - Supabase: ${verifyProducts.length} produtos`);
        
        console.log('\n🎯 Próximos passos:');
        console.log('1. Atualizar variáveis de ambiente no Railway');
        console.log('2. Testar aplicação com Supabase');
        console.log('3. Remover código do Firebase');
        
      } else {
        console.error('❌ Erro na verificação: números não coincidem');
      }
    }
    
  } catch (error) {
    console.error('❌ Erro durante migração:', error);
    
    if (error.message.includes('Invalid API key')) {
      console.log('\n🔧 SOLUÇÃO:');
      console.log('1. Verificar credenciais do Supabase');
      console.log('2. Configurar variáveis de ambiente:');
      console.log('   - SUPABASE_URL');
      console.log('   - SUPABASE_ANON_KEY');
    }
  }
}

// Executar migração
migrateToSupabase(); 