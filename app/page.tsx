'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  Phone, 
  Mail, 
  MapPin, 
  ImageOff, 
  Menu, 
  X, 
  Instagram,
  Heart,
  Leaf,
  Shield,
  TrendingUp,
  Map,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// ANIMATION HOOK
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// SAFE IMAGE COMPONENT
function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/10 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// DATA
const brand = {
  name: "Royal Heritage Farms",
  tagline: "Cultivating Excellence, Preserving Legacy",
  description: "Nigeria's premier integrated livestock farm in Ogun State, dedicated to the ethical breeding and supply of superior broiler chickens, goats, sheep, and cattle.",
  industry: "Integrated Livestock",
  region: "Ogun State, Nigeria"
};

const products = [
  { name: "Elite Broiler Batch", description: "High-yield, healthy broiler chickens raised on premium organic feed for optimal growth.", price: "₦12,500", image: "https://picsum.photos/seed/farms1/800/600" },
  { name: "Purebred Boer Goats", description: "South African breed known for high meat quality and rapid weight gain. Ideal for breeding.", price: "₦145,000", image: "https://picsum.photos/seed/farms2/800/600" },
  { name: "Dorper Breeding Sheep", description: "Hardy, easy-care sheep with exceptional carcass quality, perfectly adapted to the climate.", price: "₦165,000", image: "https://picsum.photos/seed/farms3/800/600" },
  { name: "Premium White Fulani Bull", description: "Iconic heritage cattle, vaccinated and raised in stress-free grazing environments.", price: "₦680,000", image: "https://picsum.photos/seed/farms4/800/600" }
];

const features = [
  { title: "Ethical Breeding", description: "We prioritize animal welfare and genetic integrity in every bloodline we raise.", icon: Heart },
  { title: "Organic Nutrition", description: "Our livestock is nourished with locally sourced, nutrient-dense organic feed.", icon: Leaf },
  { title: "Expert Oversight", description: "Round-the-clock veterinary monitoring ensuring the highest biosecurity standards.", icon: Shield }
];

const stats = [
  { number: "500+", label: "Acres of Green Pasture", icon: Map },
  { number: "15k+", label: "Livestock Supplied Yearly", icon: TrendingUp }
];

const testimonials = [
  { name: "Olumide Adekunle", text: "The Boer goats from Royal Heritage have significantly improved the yield of my own breeding program. Highly recommended.", role: "Commercial Breeder" },
  { name: "Mrs. Folake Balogun", text: "Reliable supply and the healthiest broilers I've sourced in Ogun State. Their professionalism is unmatched.", role: "Agri-Retailer" }
];

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent flex items-center justify-center font-heading font-bold text-white text-2xl transition-transform group-hover:scale-110">
              R
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white uppercase hidden sm:block">Royal Heritage</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['The Pedigree', 'The Farm', 'Benefits', 'Inquiry'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-white/70 hover:text-accent font-medium text-sm tracking-widest uppercase transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-white px-6 py-2.5 font-bold text-sm hover:brightness-110 transition rounded-sm">
              GET STARTED
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8">
          <button onClick={() => setMobileMenu(false)} className="text-white mb-12">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['The Pedigree', 'The Farm', 'Benefits', 'Inquiry'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={() => setMobileMenu(false)}
                className="text-4xl font-heading font-bold text-white"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenu(false)}
              className="mt-8 bg-accent text-white py-4 text-center font-bold text-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* HERO - Pattern HR-B */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src="https://picsum.photos/seed/royalhero/1920/1080" alt="Royal Heritage Farms Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-heading text-6xl md:text-[7.5rem] font-bold text-white leading-[0.85] tracking-tighter animate-slideUp">
            The Gold Standard <br/> of Livestock
          </h1>
          <p className="text-white/80 mt-8 text-lg md:text-xl max-w-xl leading-relaxed animate-fadeIn [animation-delay:400ms]">
            From the heart of Ogun State, we deliver the finest breeds of poultry, goats, and cattle to your doorstep. Cultivating excellence, preserving legacy.
          </p>
          <div className="flex flex-wrap gap-5 mt-10 animate-fadeIn [animation-delay:600ms]">
            <a href="#the-pedigree" className="bg-accent text-white px-10 py-4 font-black text-lg hover:brightness-110 transition flex items-center gap-3">
              Discover the Pedigree <ChevronRight size={20} />
            </a>
            <a href="#the-farm" className="border border-white/30 backdrop-blur-sm text-white px-10 py-4 font-bold text-lg hover:bg-white/10 transition">
              Our Legacy
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT - Pattern V3 Horizontal Split */}
      <section id="the-farm" className="py-28 bg-secondary">
        <AboutSection />
      </section>

      {/* DIVIDER - D-RULE */}
      <div className="bg-secondary">
        <div className="py-8 flex items-center gap-8 px-8 max-w-6xl mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
            {brand.tagline}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </div>

      {/* PRODUCTS - Pattern P-HORIZONTAL (The Pedigree) */}
      <section id="the-pedigree" className="py-28 bg-primary">
        <ProductsSection />
      </section>

      {/* GALLERY - Bonus Masonry Reveal V7 */}
      <section className="py-28 bg-accent/5">
        <GallerySection />
      </section>

      {/* FEATURES - Pattern F-ICON-GRID (Benefits) */}
      <section id="benefits" className="py-28 bg-secondary text-primary">
        <FeaturesSection />
      </section>

      {/* TESTIMONIALS - Pattern T-MASONRY V8 */}
      <section className="py-28 bg-primary overflow-hidden">
        <TestimonialsSection />
      </section>

      {/* CONTACT - Pattern C2 Diagonal Split */}
      <section id="inquiry" className="relative overflow-hidden">
        <ContactSection />
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent flex items-center justify-center font-heading font-bold text-white text-2xl">
                  R
                </div>
                <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase">Royal Heritage</span>
              </div>
              <p className="text-white/40 max-w-sm text-sm leading-relaxed mb-8">
                Leading the advancement of livestock farming in West Africa through superior genetics and ethical practices.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-accent hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#home" className="hover:text-accent transition">Home</a></li>
                <li><a href="#the-pedigree" className="hover:text-accent transition">The Pedigree</a></li>
                <li><a href="#the-farm" className="hover:text-accent transition">The Farm</a></li>
                <li><a href="#inquiry" className="hover:text-accent transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Farm Location</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Royal Heritage Way<br />
                Ogun State Industrial Hub<br />
                Southwest, Nigeria
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} Royal Heritage Farms Limited. All Rights Reserved.</p>
            <p>Designed for Excellence</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref as any} className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
        <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
          <SafeImage src="https://picsum.photos/seed/aboutfarm/800/1000" alt="Farm Legacy" fill className="object-cover" />
          <div className="absolute inset-0 border-[24px] border-accent/20" />
        </div>
      </div>
      <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Heritage</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-8 leading-tight">Heritage in Every Fold</h2>
        <p className="text-primary/70 text-lg leading-relaxed mb-10">
          Royal Heritage Farms stands at the intersection of traditional wisdom and modern agricultural science. Founded on the principles of sustainability and excellence, we serve as the primary source for breeders and retailers seeking the highest quality livestock in Nigeria.
        </p>
        <div className="grid grid-cols-2 gap-8">
          {stats.map((s, i) => (
            <div key={i} className={`transition-all duration-1000`} style={{ transitionDelay: `${800 + i * 200}ms` }}>
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center text-accent mb-4">
                <s.icon size={24} />
              </div>
              <p className="font-heading text-4xl font-bold text-primary mb-1">{s.number}</p>
              <p className="text-primary/40 text-xs uppercase tracking-widest font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref as any}>
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Stock Selection</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white">Our Pedigree</h2>
        </div>
        <p className="text-white/40 max-w-sm text-lg italic">
          High-breed heritage, ethically raised for superior results.
        </p>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-12 px-6 md:px-12 scrollbar-hide snap-x snap-mandatory">
        {products.map((p, i) => (
          <div 
            key={i} 
            className={`snap-start shrink-0 w-[320px] md:w-[420px] group transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div className="relative aspect-[16/10] mb-6 overflow-hidden bg-primary/20">
              <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 right-4 bg-white text-primary px-4 py-1.5 font-bold text-sm shadow-xl">
                {p.price}
              </div>
            </div>
            <h3 className="font-heading text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
            <p className="text-white/50 text-base leading-relaxed mb-6 line-clamp-2">{p.description}</p>
            <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs border-b border-accent/20 pb-2 hover:border-accent transition-all">
              Reserve Batch <ArrowRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function GallerySection() {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    "https://picsum.photos/seed/g1/800/600",
    "https://picsum.photos/seed/g2/600/800",
    "https://picsum.photos/seed/g3/800/1000",
    "https://picsum.photos/seed/g4/800/600",
    "https://picsum.photos/seed/g5/700/900",
    "https://picsum.photos/seed/g6/800/800"
  ];
  return (
    <div ref={ref as any} className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-heading text-5xl font-bold text-primary mb-4">Life on the Farm</h2>
        <div className="w-20 h-1 bg-accent mx-auto" />
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, i) => (
          <div 
            key={i} 
            className={`break-inside-avoid relative overflow-hidden group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <SafeImage src={src} alt={`Farm scene ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref as any} className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-16">
        <div className="md:col-span-1">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">The Advantage</span>
          <h2 className="font-heading text-5xl font-bold text-primary mb-6">Why Choose Royal Heritage?</h2>
          <p className="text-primary/60 text-lg leading-relaxed mb-8">
            Our commitment to quality sets us apart in the integrated livestock industry. We don't just farm; we engineer legacy breeds.
          </p>
          <a href="#contact" className="text-accent font-black underline decoration-accent/30 underline-offset-8 hover:decoration-accent transition-all">
            Inquire about partnerships
          </a>
        </div>
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`p-10 bg-white shadow-xl rounded-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-14 h-14 bg-secondary flex items-center justify-center text-accent mb-8">
                <f.icon size={30} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">{f.title}</h3>
              <p className="text-primary/50 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
          <div className="p-10 bg-accent text-white rounded-sm flex flex-col justify-center">
            <p className="text-2xl font-heading font-bold mb-2">Sustainable Integrated Farming</p>
            <p className="text-white/80 text-sm">Perfectly adapted to the regional climate and landscape.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref as any} className="max-w-7xl mx-auto px-6">
      <h2 className="font-heading text-5xl font-bold text-white text-center mb-20">Voice of Our Partners</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className={`bg-secondary/5 p-12 border border-white/5 relative group transition-all duration-700 ${isVisible ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-6 scale-75'}`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <div className="absolute top-10 right-10 text-accent/20">
              <span className="text-8xl font-serif leading-none">“</span>
            </div>
            <p className="text-white/80 text-xl leading-relaxed italic mb-8 relative z-10">
              {t.text}
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-accent/20 flex items-center justify-center text-accent font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white tracking-wide">{t.name}</p>
                <p className="text-accent text-xs uppercase tracking-widest font-bold mt-1">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div ref={ref as any} className="min-h-[600px] flex items-stretch">
      <div className="absolute inset-0 bg-accent" />
      <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,60%_0,45%_100%,0_100%)] hidden md:block" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center py-24 w-full">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h2 className="font-heading text-6xl md:text-8xl font-bold text-white leading-none mb-10">
            Secure Your Supply
          </h2>
          <p className="text-white/70 text-xl max-w-sm mb-12">
            Professional logistics and premium livestock sourcing. Sharp delivery, nationwide.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <span>Ogun State, Nigeria</span>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                <Instagram size={18} />
              </div>
              <span>@RoyalHeritage</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg ml-auto">
          {sent ? (
            <div className="bg-white p-12 text-center animate-scaleIn">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                <CheckCheck size={40} />
              </div>
              <h3 className="font-heading text-3xl font-bold text-primary mb-4">Request Sent</h3>
              <p className="text-primary/60">Our heritage consultants will reach out to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="mt-8 text-accent font-bold uppercase text-xs tracking-widest underline">New Inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 shadow-2xl space-y-5">
              <h3 className="font-heading text-3xl font-bold text-primary mb-6">Inquiry Form</h3>
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Full Name" required
                  className="w-full border-b border-primary/10 py-4 outline-none focus:border-accent transition-colors text-primary placeholder-primary/30"
                  onChange={e => setForm({...form, name: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="email" placeholder="Email Address" required
                    className="w-full border-b border-primary/10 py-4 outline-none focus:border-accent transition-colors text-primary placeholder-primary/30"
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                  <input 
                    type="tel" placeholder="Phone Number" required
                    className="w-full border-b border-primary/10 py-4 outline-none focus:border-accent transition-colors text-primary placeholder-primary/30"
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <textarea 
                  placeholder="Tell us about your requirements" rows={3} required
                  className="w-full border-b border-primary/10 py-4 outline-none focus:border-accent transition-colors text-primary placeholder-primary/30 resize-none"
                  onChange={e => setForm({...form, message: e.target.value})}
                />
              </div>
              <button 
                type="submit" disabled={loading}
                className="w-full bg-primary text-white py-5 font-bold uppercase tracking-widest hover:bg-accent transition-all duration-500 flex justify-center items-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}