import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Database, Settings } from 'lucide-react';

interface SupabaseConfigProps {
  onConnect: (url: string, anonKey: string) => void;
}

export function SupabaseConfig({ onConnect }: SupabaseConfigProps) {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!url || !anonKey) return;
    
    setIsConnecting(true);
    try {
      // Basic validation
      if (!url.includes('supabase.co') && !url.includes('localhost')) {
        throw new Error('Please enter a valid Supabase URL');
      }
      
      onConnect(url, anonKey);
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect. Please check your credentials.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Connect to Supabase</CardTitle>
          <CardDescription>
            Enter your Supabase project credentials to get started with SmartRecipeGen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-gray-700">
              Project URL
            </label>
            <Input
              id="url"
              type="url"
              placeholder="https://your-project.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="anonKey" className="text-sm font-medium text-gray-700">
              Anon Key
            </label>
            <Input
              id="anonKey"
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleConnect} 
            disabled={!url || !anonKey || isConnecting}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {isConnecting ? (
              <>
                <Settings className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect to Supabase'
            )}
          </Button>
          <div className="text-xs text-gray-500 text-center">
            Don't have a Supabase project?{' '}
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              Create one here
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}