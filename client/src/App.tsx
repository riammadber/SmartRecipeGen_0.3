import React, { useState } from 'react'
import { SupabaseConfig } from '@/components/SupabaseConfig'
import { RecipeGenerator } from '@/components/RecipeGenerator'

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [supabaseConfig, setSupabaseConfig] = useState<{url: string, anonKey: string} | null>(null);

  const handleConnect = (url: string, anonKey: string) => {
    setSupabaseConfig({ url, anonKey });
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSupabaseConfig(null);
  };

  if (!isConnected) {
    return <SupabaseConfig onConnect={handleConnect} />;
  }

  return (
    <RecipeGenerator onDisconnect={handleDisconnect} />
  )
}

export default App