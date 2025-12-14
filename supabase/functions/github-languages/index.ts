import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache for 1 hour
let cachedData: { languages: Record<string, number>; percentages: Record<string, number> } | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const GITHUB_USERNAME = 'samranjithpaul';
const MIN_PERCENTAGE_THRESHOLD = 2; // Ignore languages below 2%

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached language data');
      return new Response(JSON.stringify(cachedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const githubToken = Deno.env.get('GITHUB_TOKEN');
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Lovable-Portfolio',
    };
    
    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}`;
      console.log('Using authenticated GitHub API request');
    } else {
      console.log('Warning: No GITHUB_TOKEN set, using unauthenticated requests (60/hour limit)');
    }

    // Fetch all public repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
      { headers }
    );

    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error('GitHub repos API error:', reposResponse.status, errorText);
      
      // Return stale cache if available
      if (cachedData) {
        console.log('Returning stale cached data due to API error');
        return new Response(JSON.stringify(cachedData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`GitHub API returned ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();
    console.log(`Fetched ${repos.length} repositories`);

    // Aggregate language bytes across all repos
    const languageTotals: Record<string, number> = {};
    
    for (const repo of repos) {
      if (repo.fork) continue; // Skip forked repos
      
      const langResponse = await fetch(repo.languages_url, { headers });
      
      if (langResponse.ok) {
        const languages = await langResponse.json();
        for (const [lang, bytes] of Object.entries(languages)) {
          languageTotals[lang] = (languageTotals[lang] || 0) + (bytes as number);
        }
      }
    }

    // Calculate total bytes
    const totalBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);
    
    if (totalBytes === 0) {
      cachedData = { languages: {}, percentages: {} };
      cacheTimestamp = now;
      return new Response(JSON.stringify(cachedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate percentages and filter by threshold
    const percentages: Record<string, number> = {};
    for (const [lang, bytes] of Object.entries(languageTotals)) {
      const percentage = Math.round((bytes / totalBytes) * 100);
      if (percentage >= MIN_PERCENTAGE_THRESHOLD) {
        percentages[lang] = percentage;
      }
    }

    // Sort by percentage descending
    const sortedPercentages = Object.fromEntries(
      Object.entries(percentages).sort(([, a], [, b]) => b - a)
    );

    console.log('Language percentages:', sortedPercentages);

    cachedData = { 
      languages: languageTotals, 
      percentages: sortedPercentages 
    };
    cacheTimestamp = now;

    return new Response(JSON.stringify(cachedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching GitHub languages:', error);
    
    // Return stale cache if available
    if (cachedData) {
      console.log('Returning stale cached data due to error');
      return new Response(JSON.stringify(cachedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
