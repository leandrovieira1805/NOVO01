# Configuração do Firebase

Para que todos os usuários vejam as mesmas modificações em tempo real, você precisa configurar o Firebase.

## Passo a Passo:

### 1. Criar projeto no Firebase
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em "Criar projeto"
3. Digite um nome para o projeto (ex: "cardapio-digital")
4. Siga os passos de configuração

### 2. Ativar Realtime Database
1. No console do Firebase, vá para "Realtime Database"
2. Clique em "Criar banco de dados"
3. Escolha uma localização (ex: us-central1)
4. Inicie em modo de teste (depois você pode configurar regras de segurança)

### 3. Obter configuração
1. No console do Firebase, clique na engrenagem (⚙️) ao lado de "Visão geral do projeto"
2. Selecione "Configurações do projeto"
3. Role para baixo até "Seus aplicativos"
4. Clique em "Adicionar app" e escolha "Web"
5. Digite um nome para o app (ex: "cardapio-web")
6. Copie a configuração que aparece

### 4. Atualizar arquivo de configuração
Substitua o conteúdo do arquivo `src/firebase/config.ts` pela configuração real do seu projeto:

```typescript
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
```

### 5. Configurar regras de segurança (opcional)
No Realtime Database, vá para "Regras" e configure:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**⚠️ ATENÇÃO:** Esta configuração permite que qualquer pessoa leia e escreva no banco. Para produção, configure regras mais seguras.

## Como funciona:

- **Produtos**: Salvos em `/products`
- **Ofertas**: Salvas em `/ofertas` 
- **Promoções**: Salvas em `/promotions`

Todas as mudanças feitas no painel admin serão sincronizadas em tempo real para todos os usuários que acessarem o site.

## Estrutura do banco:

```
{
  "products": {
    "produto1": {
      "name": "Hambúrguer",
      "price": 15.90,
      "category": "lanches",
      "available": true,
      "image": "data:image/...",
      "description": "Delicioso hambúrguer"
    }
  },
  "ofertas": {
    "oferta1": {
      "image": "data:image/...",
      "price": 25.90
    }
  },
  "promotions": {
    "promo1": {
      "title": "Promoção Especial",
      "description": "Desconto de 20%",
      "active": true,
      "discountPercent": 20
    }
  }
}
``` 