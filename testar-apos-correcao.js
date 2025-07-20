const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzc1ODYsImV4cCI6MjA2ODU1MzU4Nn0.-mF1VTgNkuqQ4JaZiusG-ms3jni81nVwDBkEo2Q-pQY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testarAposCorrecao() {
  console.log('🧪 TESTANDO APÓS CORREÇÃO DO SUPABASE\n');
  
  // Testar o produto que estava falhando
  const produto = {
    name: 'BARCA DE COXINHA',
    price: 15.00,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lanches',
    available: true
  };
  
  console.log('📋 Testando produto:');
  console.log('- Nome:', produto.name);
  console.log('- Imagem:', produto.image.length, 'caracteres');
  console.log('- Categoria:', produto.category);
  console.log('');
  
  try {
    console.log('🔄 Inserindo produto...');
    const { data, error } = await supabase
      .from('products')
      .insert(produto)
      .select();
    
    if (error) {
      console.error('❌ ERRO:', error);
      console.log('');
      console.log('🔧 A correção não funcionou completamente.');
      console.log('Verifique se executou todos os comandos SQL.');
      console.log('');
    } else {
      console.log('✅ SUCESSO! Produto inserido:');
      console.log('- ID:', data[0].id);
      console.log('- Nome:', data[0].name);
      console.log('- Criado em:', data[0].created_at);
      console.log('');
      
      // Deletar o produto de teste
      await supabase
        .from('products')
        .delete()
        .eq('name', 'BARCA DE COXINHA');
      
      console.log('🧹 Produto de teste removido');
      console.log('');
      console.log('🎉 CORREÇÃO FUNCIONOU!');
      console.log('Agora você pode adicionar produtos no site.');
      console.log('');
    }
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testarAposCorrecao(); 