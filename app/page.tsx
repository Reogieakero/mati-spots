"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import {
  MapPin, Star, Camera, Mountain, Waves, Utensils, Building2,
  Compass, Sun, Moon, Zap, ChevronDown, ArrowRight, Play,
  Share2, Link, Radio, Phone, Mail,
  Globe, Users, Trophy, Calendar, Menu, X, Quote,
  Anchor, TreePalm, Fish, Wind, Sunrise, Heart
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Theme = "light" | "dark" | "cyberpunk";

// ─── DATA ────────────────────────────────────────────────────────────────────
const spots = [
  {
    name: "Dahican Beach",
    category: "Beach",
    rating: 4.9,
    description: "World-class surfing destination with powdery white sand and crystal-clear azure waters stretching over 7 kilometers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dahican_Beach%2C_Mati%2C_Davao_Oriental.jpg/1280px-Dahican_Beach%2C_Mati%2C_Davao_Oriental.jpg",
    tags: ["Surfing", "Swimming", "Sunset"],
    icon: Waves,
  },
  {
    name: "Sleeping Dinosaur",
    category: "Nature",
    rating: 4.7,
    description: "An iconic rock formation resembling a sleeping dinosaur, offering breathtaking panoramic views of the Pacific Ocean.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Sleeping_Dinosaur_Island%2C_Mati%2C_Davao_Oriental.jpg/1280px-Sleeping_Dinosaur_Island%2C_Mati%2C_Davao_Oriental.jpg",
    tags: ["Hiking", "Photography", "Scenic"],
    icon: Mountain,
  },
  {
    name: "Subangan Museum",
    category: "Culture",
    rating: 4.6,
    description: "A premier eco-cultural museum showcasing the rich heritage, artifacts, and traditions of Davao Oriental's indigenous peoples.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Subangan_Museum%2C_Mati_City.jpg/1280px-Subangan_Museum%2C_Mati_City.jpg",
    tags: ["History", "Art", "Culture"],
    icon: Building2,
  },
  {
    name: "Oak Island",
    category: "Island",
    rating: 4.8,
    description: "A secluded paradise island surrounded by emerald waters, pristine coral reefs, and lush tropical vegetation.",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
    tags: ["Snorkeling", "Island Hopping", "Diving"],
    icon: Anchor,
  },
  {
    name: "Waniban Island",
    category: "Island",
    rating: 4.8,
    description: "Pristine uninhabited island with powdery white shores, vibrant marine life, and untouched natural beauty.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    tags: ["Camping", "Snorkeling", "Relaxation"],
    icon: TreePalm,
  },
  {
    name: "Mati Baywalk",
    category: "Leisure",
    rating: 4.5,
    description: "A scenic seafront promenade with stunning sunset views, local food stalls, and vibrant nightlife along the bay.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    tags: ["Dining", "Sunset", "Walking"],
    icon: Sunrise,
  },
];

const categories = [
  { name: "Beaches", icon: Waves, count: 12, color: "from-cyan-500 to-blue-600" },
  { name: "Mountains", icon: Mountain, count: 8, color: "from-emerald-500 to-teal-600" },
  { name: "Adventure", icon: Compass, count: 15, color: "from-orange-500 to-red-600" },
  { name: "Resorts", icon: Anchor, count: 9, color: "from-purple-500 to-violet-600" },
  { name: "Food", icon: Utensils, count: 24, color: "from-yellow-500 to-amber-600" },
  { name: "Culture", icon: Building2, count: 6, color: "from-pink-500 to-rose-600" },
];

const stats = [
  { value: 250000, label: "Annual Tourists", suffix: "+", icon: Users },
  { value: 47, label: "Tourist Spots", suffix: "", icon: MapPin },
  { value: 12, label: "Awards Won", suffix: "", icon: Trophy },
  { value: 11, label: "Best Months", suffix: "/12", icon: Calendar },
];

const gallery = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dahican_Beach%2C_Mati%2C_Davao_Oriental.jpg/1280px-Dahican_Beach%2C_Mati%2C_Davao_Oriental.jpg", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", span: "" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Sleeping_Dinosaur_Island%2C_Mati%2C_Davao_Oriental.jpg/1280px-Sleeping_Dinosaur_Island%2C_Mati%2C_Davao_Oriental.jpg", span: "" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", span: "col-span-2" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Travel Blogger",
    avatar: "https://i.pravatar.cc/150?img=47",
    review: "Mati is hands down the most underrated gem in the Philippines. Dahican Beach alone is worth the journey — the surfing conditions are world-class!",
    rating: 5,
    location: "Singapore",
  },
  {
    name: "Marco Reyes",
    role: "Adventure Photographer",
    avatar: "https://i.pravatar.cc/150?img=68",
    review: "The Sleeping Dinosaur rock formation at golden hour is absolutely surreal. I've traveled to 40+ countries and this place genuinely surprised me.",
    rating: 5,
    location: "Spain",
  },
  {
    name: "Aisha Johnson",
    role: "Cultural Explorer",
    avatar: "https://i.pravatar.cc/150?img=32",
    review: "Subangan Museum gave me deep insight into Davao Oriental's indigenous culture. The island hopping to Oak and Waniban islands was magical.",
    rating: 5,
    location: "USA",
  },
];

// ─── THEME CONFIG ─────────────────────────────────────────────────────────────
const themeConfig = {
  light: {
    bg: "bg-stone-50",
    navBg: "bg-white/80",
    text: "text-stone-900",
    subtext: "text-stone-600",
    card: "bg-white",
    border: "border-stone-200",
    cardHover: "hover:shadow-2xl hover:shadow-stone-200",
    badge: "bg-stone-100 text-stone-700",
    statCard: "bg-white border border-stone-100",
    footer: "bg-stone-900 text-stone-100",
    catCard: "bg-white border border-stone-100 hover:shadow-xl",
    sectionBg: "bg-stone-100",
    accent: "#0ea5e9",
  },
  dark: {
    bg: "bg-gray-950",
    navBg: "bg-gray-950/80",
    text: "text-gray-50",
    subtext: "text-gray-400",
    card: "bg-gray-900",
    border: "border-gray-800",
    cardHover: "hover:shadow-2xl hover:shadow-black",
    badge: "bg-gray-800 text-gray-300",
    statCard: "bg-gray-900 border border-gray-800",
    footer: "bg-black text-gray-300",
    catCard: "bg-gray-900 border border-gray-800 hover:border-gray-600 hover:shadow-xl",
    sectionBg: "bg-gray-900",
    accent: "#38bdf8",
  },
  cyberpunk: {
    bg: "bg-[#0a0015]",
    navBg: "bg-[#0a0015]/80",
    text: "text-[#e0f7ff]",
    subtext: "text-[#a78bfa]",
    card: "bg-[#120025]",
    border: "border-[#7c3aed]/30",
    cardHover: "hover:shadow-2xl hover:shadow-[#7c3aed]/30",
    badge: "bg-[#1a003a] text-[#c084fc]",
    statCard: "bg-[#0f001f] border border-[#7c3aed]/40",
    footer: "bg-[#060010] text-[#a78bfa]",
    catCard: "bg-[#0f001f] border border-[#7c3aed]/40 hover:border-[#c084fc] hover:shadow-xl hover:shadow-[#7c3aed]/20",
    sectionBg: "bg-[#0d0020]",
    accent: "#c084fc",
  },
};

// ─── UTILITY: ANIMATED COUNTER ───────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MatiSpotsPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const t = themeConfig[theme];

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);

  const isCyber = theme === "cyberpunk";
  const cycleTheme = () => {
    const order: Theme[] = ["light", "dark", "cyberpunk"];
    setTheme((prev) => order[(order.indexOf(prev) + 1) % 3]);
  };

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Zap;
  const themeLabel = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Cyber";

  const navLinks = ["Spots", "Categories", "Gallery", "Testimonials", "Contact"];

  const cyberGlow = isCyber
    ? "drop-shadow-[0_0_16px_rgba(192,132,252,0.8)]"
    : "";
  const cyberBorder = isCyber ? "border-[#7c3aed] shadow-[0_0_20px_rgba(124,58,237,0.5)]" : "";
  const cyberText = isCyber ? "text-[#e0f7ff] drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" : "";

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <div className={`min-h-screen font-sans ${t.bg} ${t.text} transition-colors duration-700 overflow-x-hidden`}
      style={{ fontFamily: "'Syne', 'Clash Display', system-ui, sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { overflow-x: hidden; }
        .glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .glass-card { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        ${isCyber ? `
          .cyber-grid {
            background-image: 
              linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px);
            background-size: 40px 40px;
          }
          .neon-text { text-shadow: 0 0 10px #c084fc, 0 0 30px #7c3aed, 0 0 60px #7c3aed; }
          .neon-cyan { text-shadow: 0 0 10px #22d3ee, 0 0 30px #0891b2; }
          .neon-pink { text-shadow: 0 0 10px #f472b6, 0 0 30px #db2777; }
          .neon-border { box-shadow: 0 0 0 1px #7c3aed, 0 0 20px rgba(124,58,237,0.4); }
          .neon-card:hover { box-shadow: 0 0 0 1px #c084fc, 0 0 30px rgba(192,132,252,0.3), 0 0 60px rgba(124,58,237,0.2); }
          .scanline::after {
            content: '';
            position: absolute; inset: 0;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px);
            pointer-events: none;
          }
        ` : ""}
      `}</style>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 glass ${t.navBg} border-b ${t.border} ${isCyber ? "border-[#7c3aed]/30" : ""} transition-colors duration-700`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2.5 cursor-pointer">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCyber ? "bg-[#7c3aed] shadow-[0_0_16px_rgba(124,58,237,0.8)]" : "bg-sky-500"}`}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className={`font-bold text-lg tracking-tight ${isCyber ? "neon-text" : ""}`}>
                Mati<span className={isCyber ? "text-[#22d3ee] neon-cyan" : "text-sky-500"}>Spots</span>
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${t.subtext} hover:${t.text} ${isCyber ? "hover:text-[#c084fc] hover:neon-text" : "hover:text-sky-500"}`}>
                  {l}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={cycleTheme}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${t.border} ${t.badge} ${isCyber ? "neon-border" : ""}`}
              >
                <ThemeIcon className={`w-3.5 h-3.5 ${isCyber ? cyberGlow : ""}`} />
                {themeLabel}
              </motion.button>
              <a href="#contact" className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all
                ${isCyber
                  ? "bg-[#7c3aed] hover:bg-[#6d28d9] shadow-[0_0_20px_rgba(124,58,237,0.6)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)]"
                  : "bg-sky-500 hover:bg-sky-600"}`}>
                Plan Trip <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${t.border} ${t.card} px-6 py-4`}
            >
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2.5 text-sm font-medium ${t.subtext} hover:${t.text}`}>
                  {l}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="hero" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isCyber ? "cyber-grid scanline" : ""}`}>
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dahican_Beach%2C_Mati%2C_Davao_Oriental.jpg/1280px-Dahican_Beach%2C_Mati%2C_Davao_Oriental.jpg"
            alt="Mati City"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${
            isCyber
              ? "bg-gradient-to-b from-[#0a0015]/85 via-[#0a0015]/70 to-[#0a0015]"
              : theme === "dark"
              ? "bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"
              : "bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-50"
          }`} />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 glass-card border ${
              isCyber ? "border-[#7c3aed]/50 bg-[#120025]/60 text-[#c084fc] neon-border" : "border-white/20 bg-white/10 text-white"
            }`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${isCyber ? "bg-[#c084fc]" : "bg-emerald-400"}`} />
            Davao Oriental, Philippines
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className={`text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-white mb-6 ${isCyber ? "neon-text" : ""}`}
          >
            Discover the<br />
            <span className={`${isCyber ? "text-[#22d3ee] neon-cyan" : "text-sky-400"}`}>
              Hidden Paradise
            </span>
            <br />of Mati City
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-base sm:text-xl max-w-2xl mx-auto mb-10 ${isCyber ? "text-[#a78bfa]" : "text-white/70"}`}
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Pristine beaches, world-class surfing, ancient cultures, and island adventures await in Davao Oriental's crown jewel.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#spots"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all
                ${isCyber
                  ? "bg-[#7c3aed] shadow-[0_0_25px_rgba(124,58,237,0.7)] hover:shadow-[0_0_40px_rgba(124,58,237,0.9)]"
                  : "bg-sky-500 hover:bg-sky-400 shadow-lg shadow-sky-500/40"}`}
            >
              Explore Spots <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all glass-card border ${
                isCyber
                  ? "border-[#7c3aed]/50 text-[#c084fc] hover:border-[#c084fc]"
                  : "border-white/30 text-white hover:bg-white/10"}`}
            >
              <Play className="w-4 h-4" /> Watch Video
            </motion.button>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-8 mt-16"
          >
            {[["4.9★", "Rated"], ["47+", "Spots"], ["250k", "Visitors"]].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className={`text-xl font-bold text-white ${isCyber ? "neon-cyan" : ""}`}>{val}</div>
                <div className="text-xs text-white/50">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        >
          <span className="text-white/40 text-xs">Scroll</span>
          <ChevronDown className={`w-5 h-5 ${isCyber ? "text-[#c084fc]" : "text-white/40"}`} />
        </motion.div>
      </section>

      {/* ── FEATURED SPOTS ── */}
      <section id="spots" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isCyber ? "text-[#c084fc] neon-text" : "text-sky-500"}`}>
            Top Destinations
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold mt-3 ${isCyber ? cyberText : ""}`}>
            Featured Tourist Spots
          </h2>
          <p className={`mt-4 text-base max-w-xl mx-auto ${t.subtext}`} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
            From legendary beaches to hidden islands — each destination tells a unique story of Mati City's natural wonder.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot, i) => (
            <motion.div
              key={spot.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer
                ${t.card} ${t.border} ${t.cardHover}
                ${isCyber ? "neon-card border-[#7c3aed]/30 hover:border-[#c084fc]/60" : ""}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80";
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isCyber ? "from-[#0a0015]/80" : "from-black/50"} to-transparent`} />
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold glass-card border
                  ${isCyber ? "border-[#7c3aed]/50 bg-[#0a0015]/60 text-[#c084fc]" : "border-white/20 bg-black/30 text-white"}`}>
                  {spot.category}
                </div>
                <div className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold glass-card border
                  ${isCyber ? "border-[#7c3aed]/50 bg-[#0a0015]/60 text-[#22d3ee]" : "border-white/20 bg-black/30 text-amber-400"}`}>
                  <Star className="w-3 h-3 fill-current" />
                  {spot.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-bold text-lg leading-tight ${isCyber ? "text-[#e0f7ff]" : ""}`}>{spot.name}</h3>
                  <spot.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isCyber ? "text-[#c084fc]" : "text-sky-500"}`} />
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${t.subtext}`} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  {spot.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {spot.tags.map((tag) => (
                    <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-medium ${t.badge} ${isCyber ? "border border-[#7c3aed]/30" : ""}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className={`py-24 px-4 sm:px-6 ${t.sectionBg} ${isCyber ? "cyber-grid" : ""} transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-center mb-14"
          >
            <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isCyber ? "text-[#c084fc] neon-text" : "text-sky-500"}`}>
              Explore by Type
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold mt-3 ${isCyber ? cyberText : ""}`}>Browse Categories</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${t.catCard}
                  ${activeCategory === cat.name ? (isCyber ? "border-[#c084fc] shadow-[0_0_20px_rgba(192,132,252,0.4)]" : "border-sky-500 shadow-lg shadow-sky-500/20") : ""}
                `}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center
                  ${isCyber ? "shadow-[0_0_12px_rgba(124,58,237,0.5)]" : ""}`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-bold text-center ${isCyber ? "text-[#e0f7ff]" : ""}`}>{cat.name}</div>
                  <div className={`text-xs text-center mt-0.5 ${t.subtext}`}>{cat.count} spots</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className={`max-w-6xl mx-auto rounded-3xl p-10 sm:p-16 relative overflow-hidden
          ${isCyber
            ? "bg-[#0f001f] border border-[#7c3aed]/40 shadow-[0_0_60px_rgba(124,58,237,0.2)]"
            : theme === "dark"
            ? "bg-gray-900"
            : "bg-gradient-to-br from-sky-500 to-blue-700"}`}
        >
          {/* BG decoration */}
          {!isCyber && (
            <div className={`absolute inset-0 opacity-10 ${theme === "dark" ? "hidden" : ""}`}
              style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          )}
          {isCyber && (
            <>
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#7c3aed]/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#22d3ee]/10 blur-3xl" />
            </>
          )}

          <div className="relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              className="text-center mb-14"
            >
              <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isCyber ? "text-[#c084fc]" : "text-white/70"}`}>
                By the Numbers
              </span>
              <h2 className={`text-3xl sm:text-5xl font-bold mt-3 ${isCyber ? "text-[#e0f7ff] neon-text" : "text-white"}`}>
                Mati City in Stats
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-center p-6 rounded-2xl ${
                    isCyber
                      ? "bg-[#120025] border border-[#7c3aed]/30"
                      : theme === "dark"
                      ? "bg-gray-800/50"
                      : "bg-white/15 glass-card"}`}
                >
                  <stat.icon className={`w-7 h-7 mx-auto mb-3 ${isCyber ? "text-[#c084fc]" : theme === "dark" ? "text-sky-400" : "text-white/80"}`} />
                  <div className={`text-3xl sm:text-4xl font-bold ${isCyber ? "text-[#22d3ee] neon-cyan" : "text-white"}`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className={`text-sm mt-1.5 ${isCyber ? "text-[#a78bfa]" : "text-white/60"}`} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className={`py-24 px-4 sm:px-6 ${t.sectionBg} transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-center mb-14"
          >
            <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isCyber ? "text-[#c084fc] neon-text" : "text-sky-500"}`}>
              Visual Journey
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold mt-3 ${isCyber ? cyberText : ""}`}>
              Mati Through the Lens
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[600px]">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80";
                  }}
                />
                <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100
                  ${isCyber
                    ? "bg-[#7c3aed]/30 backdrop-blur-[2px]"
                    : "bg-black/30 backdrop-blur-[1px]"}`}
                />
                <Camera className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100
                  ${isCyber ? cyberGlow : ""}`} />
                {isCyber && (
                  <div className="absolute inset-0 border-2 border-[#7c3aed]/0 group-hover:border-[#c084fc]/60 rounded-2xl transition-all duration-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-center mb-14"
          >
            <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isCyber ? "text-[#c084fc] neon-text" : "text-sky-500"}`}>
              What Travelers Say
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold mt-3 ${isCyber ? cyberText : ""}`}>
              Real Stories, Real Magic
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t2, i) => (
              <motion.div
                key={t2.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`relative p-7 rounded-2xl border glass-card transition-all duration-300
                  ${t.card} ${t.border}
                  ${isCyber
                    ? "bg-[#120025]/80 border-[#7c3aed]/30 hover:border-[#c084fc]/60 hover:shadow-[0_0_30px_rgba(192,132,252,0.2)]"
                    : `${t.cardHover}`}`}
              >
                <Quote className={`w-8 h-8 mb-4 ${isCyber ? "text-[#7c3aed]" : "text-sky-500/50"}`} />
                <p className={`text-sm leading-relaxed mb-6 ${t.subtext}`} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  "{t2.review}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t2.avatar} alt={t2.name} className={`w-10 h-10 rounded-full object-cover ${isCyber ? "ring-2 ring-[#7c3aed]" : ""}`} />
                  <div>
                    <div className={`font-bold text-sm ${isCyber ? "text-[#e0f7ff]" : ""}`}>{t2.name}</div>
                    <div className={`text-xs ${t.subtext}`}>{t2.role} · {t2.location}</div>
                  </div>
                  <div className={`ml-auto flex gap-0.5 ${isCyber ? "text-[#c084fc]" : "text-amber-400"}`}>
                    {Array.from({ length: t2.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto text-center rounded-3xl p-12 sm:p-16 relative overflow-hidden
            ${isCyber
              ? "bg-[#0f001f] border border-[#7c3aed]/50 shadow-[0_0_80px_rgba(124,58,237,0.25)]"
              : "bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700"}`}
        >
          {isCyber && (
            <>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#7c3aed]/20 blur-3xl" />
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#22d3ee]/15 blur-3xl" />
            </>
          )}
          <div className="relative z-10">
            <Heart className={`w-10 h-10 mx-auto mb-4 ${isCyber ? "text-[#f472b6] drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" : "text-white/80"}`} />
            <h2 className={`text-3xl sm:text-5xl font-bold mb-4 ${isCyber ? "text-[#e0f7ff] neon-text" : "text-white"}`}>
              Ready to Explore Mati?
            </h2>
            <p className={`text-base sm:text-lg mb-8 max-w-xl mx-auto ${isCyber ? "text-[#a78bfa]" : "text-white/70"}`}
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
              Book your adventure today and experience the untouched beauty of Davao Oriental's most stunning destination.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all
                ${isCyber
                  ? "bg-[#7c3aed] text-white shadow-[0_0_30px_rgba(124,58,237,0.8)] hover:shadow-[0_0_50px_rgba(124,58,237,1)]"
                  : "bg-white text-blue-600 hover:bg-blue-50 shadow-xl"}`}
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className={`${t.footer} ${isCyber ? "bg-[#060010] border-t border-[#7c3aed]/20" : ""} pt-16 pb-8 px-4 sm:px-6 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCyber ? "bg-[#7c3aed]" : "bg-sky-500"}`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className={`font-bold text-lg ${isCyber ? "text-[#e0f7ff] neon-text" : ""}`}>
                  Mati<span className={isCyber ? "text-[#22d3ee]" : "text-sky-400"}>Spots</span>
                </span>
              </div>
              <p className={`text-sm leading-relaxed mb-5 ${isCyber ? "text-[#a78bfa]" : "opacity-60"}`}
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                Your premier guide to discovering the breathtaking beauty of Mati City, Davao Oriental.
              </p>
              <div className="flex gap-3">
                {[Share2, Link, Radio, Mail].map((Icon, j) => (
                  <motion.a
                    key={j}
                    href="#"
                    whileHover={{ scale: 1.2, y: -2 }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                      ${isCyber
                        ? "bg-[#120025] border border-[#7c3aed]/40 text-[#c084fc] hover:border-[#c084fc] hover:shadow-[0_0_12px_rgba(192,132,252,0.5)]"
                        : "bg-white/10 hover:bg-white/20 text-white"}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`font-bold mb-4 ${isCyber ? "text-[#e0f7ff]" : ""}`}>Quick Links</h3>
              {["Explore Spots", "Categories", "Photo Gallery", "Travel Tips", "Local Events"].map((l) => (
                <a key={l} href="#" className={`block text-sm py-1.5 transition-colors
                  ${isCyber ? "text-[#a78bfa] hover:text-[#c084fc]" : "opacity-60 hover:opacity-100"}`}
                  style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  {l}
                </a>
              ))}
            </div>

            {/* Destinations */}
            <div>
              <h3 className={`font-bold mb-4 ${isCyber ? "text-[#e0f7ff]" : ""}`}>Top Destinations</h3>
              {spots.slice(0, 5).map((s) => (
                <a key={s.name} href="#spots" className={`block text-sm py-1.5 transition-colors
                  ${isCyber ? "text-[#a78bfa] hover:text-[#c084fc]" : "opacity-60 hover:opacity-100"}`}
                  style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  {s.name}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h3 className={`font-bold mb-4 ${isCyber ? "text-[#e0f7ff]" : ""}`}>Contact Us</h3>
              <div className="space-y-3">
                {[
                  { Icon: MapPin, text: "Mati City, Davao Oriental, Philippines" },
                  { Icon: Phone, text: "+63 912 345 6789" },
                  { Icon: Mail, text: "hello@matispots.ph" },
                  { Icon: Globe, text: "www.matispots.ph" },
                ].map(({ Icon, text }) => (
                  <div key={text} className={`flex items-start gap-2.5 text-sm ${isCyber ? "text-[#a78bfa]" : "opacity-60"}`}
                    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCyber ? "text-[#c084fc]" : ""}`} />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`pt-8 border-t ${isCyber ? "border-[#7c3aed]/20" : "border-white/10"} flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <p className={`text-xs ${isCyber ? "text-[#7c3aed]" : "opacity-40"}`} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
              © 2025 MatiSpots. All rights reserved. Made with ❤️ for Mati City.
            </p>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((l) => (
                <a key={l} href="#" className={`text-xs transition-colors ${isCyber ? "text-[#7c3aed] hover:text-[#c084fc]" : "opacity-40 hover:opacity-80"}`}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}