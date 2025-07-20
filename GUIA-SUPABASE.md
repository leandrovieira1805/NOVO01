# 🚀 GUIA COMPLETO: Configurar Supabase

## 📋 PASSO A PASSO

### **PASSO 1: Criar Conta no Supabase**
1. **Acesse:** https://supabase.com
2. **Clique em:** "Start your project"
3. **Faça login** com sua conta GitHub
4. **Aceite os termos** de uso

### **PASSO 2: Criar Projeto**
1. **Clique em:** "New Project"
2. **Escolha organização** (ou crie uma)
3. **Nome do projeto:** `hotdog-praca`
4. **Senha do banco:** `hotdog123456` (ou outra senha forte)
5. **Região:** São Paulo (Brazil)
6. **Clique em:** "Create new project"

### **PASSO 3: Aguardar Setup**
- ⏳ Aguarde 2-3 minutos para o projeto ser criado
- ✅ Você receberá um email quando estiver pronto

### **PASSO 4: Configurar Banco de Dados**
1. **No dashboard do Supabase, vá em:** "SQL Editor"
2. **Clique em:** "New query"
3. **Cole o conteúdo** do arquivo `supabase-setup.sql`
4. **Clique em:** "Run" (ou Ctrl+Enter)
5. **Verifique se aparece:** "✅ Banco de dados configurado com sucesso!"

### **PASSO 5: Obter Credenciais**
1. **Vá em:** "Settings" → "API"
2. **Copie:**
   - **Project URL** (ex: `https://abc123.supabase.co`)
   - **anon public** key (chave longa)

### **PASSO 6: Configurar Variáveis de Ambiente**
1. **No Railway, vá em:** "Variables"
2. **Adicione:**
   ```
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima
   ```

### **PASSO 7: Migrar Dados**
1. **No terminal, execute:**
   ```bash
   # Configurar variáveis temporariamente
   set SUPABASE_URL=https://seu-projeto.supabase.co
   set SUPABASE_ANON_KEY=sua-chave-anonima
   
   # Executar migração
   node migrate-to-supabase.js
   ```

### **PASSO 8: Testar Aplicação**
1. **Aguarde deploy** no Railway
2. **Acesse:** https://hotdog-praca-production.up.railway.app
3. **Teste adicionar produtos**
4. **Verifique se funcionam**

## 🔧 CONFIGURAÇÃO DO CÓDIGO

### **1. Atualizar MenuContext**
```javascript
// Em src/context/MenuContext.jsx
// Substituir import do Firebase por:
import { getMenuData, addProduct, deleteProduct, setDailyOffer, updatePixConfig, subscribeToMenuChanges } from '../supabase/menuService';
```

### **2. Remover Firebase**
```bash
# Remover dependências do Firebase
npm uninstall firebase

# Remover arquivos do Firebase
rm -rf src/firebase/
```

## 📊 ESTRUTURA CRIADA

### **Tabela: products**
- `id` - UUID único
- `name` - Nome do produto
- `price` - Preço (decimal)
- `image` - URL da imagem
- `category` - Categoria
- `available` - Disponível (boolean)
- `created_at` - Data de criação
- `updated_at` - Data de atualização

### **Tabela: menu_config**
- `id` - UUID único
- `daily_offer` - Oferta do dia (JSON)
- `pix_key` - Chave PIX
- `pix_name` - Nome PIX
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## 🎯 VANTAGENS DO SUPABASE

### **✅ Performance:**
- PostgreSQL nativo
- Índices otimizados
- Queries mais rápidas

### **✅ Escalabilidade:**
- Sem limites de produtos
- Banco de dados robusto
- Backup automático

### **✅ Desenvolvimento:**
- Dashboard intuitivo
- APIs automáticas
- Documentação excelente

### **✅ Custo:**
- Plano gratuito generoso
- Sem cobranças ocultas
- Preços transparentes

## 🚨 SOLUÇÃO DE PROBLEMAS

### **Erro: "Invalid API key"**
- Verificar se as credenciais estão corretas
- Verificar se o projeto está ativo
- Aguardar alguns minutos após criação

### **Erro: "Table does not exist"**
- Executar script SQL novamente
- Verificar se está no projeto correto
- Verificar permissões

### **Erro: "Permission denied"**
- Verificar políticas RLS
- Verificar se tabelas foram criadas
- Verificar credenciais

## 📱 URLs IMPORTANTES

### **Supabase:**
- **Dashboard:** https://app.supabase.com
- **Documentação:** https://supabase.com/docs
- **SQL Editor:** https://app.supabase.com/project/[ID]/sql

### **Projeto:**
- **Site:** https://hotdog-praca-production.up.railway.app
- **Admin:** https://hotdog-praca-production.up.railway.app/admin

## 🎉 RESULTADO FINAL

Após seguir todos os passos, você terá:
- ✅ Banco de dados PostgreSQL robusto
- ✅ APIs automáticas
- ✅ Dashboard web intuitivo
- ✅ Sincronização em tempo real
- ✅ Escalabilidade ilimitada
- ✅ Melhor performance

---

**💡 DICA:** O Supabase é muito mais simples e poderoso que o Firebase! 