"use client";

import { SectionTag } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { UserCheck, CalendarDays, Stethoscope, FileCheck2 } from "lucide-react";

type WorkflowStepProps = {
  title: string;
  desc: string;
  icon: React.ElementType;
};

const steps: WorkflowStepProps[] = [
  {
    title: "Standarisasi Mutu",
    desc: "Menetapkan standar operasional pelayanan medis di seluruh Klinik dan RS Adhyaksa.",
    icon: FileCheck2,
  },
  {
    title: "Pengawasan Layanan",
    desc: "Memastikan seluruh fasilitas kesehatan Adhyaksa berjalan sesuai dengan regulasi.",
    icon: Stethoscope,
  },
  {
    title: "Sertifikasi Tenaga Medis",
    desc: "Verifikasi kompetensi dan kelayakan praktik bagi dokter dan staf medis.",
    icon: UserCheck,
  },
  {
    title: "Evaluasi Berkala",
    desc: "Melakukan penilaian rutin untuk meningkatkan kualitas fasilitas kesehatan aparatur.",
    icon: CalendarDays,
  },
];

type StepComponentProps = {
  step: WorkflowStepProps;
  index: number;
};

function WorkflowStep({ step, index }: StepComponentProps) {
  const Icon = step.icon;
  
  return (
    <StaggerItem className="relative z-10 text-center">
      <div className="group flex flex-col items-center">
        {/* Circle Icon */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_15px_30px_-5px_rgba(13,148,136,0.15)] ring-8 ring-white transition-transform duration-500 group-hover:-translate-y-2 dark:bg-navy dark:ring-navy-dark/50 dark:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 rounded-full bg-primary/5 transition-colors group-hover:bg-primary/10 dark:bg-primary/10" />
          <Icon size={32} className="text-primary dark:text-primary-light" />
          
          {/* Number badge */}
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white shadow-md">
            {index + 1}
          </div>
        </div>
        
        <h3 className="font-display text-xl font-bold text-navy dark:text-white">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-white/70">
          {step.desc}
        </p>
      </div>
    </StaggerItem>
  );
}

export function Workflow() {
  return (
    <section 
      id="proses" 
      aria-labelledby="workflow-heading" 
      className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-navy-dark"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <SectionTag align="center">Peran PKY</SectionTag>
          <Reveal>
            <h2 
              id="workflow-heading" 
              className="mt-5 max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-navy sm:text-4xl dark:text-white"
            >
              Siklus Pembinaan Fasilitas Kesehatan
            </h2>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Garis penghubung horizontal (Hanya desktop) */}
          <div 
            aria-hidden="true" 
            className="absolute left-0 top-12 hidden w-full border-t-2 border-dashed border-gray-200 lg:block dark:border-white/10" 
          />

          <Stagger className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <WorkflowStep key={index} step={step} index={index} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
