const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'SUA_CHAVE_AQUI';

console.log('🔧 Configurando Supabase...\n');

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  try {
    console.log('📋 Testando conexão com Supabase...');
    console.log('🔗 URL:', supabaseUrl);
    console.log('🔑 Chave configurada:', !!supabaseKey);
    
    // Testar conexão buscando dados
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro na conexão:', error.message);
      
      if (error.message.includes('Invalid API key')) {
        console.log('\n🔧 SOLUÇÃO:');
        console.log('1. Acesse: https://app.supabase.com/dashboard/project/mvflxblwnzhaotyzmyzf');
        console.log('2. Vá em Settings → API');
        console.log('3. Copie a "anon public" key');
        console.log('4. Configure a variável SUPABASE_ANON_KEY');
      }
      
      return false;
    }
    
    console.log('✅ Conexão com Supabase estabelecida!');
    console.log('📦 Produtos encontrados:', data?.length || 0);
    
    // Testar configuração
    const { data: config, error: configError } = await supabase
      .from('menu_config')
      .select('*')
      .limit(1);
    
    if (configError) {
      console.log('⚠️ Configuração não encontrada');
    } else {
      console.log('⚙️ Configuração encontrada');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    return false;
  }
}

async function showNextSteps() {
  console.log('\n🎯 PRÓXIMOS PASSOS:');
  console.log('\n1. 📋 Obter credenciais:');
  console.log('   - Acesse: https://app.supabase.com/dashboard/project/mvflxblwnzhaotyzmyzf');
  console.log('   - Vá em Settings → API');
  console.log('   - Copie a "anon public" key');
  
  console.log('\n2. ⚙️ Configurar Railway:');
  console.log('   - Vá em: https://railway.app/dashboard/project/[SEU_PROJETO]');
  console.log('   - Clique em "Variables"');
  console.log('   - Adicione:');
  console.log('     VITE_SUPABASE_URL=https://mvflxblwnzhaotyzmyzf.supabase.co');
  console.log('     VITE_SUPABASE_ANON_KEY=sua-chave-aqui');
  
  console.log('\n3. 🔄 Migrar dados:');
  console.log('   - Execute: node migrate-to-supabase.js');
  
  console.log('\n4. 🧪 Testar aplicação:');
  console.log('   - Acesse: https://hotdog-praca-production.up.railway.app');
  console.log('   - Teste adicionar produtos');
}

// Executar teste
testSupabaseConnection().then(success => {
  if (success) {
    console.log('\n🎉 Supabase configurado com sucesso!');
  } else {
    console.log('\n⚠️ Configuração incompleta');
  }
  
  showNextSteps();
}); 