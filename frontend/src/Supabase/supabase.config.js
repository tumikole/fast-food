import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ccovgcyugrypthfgduxm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjb3ZnY3l1Z3J5cHRoZmdkdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMDIzMTEsImV4cCI6MjA1Njg3ODMxMX0.JJcjTrzjyWbRqj0HZ0QsNZ1XxOvRJZaEGi4gkgTCLaA'
export default createClient(supabaseUrl, supabaseKey)