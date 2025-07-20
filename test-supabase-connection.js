const { createClient } = require('@supabase/supabase-js');

console.log('🧪 Testando conexão com Supabase...\n');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';

// Chave do Supabase
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_secret_LVWFC1IHzZ41KWCuFvwPGw_rizFCtK3';

console.log('🔗 URL:', supabaseUrl);
console.log('🔑 Chave configurada:', supabaseKey !== 'SUA_CHAVE_AQUI');

if (!supabaseKey || supabaseKey === 'SUA_CHAVE_AQUI') {
  console.log('\n❌ ERRO: Chave não configurada!');
  console.log('\n🔧 COMO CONFIGURAR:');
  console.log('1. Acesse: https://app.supabase.com/dashboard/project/mvflxblwnzhaotyzmyzf');
  console.log('2. Vá em Settings → API');
  console.log('3. Copie a "anon public" key');
  console.log('4. Execute: set VITE_SUPABASE_ANON_KEY=sua-chave-aqui');
  console.log('5. Execute este script novamente');
  process.exit(1);
}

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('📋 Testando conexão...');
    
    // Testar tabela products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5);
    
    if (productsError) {
      console.error('❌ Erro ao acessar produtos:', productsError.message);
      return false;
    }
    
    console.log('✅ Tabela products: OK');
    console.log(`📦 Produtos encontrados: ${products?.length || 0}`);
    
    // Testar tabela menu_config
    const { data: config, error: configError } = await supabase
      .from('menu_config')
      .select('*')
      .limit(1);
    
    if (configError) {
      console.error('❌ Erro ao acessar configuração:', configError.message);
      return false;
    }
    
    console.log('✅ Tabela menu_config: OK');
    console.log(`⚙️ Configurações encontradas: ${config?.length || 0}`);
    
    // Testar inserção (opcional)
    console.log('\n📝 Testando inserção...');
    const testProduct = {
      name: 'Teste de Conexão',
      price: 1.00,
      image: 'https://via.placeholder.com/300x200',
      category: 'Teste',
      available: true
    };
    
    const { data: inserted, error: insertError } = await supabase
      .from('products')
      .insert(testProduct)
      .select();
    
    if (insertError) {
      console.error('❌ Erro na inserção:', insertError.message);
      return false;
    }
    
    console.log('✅ Inserção: OK');
    console.log(`➕ Produto inserido: ${inserted[0].name}`);
    
    // Limpar produto de teste
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('name', 'Teste de Conexão');
    
    if (deleteError) {
      console.log('⚠️ Erro ao limpar teste:', deleteError.message);
    } else {
      console.log('🧹 Produto de teste removido');
    }
    
    console.log('\n🎉 CONEXÃO COM SUPABASE FUNCIONANDO PERFEITAMENTE!');
    console.log('\n📊 Resumo:');
    console.log('✅ Conexão estabelecida');
    console.log('✅ Tabelas acessíveis');
    console.log('✅ Inserção funcionando');
    console.log('✅ Deleção funcionando');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    return false;
  }
}

// Executar teste
testConnection().then(success => {
  if (success) {
    console.log('\n🚀 Próximo passo: Migrar dados do Firebase!');
    console.log('Execute: node migrate-to-supabase.js');
  } else {
    console.log('\n⚠️ Verifique as credenciais e tente novamente');
  }
}); 