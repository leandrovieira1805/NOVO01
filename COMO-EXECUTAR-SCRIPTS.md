# 🔧 COMO EXECUTAR OS SCRIPTS

## 📋 TIPOS DE SCRIPTS

### **1. Script SQL (Supabase Setup)**

**Onde executar:** Dashboard do Supabase

**Passo a passo:**
1. Acesse: https://app.supabase.com
2. Entre no seu projeto
3. Vá em **"SQL Editor"**
4. Clique em **"New query"**
5. Cole o conteúdo do arquivo `supabase-setup.sql`
6. Clique em **"Run"** (ou pressione Ctrl+Enter)

**Resultado esperado:**
```
✅ Banco de dados configurado com sucesso!
```

### **2. Scripts Node.js (Terminal)**

**Onde executar:** Terminal/Prompt de Comando

**Passo a passo:**
1. Abra o terminal na pasta do projeto
2. Execute o comando: `node nome-do-script.js`

#### **Scripts disponíveis:**

**Migração para Supabase:**
```bash
node migrate-to-supabase.js
```

**Teste de adição de produtos:**
```bash
node test-add-product.js
```

**Verificar status atual:**
```bash
node test-size-fix.js
```

**Limpar estrutura antiga:**
```bash
node clean-old-structure.js
```

### **3. Scripts com Variáveis de Ambiente**

**Para scripts que precisam de credenciais:**

**Opção 1: Configurar temporariamente**
```bash
# Windows (PowerShell)
$env:SUPABASE_URL="https://seu-projeto.supabase.co"
$env:SUPABASE_ANON_KEY="sua-chave-anonima"
node migrate-to-supabase.js

# Windows (CMD)
set SUPABASE_URL=https://seu-projeto.supabase.co
set SUPABASE_ANON_KEY=sua-chave-anonima
node migrate-to-supabase.js
```

**Opção 2: Criar arquivo .env**
```bash
# Criar arquivo .env na raiz do projeto
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
```

## 🎯 EXEMPLOS PRÁTICOS

### **Exemplo 1: Configurar Supabase**
```bash
# 1. Abrir terminal na pasta do projeto
cd C:\Users\pc\Desktop\project

# 2. Verificar se está na pasta correta
dir
# Deve mostrar: package.json, src/, etc.

# 3. Executar script
node migrate-to-supabase.js
```

### **Exemplo 2: Testar Sistema**
```bash
# 1. Testar se Firebase ainda funciona
node test-add-product.js

# 2. Verificar status atual
node test-size-fix.js

# 3. Limpar estrutura antiga (se necessário)
node clean-old-structure.js
```

### **Exemplo 3: Migração Completa**
```bash
# 1. Configurar variáveis
set SUPABASE_URL=https://abc123.supabase.co
set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 2. Executar migração
node migrate-to-supabase.js

# 3. Verificar resultado
# Deve mostrar: "🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!"
```

## 🚨 SOLUÇÃO DE PROBLEMAS

### **Erro: "node não é reconhecido"**
```bash
# Instalar Node.js primeiro
# Baixar de: https://nodejs.org/
```

### **Erro: "Cannot find module"**
```bash
# Instalar dependências
npm install
```

### **Erro: "Invalid API key"**
```bash
# Verificar se as credenciais estão corretas
# Verificar se o projeto Supabase está ativo
```

### **Erro: "Permission denied"**
```bash
# Verificar se está na pasta correta
# Verificar permissões do arquivo
```

## 📱 COMANDOS ÚTEIS

### **Verificar Node.js:**
```bash
node --version
npm --version
```

### **Listar arquivos:**
```bash
# Windows
dir
dir *.js

# Linux/Mac
ls
ls *.js
```

### **Navegar pastas:**
```bash
# Entrar na pasta
cd nome-da-pasta

# Voltar uma pasta
cd ..

# Ir para pasta do projeto
cd C:\Users\pc\Desktop\project
```

### **Ver conteúdo de arquivo:**
```bash
# Windows
type nome-do-arquivo.js

# Linux/Mac
cat nome-do-arquivo.js
```

## 🎯 DICAS IMPORTANTES

### **✅ Sempre:**
- Execute scripts na pasta correta do projeto
- Verifique se as dependências estão instaladas
- Configure variáveis de ambiente quando necessário
- Leia as mensagens de erro com atenção

### **❌ Nunca:**
- Execute scripts sem entender o que fazem
- Ignore mensagens de erro
- Execute em pasta errada
- Use credenciais incorretas

## 📊 RESUMO DOS SCRIPTS

| Script | Onde Executar | Função |
|--------|---------------|--------|
| `supabase-setup.sql` | Dashboard Supabase | Configurar banco |
| `migrate-to-supabase.js` | Terminal | Migrar dados |
| `test-add-product.js` | Terminal | Testar adição |
| `test-size-fix.js` | Terminal | Verificar status |
| `clean-old-structure.js` | Terminal | Limpar Firebase |

---

**💡 DICA:** Sempre leia as mensagens que aparecem no terminal para entender o que está acontecendo! 