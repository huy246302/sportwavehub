// src/app/user/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

const UserDetail: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.user_metadata?.full_name || "N/A"}</p>
        {/* Add more user details here */}
      </div>
    </div>
  );
};

export default UserDetail;
