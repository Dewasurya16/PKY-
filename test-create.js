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

  console.log('Inserting news...');

  const insertPayload = {
    title: 'Test Image Insert',
    slug: 'test-image-insert',
    excerpt: 'Test excerpt',
    content: 'Test content',
    category: 'Layanan',
    image_url: 'https://okdixuuvwzcfyomzksss.supabase.co/storage/v1/object/public/news-images/test-image-insert.jpg',
    published_at: new Date().toISOString(),
    is_published: true
  };

  const { error, data } = await supabase
    .from('news')
    .insert(insertPayload)
    .select('*')
    .single();
    
  console.log('Result:', data ? 'SUCCESS' : 'ERROR', error);
  if (data) {
    await supabase.from('news').delete().eq('id', data.id);
  }
}
run();
