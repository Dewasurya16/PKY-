import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { InfoRequest } from "@/lib/types/database";

export async function getAllInfoRequests(): Promise<InfoRequest[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("info_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch info requests: ${error.message}`);
  }

  return JSON.parse(JSON.stringify(data ?? []));
}
