// src/app/settings/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';

const Settings: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="grid gap-6">
        <Link href="/settings/profile" className="block bg-white shadow-md rounded-lg p-6">
          Profile Information
        </Link>
        <Link href="/settings/password" className="block bg-white shadow-md rounded-lg p-6">
          Password Management
        </Link>
        <Link href="/settings/notifications" className="block bg-white shadow-md rounded-lg p-6">
          Notification Settings
        </Link>
        <Link href="/settings/theme" className="block bg-white shadow-md rounded-lg p-6">
          Theme Settings
        </Link>
        <Link href="/settings/privacy" className="block bg-white shadow-md rounded-lg p-6">
          Privacy Settings
        </Link>
        <Link href="/settings/account" className="block bg-white shadow-md rounded-lg p-6">
          Account Management
        </Link>
      </div>
    </div>
  );
};

export default Settings;
