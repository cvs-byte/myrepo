const SUPABASE_URL = "https://kfzascdgwoehkitzhkhw.supabase.co";

const SUPABASE_KEY = "sb_publishable_8N9GLSSOooKWjJInZUE9-A_xEUzNvX3";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);