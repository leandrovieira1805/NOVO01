import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mvflxblwnzhaotyzmyzf.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI5NzQsImV4cCI6MjA1MDU0ODk3NH0.sua-chave-anonima'

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Configuração para desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Supabase: Modo desenvolvimento ativo')
  console.log('📋 URL:', supabaseUrl)
  console.log('🔑 Chave configurada:', !!supabaseKey)
}

export default supabase 