import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory cache
let cachedData: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached GitHub starred repos');
      return new Response(JSON.stringify(cachedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Fetching fresh GitHub starred repos');
    
    const response = await fetch('https://api.github.com/users/samranjithpaul/starred?per_page=8', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const repos = await response.json();
    
    // Transform the data to only include what we need
    const transformedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || 'No description available',
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
      topics: repo.topics || [],
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
    }));

    // Update cache
    cachedData = transformedRepos;
    cacheTimestamp = now;

    console.log(`Successfully fetched ${transformedRepos.length} starred repos`);

    return new Response(JSON.stringify(transformedRepos), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in github-starred function:', errorMessage);
    
    // Return cached data if available, even if stale
    if (cachedData) {
      console.log('Returning stale cached data due to error');
      return new Response(JSON.stringify(cachedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
