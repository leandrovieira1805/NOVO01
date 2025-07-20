const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzc1ODYsImV4cCI6MjA2ODU1MzU4Nn0.-mF1VTgNkuqQ4JaZiusG-ms3jni81nVwDBkEo2Q-pQY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testarProdutoEspecifico() {
  console.log('🔍 Testando produto específico: BARCA DE COXINHA');
  
  // Simular o produto que está sendo adicionado
  const produto = {
    name: 'BARCA DE COXINHA',
    price: 15.00,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lanches',
    available: true
  };
  
  console.log('📋 Análise do produto:');
  console.log('- Nome:', produto.name, '(', produto.name.length, 'caracteres)');
  console.log('- Categoria:', produto.category, '(', produto.category.length, 'caracteres)');
  console.log('- Imagem:', produto.image.length, 'caracteres');
  console.log('- Preço:', produto.price);
  console.log('');
  
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(produto)
      .select();
    
    if (error) {
      console.error('❌ Erro ao inserir produto:', error);
      console.log('');
      console.log('🔧 POSSÍVEIS SOLUÇÕES:');
      console.log('');
      console.log('1. 🌐 Acesse: https://app.supabase.com/dashboard/project/mvflxblwnzhaotyzmyzf');
      console.log('2. 📊 Vá em "SQL Editor"');
      console.log('3. 🔧 Execute estes comandos:');
      console.log('');
      console.log('   ALTER TABLE products ALTER COLUMN image TYPE VARCHAR(1000);');
      console.log('   ALTER TABLE products ALTER COLUMN name TYPE VARCHAR(500);');
      console.log('   ALTER TABLE products ALTER COLUMN category TYPE VARCHAR(200);');
      console.log('');
      console.log('4. ✅ Clique em "Run" para cada comando');
      console.log('');
    } else {
      console.log('✅ Produto inserido com sucesso!');
      console.log('📦 Dados inseridos:', data[0]);
      
      // Deletar o produto de teste
      await supabase
        .from('products')
        .delete()
        .eq('name', 'BARCA DE COXINHA');
      
      console.log('🧹 Produto de teste removido');
    }
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testarProdutoEspecifico(); 