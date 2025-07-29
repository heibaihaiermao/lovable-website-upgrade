import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://teauxcpcqbgdbvlorksj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYXV4Y3BjcWJnZGJ2bG9ya3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyOTQzOTMsImV4cCI6MjA2ODg3MDM5M30.0Kjzy_T2Ge4GTT7Ty8F4zmaLkdqVMRoXrcZ3piNF8r0';
export const supabase = createClient(supabaseUrl, supabaseKey)
