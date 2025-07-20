import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mvflxblwnzhaotyzmyzf.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Zmx4Ymx3bnpoYW90eXpteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Nzc1ODYsImV4cCI6MjA2ODU1MzU4Nn0.-mF1VTgNkuqQ4JaZiusG-ms3jni81nVwDBkEo2Q-pQY'

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Configuração para desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Supabase: Modo desenvolvimento ativo')
  console.log('📋 URL:', supabaseUrl)
  console.log('🔑 Chave configurada:', !!supabaseKey)
}

export default supabase 