const fs = require("fs");
const envData = fs.readFileSync(".env.local", "utf8");
envData.split("\n").forEach(line => {
  if (line && line.includes("=")) {
    const [key, ...val] = line.split("=");
    process.env[key.trim()] = val.join("=").trim();
  }
});
const { createClient } = require("@supabase/supabase-js");

async function testSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Missing URL or KEY");
    return;
  }

  const supabase = createClient(url, key);

  console.log("Testing insert into news...");
  const { data, error } = await supabase
    .from("news")
    .insert({
      title: "Test News",
      slug: "test-news-" + Date.now(),
      excerpt: "This is a test",
      content: "Content test",
      category: "Pengumuman",
      is_published: true,
      published_at: new Date().toISOString()
    })
    .select();

  console.log("News Data:", data);
  console.log("News Error:", error);
}

testSupabase();
