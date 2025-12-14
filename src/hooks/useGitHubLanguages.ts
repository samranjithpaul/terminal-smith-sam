import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LanguageData {
  languages: Record<string, number>;
  percentages: Record<string, number>;
}

interface UseGitHubLanguagesResult {
  languages: Array<{ name: string; level: number }>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGitHubLanguages(): UseGitHubLanguagesResult {
  const [languages, setLanguages] = useState<Array<{ name: string; level: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke<LanguageData>('github-languages');
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      
      if (data?.percentages) {
        const languageArray = Object.entries(data.percentages).map(([name, level]) => ({
          name,
          level,
        }));
        setLanguages(languageArray);
      } else if (data && 'error' in data) {
        throw new Error((data as { error: string }).error);
      } else {
        setLanguages([]);
      }
    } catch (err) {
      console.error('Failed to fetch GitHub languages:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch languages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return { languages, loading, error, refetch: fetchLanguages };
}
