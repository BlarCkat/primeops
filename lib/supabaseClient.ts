import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseURL || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key are required.');
  }

export const supabase = createClient(supabaseURL, supabaseKey);