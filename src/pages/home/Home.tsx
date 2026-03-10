import { useEffect, useRef, useState } from "react";
import HeroSection from "../../components/home/HeroSection";
import LatestDeals from "../../components/home/LatestDeals";
import VerifiedSupplier from "../../components/home/VerifiedSupplier";
import PricingSection from "../../components/home/PricingSection";
import { useNavbar } from "../../context/NavbarContext";
import { publicService } from '../../services/publicService';
import type { Category } from '../../types';

import dropdown_icon from '../../assets/arrow_down_icon.svg'

// ── StickyInfoBar ─────────────────────────────────────────────────────────
function StickyInfoBar({ visible }: { visible: boolean }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [supplierType, setSupplierType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await publicService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      className={`
        sticky top-20 z-30 bg-white
        transition-all duration-300
        pt-14 py-6
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}
    >
      {/* ── Row 1: Info columns ── */}
      <div className="border-y border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4">
          {[
            { heading: "Browse", subheading: "Browse suppliers and wholesale deals by category." },
            { heading: "Connect", subheading: "Send quote requests or chat directly with suppliers via WhatsApp." },
            { heading: "Unlock", subheading: "Get full access with a Day Pass or subscription." },
          ].map((col, i) => (
            <div key={i} className="flex flex-col items-center text-center px-2 sm:px-4 lg:px-6 py-3">
              <h3 className="font-semibold text-slate-800 text-xs sm:text-sm lg:text-base mb-1">
                {col.heading}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-snug max-w-[260px]">
                {col.subheading}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 2: Search + filters ── */}
      <div className="flex flex-col lg:flex-row gap-3 mt-4 px-4 md:px-16">
        <div className="flex-1">
          <div className="relative md:w-[70%] w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search suppliers, products, or categories"
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-slate-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 pr-10 rounded-[10px] border border-gray-300 text-sm focus:outline-none"
            >
              <option value="All">All Categories</option>
              {loadingCategories ? (
                <option disabled>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <img src={dropdown_icon} alt="" />
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={supplierType}
              onChange={(e) => setSupplierType(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 pr-10 rounded-[10px] border border-gray-300 text-sm focus:outline-none"
            >
              <option value="">Supplier Type</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="distributor">Distributor</option>
              <option value="exporter">Exporter</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <img src={dropdown_icon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────
const TOTAL_SECTIONS = 4; // 0:Hero  1:Deals  2:Suppliers  3:Pricing

export default function Home() {
  const { setShowNavbar2 } = useNavbar();

  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [barVisible, setBarVisible] = useState(false);
  const [leavingUp, setLeavingUp] = useState(false);

  // Refs for scroll-based navigation
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const wheelCooldown = useRef(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateSection = (next: number) => {
    currentSectionRef.current = next;
    setCurrentSection(next);
  };

  // ── Core navigation ───────────────────────────────────────────────────
  const goNext = () => {
    const cur = currentSectionRef.current;
    if (cur >= TOTAL_SECTIONS - 1) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setLeavingUp(true);

    setTimeout(() => {
      setLeavingUp(false);
      updateSection(cur + 1);
      isAnimatingRef.current = false;
    }, 320);
  };

  const goPrev = () => {
    const cur = currentSectionRef.current;
    if (cur <= 0) return;
    if (isAnimatingRef.current) return;
    updateSection(cur - 1);
  };

  const goNextRef = useRef(goNext);
  const goPrevRef = useRef(goPrev);
  goNextRef.current = goNext;
  goPrevRef.current = goPrev;

  // ── Resize ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Navbar switching ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isMobile) {
      setShowNavbar2(currentSection !== 0);
    }
  }, [currentSection, isMobile, setShowNavbar2]);

  // ── Scroll-based navigation ───────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (wheelCooldown.current) return;
      if (isAnimatingRef.current) return;

      const currentSectionEl = sectionRefs.current[currentSectionRef.current];
      if (!currentSectionEl) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionEl;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      if (e.deltaY > 0 && isAtBottom) {
        e.preventDefault();
        goNextRef.current();
        wheelCooldown.current = true;
        setTimeout(() => {
          wheelCooldown.current = false;
        }, 800);
      }
      else if (e.deltaY < 0 && isAtTop) {
        e.preventDefault();
        goPrevRef.current();
        wheelCooldown.current = true;
        setTimeout(() => {
          wheelCooldown.current = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  // ── Arrow key handler ─────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goNextRef.current();
      else if (e.key === "ArrowUp") goPrevRef.current();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile]);

  // ── Mobile: IntersectionObserver ──────────────────────────────────────
  useEffect(() => {
    if (!isMobile) return;

    const heroEl = document.querySelector("#hero-section");
    const dealsEl = document.querySelector("#deals-section");
    const suppliersEl = document.querySelector("#suppliers-section");

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) {
            setShowNavbar2(!entry.isIntersecting);
          }
        });
      },
      { threshold: 0.2 }
    );

    const barObserver = new IntersectionObserver(
      (entries) => {
        setBarVisible(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.05 }
    );

    if (heroEl) navObserver.observe(heroEl);
    if (dealsEl) barObserver.observe(dealsEl);
    if (suppliersEl) barObserver.observe(suppliersEl);

    return () => {
      navObserver.disconnect();
      barObserver.disconnect();
    };
  }, [isMobile, setShowNavbar2]);

  // ── Desktop section renderer ──────────────────────────────────────────
  const renderCurrentSection = () => {
    const cls = leavingUp ? "animate-leave-up" : "animate-enter-down";

    return (
      <div className={cls}>
        {/* Section 0 - Hero */}
        {currentSection === 0 && (
          <div 
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[0] = el;
            }}
            className="h-screen overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            <HeroSection />
          </div>
        )}
        
        {/* Section 1 - Deals */}
        {currentSection === 1 && (
          <div 
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[1] = el;
            }}
            className="h-screen overflow-y-auto bg-white"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <StickyInfoBar visible={true} />
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
              <LatestDeals />
            </div>
          </div>
        )}
        
        {/* Section 2 - Suppliers */}
        {currentSection === 2 && (
          <div 
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[2] = el;
            }}
            className="h-screen overflow-y-auto bg-white"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <StickyInfoBar visible={true} />
            <div className="px-4 sm:px-6 lg:px-8">
              <VerifiedSupplier />
            </div>
          </div>
        )}
        
        {/* Section 3 - Pricing */}
        {currentSection === 3 && (
          <div 
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[3] = el;
            }}
            className="h-screen overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <PricingSection />
          </div>
        )}
      </div>
    );
  };

  // ── Mobile renderer ───────────────────────────────────────────────────
  const renderAllSections = () => (
    <>
      <div id="hero-section">
        <HeroSection />
      </div>
      <div className="bg-white">
        <StickyInfoBar visible={barVisible} />
        <div id="deals-section" className="sm:px-6 lg:px-8 ">
          <LatestDeals />
        </div>
        <div id="suppliers-section" className="px-4 sm:px-6 lg:px-8">
          <VerifiedSupplier />
        </div>
      </div>
      <PricingSection />
    </>
  );

  return (
    <>
      <style>{`
        @keyframes leaveUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-60px); }
        }
        @keyframes enterDown {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-leave-up {
          animation: leaveUp 0.32s ease-in forwards;
          pointer-events: none;
        }
        .animate-enter-down {
          animation: enterDown 0.32s ease-out both;
        }
      `}</style>

      <div className="w-full overflow-x-hidden">
        {isMobile ? renderAllSections() : renderCurrentSection()}
      </div>
    </>
  );
}