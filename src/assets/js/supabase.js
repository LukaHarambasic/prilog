import { createClient } from '@supabase/supabase-js'

export const sb = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_TOKEN)
