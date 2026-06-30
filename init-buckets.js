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

  console.log('Creating missing buckets...');
  
  const buckets = ['news-images', 'documents', 'facility-images'];
  
  for (const bucket of buckets) {
    const { data, error } = await supabase.storage.createBucket(bucket, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      fileSizeLimit: 25 * 1024 * 1024 // 25 MB
    });
    
    if (error) {
      console.log('Error creating ' + bucket + ' (maybe it exists?):', error.message);
    } else {
      console.log('Successfully created bucket:', bucket);
    }
  }
}
run();
