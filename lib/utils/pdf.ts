import PDFDocument from "pdfkit";

interface PDFData {
  title: string;
  refNumber: string;
  name: string;
  date: string;
  details: string;
  type: "PPID" | "WBS" | "MCU";
}

import path from "path";

export async function generateOfficialPDF(data: PDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4" });
      const buffers: Buffer[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // --- LOGO ---
      try {
        const logoPath = path.join(process.cwd(), "public/image/logo.png");
        doc.image(logoPath, 50, 40, { width: 60 });
      } catch (e) {
        console.warn("Logo not found for PDF", e);
      }

      // --- KOP SURAT ---
      doc
        .fontSize(16)
        .font("Times-Bold")
        .text("KEJAKSAAN REPUBLIK INDONESIA", { align: "center" })
        .fontSize(14)
        .text("PUSAT KESEHATAN YUSTISIAL (PKY)", { align: "center" })
        .moveDown(0.5);

      doc
        .fontSize(10)
        .font("Times-Roman")
        .text(
          "Jl. Sultan Hasanuddin No. 1, Kebayoran Baru, Jakarta Selatan 12160",
          { align: "center" }
        )
        .text("Email: pky@kejaksaan.go.id | Website: pky.kejaksaan.go.id", {
          align: "center",
        });

      // Garis Pembatas
      doc
        .moveTo(50, 115)
        .lineTo(545, 115)
        .lineWidth(2)
        .stroke()
        .moveTo(50, 118)
        .lineTo(545, 118)
        .lineWidth(1)
        .stroke()
        .moveDown(2);

      // --- ISI SURAT ---
      doc
        .fontSize(14)
        .font("Times-Bold")
        .text(data.title.toUpperCase(), { align: "center", underline: true })
        .fontSize(11)
        .font("Times-Roman")
        .text(`Nomor Registrasi: ${data.refNumber}`, { align: "center" })
        .moveDown(2);

      // Keterangan Kerahasiaan (Khusus WBS)
      if (data.type === "WBS") {
        doc
          .fillColor("red")
          .fontSize(10)
          .text("SIFAT: RAHASIA / CONFIDENTIAL", { align: "right" })
          .fillColor("black")
          .moveDown();
      }

      doc
        .fontSize(11)
        .font("Times-Roman")
        .text("Telah diterima data pendaftaran/laporan dengan rincian sebagai berikut:")
        .moveDown(1);

      // Tabel Detail
      const startX = 70;
      let currentY = doc.y;
      
      const drawRow = (label: string, value: string) => {
        doc.font("Times-Bold").text(label, startX, currentY);
        doc.font("Times-Roman").text(":", startX + 120, currentY);
        doc.text(value, startX + 130, currentY, { width: 340 });
        currentY = doc.y + 10;
      };

      drawRow("Nama / Pelapor", data.name);
      drawRow("Tanggal", data.date);
      drawRow("Rincian / Subjek", data.details);

      doc.y = currentY + 30;

      // --- PENUTUP & TANDA TANGAN DIGITAL ---
      doc
        .font("Times-Roman")
        .text("Dokumen ini dihasilkan secara otomatis oleh Sistem Pusat Kesehatan Yustisial dan sah tanpa tanda tangan basah.", {
          align: "justify",
        })
        .moveDown(2);

      doc
        .text("Jakarta, " + new Date().toLocaleDateString("id-ID"), { align: "right" })
        .moveDown(1)
        .font("Times-Bold")
        .text("Sistem Informasi PKY", { align: "right" })
        .moveDown(3)
        .font("Times-Roman")
        .text("(Tanda Tangan Digital Tersertifikasi)", { align: "right" });

      doc
        .fillColor("grey")
        .fontSize(8)
        .text("Dokumen diterbitkan pada: " + new Date().toISOString(), 50, 780, {
          align: "center",
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
