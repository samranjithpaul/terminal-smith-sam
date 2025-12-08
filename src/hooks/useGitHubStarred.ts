import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  updated_at: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface UseGitHubStarredResult {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGitHubStarred(): UseGitHubStarredResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('github-starred');
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      
      if (Array.isArray(data)) {
        setRepos(data);
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Failed to fetch GitHub starred repos:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return { repos, loading, error, refetch: fetchRepos };
}
