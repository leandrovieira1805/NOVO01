const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = 'sb_secret_LVWFC1IHzZ41KWCuFvwPGw_rizFCtK3';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Verificando dados no Supabase...\n');

async function verificarDados() {
  try {
    // Verificar produtos
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (productsError) {
      console.error('❌ Erro ao buscar produtos:', productsError);
      return;
    }
    
    console.log(`📦 Produtos no Supabase: ${products.length}`);
    console.log('');
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   - Preço: R$ ${product.price}`);
      console.log(`   - Categoria: ${product.category}`);
      console.log(`   - Disponível: ${product.available ? 'Sim' : 'Não'}`);
      console.log(`   - Criado: ${new Date(product.created_at).toLocaleString()}`);
      console.log('');
    });
    
    // Verificar configuração
    const { data: config, error: configError } = await supabase
      .from('menu_config')
      .select('*');
    
    if (configError) {
      console.error('❌ Erro ao buscar configuração:', configError);
      return;
    }
    
    console.log(`⚙️ Configurações no Supabase: ${config.length}`);
    
    if (config.length > 0) {
      const cfg = config[0];
      console.log('   - Pix Key:', cfg.pix_key || 'Não configurado');
      console.log('   - Pix Name:', cfg.pix_name || 'Não configurado');
      console.log('   - Oferta do dia:', cfg.daily_offer ? 'Configurada' : 'Não configurada');
    }
    
    console.log('\n🎉 Verificação concluída!');
    console.log('\n📊 Resumo:');
    console.log(`   - Produtos: ${products.length}`);
    console.log(`   - Configurações: ${config.length}`);
    
    if (products.length > 0) {
      console.log('\n✅ Migração bem-sucedida!');
      console.log('🚀 Próximo passo: Configurar Railway e testar aplicação');
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

verificarDados(); 