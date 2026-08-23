import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bzofedjkwmgbtsphmvjl.supabase.co";

const supabaseAnonKey =
  "sb_publishable_VRlzHOJoc3xMljvTLNl8AQ_lURvflbu";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);