-- 🚀 CONFIGURAÇÃO DO SUPABASE PARA HOTDOG PRAÇA
-- Execute este script no SQL Editor do Supabase

-- ========================================
-- TABELA: products (Produtos)
-- ========================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  image VARCHAR(500),
  category VARCHAR(100) DEFAULT 'Lanches',
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TABELA: menu_config (Configuração do Menu)
-- ========================================
CREATE TABLE IF NOT EXISTS menu_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  daily_offer JSONB,
  pix_key VARCHAR(255),
  pix_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_products_available ON products(available);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- ========================================
-- FUNÇÃO PARA ATUALIZAR updated_at
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ========================================
-- TRIGGERS PARA ATUALIZAR updated_at
-- ========================================
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_config_updated_at 
  BEFORE UPDATE ON menu_config 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ========================================

-- Habilitar RLS nas tabelas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_config ENABLE ROW LEVEL SECURITY;

-- Política para products: Permitir leitura pública, escrita para todos
CREATE POLICY "Produtos: Leitura pública" ON products
  FOR SELECT USING (true);

CREATE POLICY "Produtos: Inserção pública" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Produtos: Atualização pública" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Produtos: Deleção pública" ON products
  FOR DELETE USING (true);

-- Política para menu_config: Permitir leitura pública, escrita para todos
CREATE POLICY "Config: Leitura pública" ON menu_config
  FOR SELECT USING (true);

CREATE POLICY "Config: Inserção pública" ON menu_config
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Config: Atualização pública" ON menu_config
  FOR UPDATE USING (true);

CREATE POLICY "Config: Deleção pública" ON menu_config
  FOR DELETE USING (true);

-- ========================================
-- DADOS INICIAIS (OPCIONAL)
-- ========================================

-- Inserir configuração inicial
INSERT INTO menu_config (pix_key, pix_name, daily_offer) 
VALUES ('', '', null)
ON CONFLICT DO NOTHING;

-- Inserir produtos de exemplo (opcional)
INSERT INTO products (name, price, image, category, available) VALUES
  ('Hot Dog Tradicional', 8.50, 'https://images.pexels.com/photos/4676401/pexels-photo-4676401.jpeg?auto=compress&cs=tinysrgb&w=400', 'Lanches', true),
  ('Hot Dog Especial', 12.00, 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400', 'Lanches', true),
  ('Refrigerante', 4.00, 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=400', 'Bebidas', true)
ON CONFLICT DO NOTHING;

-- ========================================
-- MENSAGEM DE SUCESSO
-- ========================================
SELECT '✅ Banco de dados configurado com sucesso!' as status; 