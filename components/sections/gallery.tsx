"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { SectionTag } from "@/components/ui/badge"
import { Reveal } from "@/components/ui/motion"

const photos = [
  {
    id: 1,
    url: "/image/gedung.png",
    caption: "Fasad Depan Gedung BPKY",
    desc: "Bangunan modern dengan fasilitas terintegrasi."
  },
  {
    id: 2,
    url: "/image/gedung 2.png",
    caption: "Ruang Konsultasi Medis",
    desc: "Privasi dan kenyamanan pasien menjadi prioritas utama kami."
  },
  {
    id: 3,
    url: "/image/gedung.png",
    caption: "Fasilitas Lab Terpadu",
    desc: "Peralatan medis canggih untuk akurasi diagnosa."
  },
  {
    id: 4,
    url: "/image/gedung 2.png",
    caption: "Ambulans Gawat Darurat",
    desc: "Siaga 24 jam dengan tim medis profesional."
  }
]

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false
  })
  
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  
  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="fasilitas" className="bg-surface-soft py-20 lg:py-32 dark:bg-navy-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionTag align="center">Fasilitas Kami</SectionTag>
          <Reveal>
            <h2 className="mt-6 font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl dark:text-white">
              Layanan Medis <span className="gradient-text">Premium</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-text-secondary sm:text-lg dark:text-white/70">
              Dukungan fasilitas kesehatan berstandar tinggi yang menunjang berbagai kebutuhan medis aparatur secara komprehensif.
            </p>
          </Reveal>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ backfaceVisibility: "hidden" }}>
              {photos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className={`relative min-w-0 flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_60%] px-2 sm:px-4 transition-opacity duration-300 ${index === selectedIndex ? 'opacity-100' : 'opacity-40'}`}
                >
                  <div className="group relative aspect-video overflow-hidden rounded-2xl bg-gray-200 dark:bg-white/5">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ 
                        objectPosition: index % 2 === 0 ? "center" : "top" // Variasi posisi gambar karena pakai aset yang sama
                      }} 
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="font-display text-xl font-bold sm:text-2xl">{photo.caption}</h3>
                          <p className="mt-2 text-sm text-white/80 sm:text-base">{photo.desc}</p>
                        </div>
                        <button className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 sm:flex">
                          <Maximize2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={scrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-navy transition-all hover:border-primary hover:text-primary dark:border-white/10 dark:bg-navy dark:text-white dark:hover:border-primary-light dark:hover:text-primary-light shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === selectedIndex 
                      ? "w-8 bg-primary dark:bg-primary-light" 
                      : "w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-navy transition-all hover:border-primary hover:text-primary dark:border-white/10 dark:bg-navy dark:text-white dark:hover:border-primary-light dark:hover:text-primary-light shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
