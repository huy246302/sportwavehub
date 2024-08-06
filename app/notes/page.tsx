// src/pages/notes.tsx
import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data: notes, error } = await supabase.from('notes').select();

  if (error) {
    return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
