console.log('🔑 CONFIGURANDO CHAVE DO SUPABASE\n');

console.log('📋 PASSO A PASSO:');
console.log('');
console.log('1. 🌐 Acesse o Supabase:');
console.log('   https://app.supabase.com/dashboard/project/mvflxblwnzhaotyzmyzf');
console.log('');
console.log('2. ⚙️ Vá em "Settings" → "API"');
console.log('');
console.log('3. 📋 Copie a "anon public" key');
console.log('   (É uma chave longa que começa com "eyJ...")');
console.log('');
console.log('4. 🔧 Cole a chave no arquivo:');
console.log('   src/supabase/config.js');
console.log('');
console.log('5. 💾 Substitua esta linha:');
console.log('   const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || \'sua-chave-aqui\'');
console.log('');
console.log('6. 🚀 Faça commit e push:');
console.log('   git add .');
console.log('   git commit -m "Corrigir chave Supabase"');
console.log('   git push');
console.log('');
console.log('7. 🚂 Deploy no Railway:');
console.log('   railway up');
console.log('');

console.log('🔍 EXEMPLO DE CHAVE:');
console.log('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI5NzQsImV4cCI6MjA1MDU0ODk3NH0.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
console.log('');

console.log('⚠️  IMPORTANTE:');
console.log('- A chave é muito longa (cerca de 200 caracteres)');
console.log('- Copie ela completamente, incluindo o final');
console.log('- Não deixe espaços extras');
console.log('- Teste localmente antes do deploy');
console.log('');

console.log('🧪 TESTAR LOCALMENTE:');
console.log('node test-supabase-key.js');
console.log(''); 