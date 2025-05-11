import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nqdyiqudoniktrnjouxw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZHlpcXVkb25pa3RybmpvdXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NDE3MzksImV4cCI6MjA2MjUxNzczOX0.87M6wJwdTwyu_DAaH8_pbKM3rkmbm-fm-djlnhMvMpo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);