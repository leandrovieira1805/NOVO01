const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzc1ODYsImV4cCI6MjA2ODU1MzU4Nn0.-mF1VTgNkuqQ4JaZiusG-ms3jni81nVwDBkEo2Q-pQY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarEstrutura() {
  console.log('🔍 Verificando estrutura da tabela products...');
  
  try {
    // Tentar inserir um produto de teste para ver qual campo está causando o erro
    const produtoTeste = {
      name: 'Teste Produto',
      price: 10.00,
      image: 'https://images.pexels.com/photos/4676401/pexels-photo-4676401.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Teste',
      available: true
    };
    
    console.log('📋 Produto de teste:');
    console.log('- Nome:', produtoTeste.name, '(', produtoTeste.name.length, 'caracteres)');
    console.log('- Categoria:', produtoTeste.category, '(', produtoTeste.category.length, 'caracteres)');
    console.log('- Imagem:', produtoTeste.image.length, 'caracteres');
    console.log('');
    
    const { data, error } = await supabase
      .from('products')
      .insert(produtoTeste)
      .select();
    
    if (error) {
      console.error('❌ Erro ao inserir produto de teste:', error);
      console.log('');
      console.log('🔧 SOLUÇÃO:');
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
      console.log('✅ Produto de teste inserido com sucesso!');
      console.log('✅ Estrutura da tabela está correta');
      
      // Deletar o produto de teste
      await supabase
        .from('products')
        .delete()
        .eq('name', 'Teste Produto');
      
      console.log('🧹 Produto de teste removido');
    }
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

verificarEstrutura(); 