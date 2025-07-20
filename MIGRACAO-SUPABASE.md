# 🚀 MIGRAÇÃO: Firebase → Supabase

## 🎯 Por que Supabase?

### **✅ Vantagens:**
- **Open Source** - Código aberto e transparente
- **PostgreSQL** - Banco de dados robusto e confiável
- **Melhor Performance** - Mais rápido que Firebase
- **Sem Limites** - Escalabilidade ilimitada
- **Interface Web** - Dashboard intuitivo
- **APIs Automáticas** - REST e GraphQL automáticos

### **🔧 Recursos Incluídos:**
- ✅ Banco de dados PostgreSQL
- ✅ Autenticação
- ✅ Storage de arquivos
- ✅ APIs automáticas
- ✅ Dashboard web
- ✅ Sincronização em tempo real

## 📋 PLANO DE MIGRAÇÃO

### **FASE 1: Configuração do Supabase**
1. Criar conta no Supabase
2. Criar projeto
3. Configurar banco de dados
4. Configurar autenticação

### **FASE 2: Migração do Código**
1. Instalar dependências
2. Configurar cliente Supabase
3. Migrar serviços
4. Atualizar componentes

### **FASE 3: Migração dos Dados**
1. Exportar dados do Firebase
2. Importar no Supabase
3. Testar funcionamento

## 🚀 COMO COMEÇAR

### **1. Criar Conta Supabase:**
- Acesse: https://supabase.com
- Clique em "Start your project"
- Faça login com GitHub

### **2. Criar Projeto:**
- Clique em "New Project"
- Escolha organização
- Digite nome: "hotdog-praca"
- Escolha região: São Paulo
- Clique em "Create new project"

### **3. Configurar Banco:**
- Vá em "Table Editor"
- Criar tabelas conforme estrutura

## 📊 ESTRUTURA DO BANCO

### **Tabela: products**
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR,
  category VARCHAR,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Tabela: menu_config**
```sql
CREATE TABLE menu_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  daily_offer JSONB,
  pix_key VARCHAR,
  pix_name VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 CONFIGURAÇÃO DO CÓDIGO

### **1. Instalar Dependências:**
```bash
npm install @supabase/supabase-js
```

### **2. Configurar Cliente:**
```javascript
// src/supabase/config.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'SUA_URL_SUPABASE'
const supabaseKey = 'SUA_CHAVE_SUPABASE'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### **3. Migrar Serviços:**
- Substituir Firebase por Supabase
- Atualizar queries
- Manter mesma interface

## 📱 URLs IMPORTANTES

### **Supabase:**
- **Dashboard:** https://app.supabase.com
- **Documentação:** https://supabase.com/docs

### **Projeto Atual:**
- **Site:** https://hotdog-praca-production.up.railway.app
- **Admin:** https://hotdog-praca-production.up.railway.app/admin

## 🎯 PRÓXIMOS PASSOS

1. **Criar conta Supabase**
2. **Criar projeto**
3. **Configurar banco**
4. **Migrar código**
5. **Testar funcionamento**

---

**💡 DICA:** O Supabase é muito mais simples e poderoso que o Firebase! 