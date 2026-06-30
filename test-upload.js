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

  console.log('Testing upload...');
  const dummyFileContent = 'test image data';
  const blob = new Blob([dummyFileContent], { type: 'image/jpeg' });
  const fileName = 'test-upload-' + Date.now() + '.jpg';

  const { error: uploadError, data } = await supabase.storage
    .from('news-images')
    .upload(fileName, blob, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Upload Error:', uploadError);
  } else {
    console.log('Upload Success:', data);
    const { data: urlData } = supabase.storage
      .from('news-images')
      .getPublicUrl(fileName);
    console.log('Public URL:', urlData.publicUrl);
    await supabase.storage.from('news-images').remove([fileName]);
  }
}
run();
