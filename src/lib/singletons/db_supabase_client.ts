import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseClientSingleton = () => {
	return createClient(supabaseUrl, supabaseKey);
};

declare const globalThis: {
	supabaseGlobal: ReturnType<typeof supabaseClientSingleton>;
} & typeof global;

const supabase = globalThis.supabaseGlobal ?? supabaseClientSingleton();

export default supabase;

if (process.env.NODE_ENV !== "production") globalThis.supabaseGlobal = supabase;
