const { createClient } = require('@supabase/supabase-js');

// Testar com a chave que você forneceu
const supabaseUrl = 'https://mvflxblwnzhaotyzmyzf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzc1ODYsImV4cCI6MjA2ODU1MzU4Nn0.-mF1VTgNkuqQ4JaZiusG-ms3jni81nVwDBkEo2Q-pQY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔧 Testando conexão com Supabase...');
  console.log('📋 URL:', supabaseUrl);
  console.log('🔑 Chave:', supabaseKey.substring(0, 50) + '...');
  
  try {
    // Testar conexão básica
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro na conexão:', error);
    } else {
      console.log('✅ Conexão bem-sucedida!');
      console.log('📦 Dados recebidos:', data);
    }
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testConnection(); 