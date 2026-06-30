import { Heart, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { site, navLinks } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import NewsletterForm from "@/components/ui/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-white pt-24 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand Info */}
          <div className="pr-8">
            <a href="#beranda" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img src="/image/logo.png" alt="Logo Kejaksaan" className="h-10 w-auto object-contain drop-shadow-sm" />
                <img src="/image/logo-klinik.png" alt="Logo Klinik Adhyaksa" className="h-10 w-auto object-contain drop-shadow-sm" />
              </div>
              <span className="flex flex-col border-l border-navy/20 pl-3 gap-0.5">
                <span className="font-display text-base font-extrabold text-navy leading-none tracking-tight">
                  {site.shortName}
                </span>
                <span className="text-[10px] font-bold text-primary leading-none tracking-wide uppercase">
                  {site.fullName}
                </span>
                <span className="text-[8.5px] font-medium uppercase tracking-widest text-navy/50 leading-none mt-0.5">
                  {site.institution}
                </span>
              </span>
            </a>
            <p className="mt-6 text-sm leading-relaxed text-text-secondary">
              {site.tagline}. Kami berdedikasi membina dan mengelola fasilitas kesehatan aparatur agar dapat bertugas secara maksimal untuk negeri.
            </p>
            
            <div className="mt-8 flex items-center gap-4">
              {/* Dummy social links */}
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <a key={social} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-muted text-text-secondary hover:bg-primary-50 hover:text-primary transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm opacity-80" /> {/* Placeholder icon */}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-display font-bold text-navy mb-6">Tautan Cepat</h4>
            <ul className="space-y-3.5">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-bold text-navy mb-6">Layanan Populer</h4>
            <ul className="space-y-3.5 text-sm font-medium text-text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Jadwal MCU 2026</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Telemedicine PKY</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Klinik Gigi & Mulut</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Layanan Farmasi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Konsultasi Psikologi</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-display font-bold text-navy mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm font-medium text-text-secondary">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{site.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>{site.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>{site.email}</span>
              </li>
            </ul>

            <div className="mt-8">
              <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Newsletter</h5>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100 py-8 text-xs font-medium text-text-muted">
          <p>© {new Date().getFullYear()} {site.fullName}. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary">Aksesibilitas</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
