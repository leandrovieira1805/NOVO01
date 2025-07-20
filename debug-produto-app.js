const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzc1ODYsImV4cCI6MjA2ODU1MzU4Nn0.-mF1VTgNkuqQ4JaZiusG-ms3jni81nVwDBkEo2Q-pQY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugProdutoApp() {
  console.log('🔍 Debugando produto da aplicação...');
  
  // Simular diferentes cenários que podem estar causando o erro
  const cenarios = [
    {
      name: 'BARCA DE COXINHA',
      price: 15.00,
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Lanches',
      available: true
    },
    {
      name: 'BARCA DE COXINHA',
      price: 15.00,
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'Lanches',
      available: true
    },
    {
      name: 'BARCA DE COXINHA COM MUITO TEXTO EXTRA PARA TESTAR O LIMITE DE CARACTERES',
      price: 15.00,
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Lanches',
      available: true
    }
  ];
  
  for (let i = 0; i < cenarios.length; i++) {
    const produto = cenarios[i];
    console.log(`\n📋 Testando cenário ${i + 1}:`);
    console.log('- Nome:', produto.name, '(', produto.name.length, 'caracteres)');
    console.log('- Categoria:', produto.category, '(', produto.category.length, 'caracteres)');
    console.log('- Imagem:', produto.image.length, 'caracteres');
    console.log('- Preço:', produto.price);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(produto)
        .select();
      
      if (error) {
        console.error(`❌ Erro no cenário ${i + 1}:`, error);
      } else {
        console.log(`✅ Cenário ${i + 1} funcionou!`);
        
        // Deletar o produto de teste
        await supabase
          .from('products')
          .delete()
          .eq('name', produto.name);
      }
    } catch (error) {
      console.error(`❌ Erro geral no cenário ${i + 1}:`, error);
    }
  }
  
  console.log('\n🔧 SOLUÇÃO FINAL:');
  console.log('');
  console.log('Se algum cenário falhou, execute no Supabase SQL Editor:');
  console.log('');
  console.log('ALTER TABLE products ALTER COLUMN image TYPE VARCHAR(1000);');
  console.log('ALTER TABLE products ALTER COLUMN name TYPE VARCHAR(500);');
  console.log('ALTER TABLE products ALTER COLUMN category TYPE VARCHAR(200);');
  console.log('');
}

debugProdutoApp(); 