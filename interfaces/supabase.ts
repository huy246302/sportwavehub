// src/types/supabase.ts

export interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    maxAge?: number;
    path?: string;
  }
  
  export interface SupabaseClientOptions {
    cookies?: {
      getAll: () => { name: string; value: string; options?: CookieOptions }[];
      setAll: (cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) => void;
    };
  }
  