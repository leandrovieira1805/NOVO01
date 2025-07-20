const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzc1ODYsImV4cCI6MjA2ODU1MzU4Nn0.-mF1VTgNkuqQ4JaZiusG-ms3jni81nVwDBkEo2Q-pQY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function corrigirTabela() {
  console.log('🔧 Corrigindo estrutura da tabela products...');
  
  try {
    // Executar a correção via SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE products ALTER COLUMN image TYPE VARCHAR(1000);'
    });
    
    if (error) {
      console.error('❌ Erro ao corrigir tabela:', error);
      console.log('');
      console.log('📋 INSTRUÇÕES MANUAIS:');
      console.log('');
      console.log('1. 🌐 Acesse: https://app.supabase.com/dashboard/project/mvflxblwnzhaotyzmyzf');
      console.log('2. 📊 Vá em "SQL Editor"');
      console.log('3. 🔧 Cole e execute este comando:');
      console.log('');
      console.log('   ALTER TABLE products ALTER COLUMN image TYPE VARCHAR(1000);');
      console.log('');
      console.log('4. ✅ Clique em "Run"');
      console.log('');
    } else {
      console.log('✅ Tabela corrigida com sucesso!');
    }
  } catch (error) {
    console.error('❌ Erro geral:', error);
    console.log('');
    console.log('📋 INSTRUÇÕES MANUAIS:');
    console.log('');
    console.log('1. 🌐 Acesse: https://app.supabase.com/dashboard/project/mvflxblwnzhaotyzmyzf');
    console.log('2. 📊 Vá em "SQL Editor"');
    console.log('3. 🔧 Cole e execute este comando:');
    console.log('');
    console.log('   ALTER TABLE products ALTER COLUMN image TYPE VARCHAR(1000);');
    console.log('');
    console.log('4. ✅ Clique em "Run"');
    console.log('');
  }
}

corrigirTabela(); 