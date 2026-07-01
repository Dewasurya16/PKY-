import { getAllMcuRegistrations } from "@/lib/queries/mcu.queries";
import { McuRegistrationsClient } from "./McuRegistrationsClient";


export const metadata = {
  title: "Admin - Pendaftar MCU | PKY",
};

export default async function McuRegistrationsPage() {
  const registrations = await getAllMcuRegistrations();

  return <McuRegistrationsClient initialData={registrations} />;
}
