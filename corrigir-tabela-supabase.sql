-- 🔧 CORRIGIR ESTRUTURA DA TABELA PRODUCTS
-- Execute este script no SQL Editor do Supabase

-- ========================================
-- CORRIGIR LIMITE DO CAMPO IMAGE
-- ========================================

-- Alterar o campo image para suportar URLs mais longas
ALTER TABLE products 
ALTER COLUMN image TYPE VARCHAR(1000);

-- ========================================
-- VERIFICAR ESTRUTURA ATUAL
-- ========================================
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- ========================================
-- MENSAGEM DE SUCESSO
-- ========================================
SELECT '✅ Campo image corrigido para VARCHAR(1000)!' as status; 