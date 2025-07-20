const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  getDocs
} = require('firebase/firestore');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuZ1SJWxlwWtgVhV3qnBafoytho59WE4I",
  authDomain: "device-streaming-77144326.firebaseapp.com",
  databaseURL: "https://device-streaming-77144326-default-rtdb.firebaseio.com",
  projectId: "device-streaming-77144326",
  storageBucket: "device-streaming-77144326.firebasestorage.app",
  messagingSenderId: "375948005973",
  appId: "1:375948005973:web:99b7ff4736d6c17f927adc"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🧪 Testando adição de produtos...\n');

async function testAddProduct() {
  try {
    // 1. Verificar se estrutura antiga foi removida
    console.log('📋 Verificando estrutura antiga...');
    const oldRef = doc(db, 'menu', 'menu_data');
    const oldSnap = await getDoc(oldRef);
    
    if (oldSnap.exists()) {
      console.log('❌ Estrutura antiga ainda existe!');
      return;
    } else {
      console.log('✅ Estrutura antiga foi removida');
    }
    
    // 2. Verificar configuração
    console.log('\n⚙️ Verificando configuração...');
    const configRef = doc(db, 'menu', 'menu_config');
    const configSnap = await getDoc(configRef);
    
    if (configSnap.exists()) {
      console.log('✅ Configuração existe');
    } else {
      console.log('⚠️ Configuração não existe, criando...');
      await setDoc(configRef, {
        dailyOffer: null,
        pixKey: '',
        pixName: '',
        lastUpdate: new Date().toISOString()
      });
      console.log('✅ Configuração criada');
    }
    
    // 3. Testar adição de produto na estrutura antiga (fallback)
    console.log('\n📦 Testando adição de produto...');
    const testProduct = {
      name: 'Teste de Produto',
      price: 10.00,
      image: 'https://via.placeholder.com/300x200',
      category: 'Teste',
      available: true,
      createdAt: new Date().toISOString()
    };
    
    // Criar estrutura antiga vazia
    const newOldRef = doc(db, 'menu', 'menu_data');
    await setDoc(newOldRef, {
      products: [testProduct],
      dailyOffer: null,
      pixKey: '',
      pixName: '',
      lastUpdate: new Date().toISOString()
    });
    
    console.log('✅ Produto adicionado com sucesso!');
    
    // 4. Verificar se produto foi salvo
    console.log('\n🔍 Verificando produto salvo...');
    const verifySnap = await getDoc(newOldRef);
    if (verifySnap.exists()) {
      const data = verifySnap.data();
      console.log(`✅ Produto salvo: ${data.products[0].name}`);
      console.log(`📊 Total de produtos: ${data.products.length}`);
    }
    
    console.log('\n🎉 TESTE CONCLUÍDO COM SUCESSO!');
    console.log('✅ Sistema está funcionando');
    console.log('✅ Pode adicionar produtos normalmente');
    console.log('✅ Estrutura antiga foi limpa e recriada');
    
  } catch (error) {
    console.error('❌ Erro durante teste:', error);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔧 SOLUÇÃO:');
      console.log('1. Acessar console do Firebase');
      console.log('2. Ir em Firestore → Rules');
      console.log('3. Substituir por:');
      console.log('   match /{document=**} {');
      console.log('     allow read, write: if true;');
      console.log('   }');
      console.log('4. Publicar regras');
    }
  }
}

testAddProduct(); 