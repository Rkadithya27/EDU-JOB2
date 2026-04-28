import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bgnggupywlrfa0dldhsh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.warn("Supabase Anon Key is missing! Email Authentication will fail.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'dummy_key_to_prevent_crash');

// MOCK OTP Logic for Local Development if keys are missing
if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_ANON_KEY_HERE') {
  console.warn("Using MOCK OTP system since Supabase Anon Key is invalid.");
  
  supabase.auth.signInWithOtp = async ({ email }) => {
    const mockOtp = "123456";
    console.log(`[MOCK EMAIL SERVER] An email was 'sent' to ${email} with OTP: ${mockOtp}`);
    alert(`(Dev Mode) 2FA Email sent to ${email}!\n\nYour Mock OTP is: ${mockOtp}`);
    return { data: {}, error: null };
  };
  
  supabase.auth.verifyOtp = async ({ email, token }) => {
    if (token === '123456') {
      return { data: { user: { email } }, error: null };
    }
    return { data: null, error: { message: "Invalid OTP Code. Please try '123456'." } };
  };
}
