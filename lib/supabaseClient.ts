import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://utmjwoylfmatxxxrqlrn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bWp3b3lsZm1hdHh4eHJxbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMDQ1NjgsImV4cCI6MjA1ODc4MDU2OH0.KL4K0H7S7G18Vb8l0zZB9ziRKaYe7-6ckyD55gau7u0";

// const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseURL || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key are required.');
}
console.log(supabaseKey, supabaseURL);

export const supabase = createClient(supabaseURL, supabaseKey);