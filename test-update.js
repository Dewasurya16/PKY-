const fs = require('fs');
const envData = fs.readFileSync('.env.local', 'utf8');
envData.split('\n').forEach(line => {
  if (line && line.includes('=')) {
    const parts = line.split('=');
    const key = parts[0];
    const val = parts.slice(1).join('=');
    process.env[key.trim()] = val.trim();
  }
});
const { createClient } = require('@supabase/supabase-js');

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(url, key);

  const { data: newsItems } = await supabase.from('news').select('*').limit(1);
  if (!newsItems || newsItems.length === 0) return console.log('No news found.');
  
  const news = newsItems[0];
  console.log('Updating news:', news.id);

  const updatePayload = {
    title: 'Updated Title ' + Date.now(),
    excerpt: 'Updated excerpt...',
    category: 'Layanan',
    updated_at: new Date().toISOString()
  };

  const { error, data } = await supabase
    .from('news')
    .update(updatePayload)
    .eq('id', news.id)
    .select();
    
  console.log('Result data:', data);
  console.log('Result error:', error);
}
run();
