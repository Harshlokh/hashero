import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bsruzsfmtzhuyqklcfti.supabase.co";
const supabaseKey = "sb_publishable_UZR9GK0ASlzNXFs-Pm9fgA_ztxyqiKu";

export const supabase = createClient(supabaseUrl, supabaseKey);