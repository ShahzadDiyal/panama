import { useEffect, useRef, useState } from "react";
import HeroSection from "../../components/home/HeroSection";
import LatestDeals from "../../components/home/LatestDeals";
import VerifiedSupplier from "../../components/home/VerifiedSupplier";
import PricingSection from "../../components/home/PricingSection";
import { useNavbar } from "../../context/NavbarContext";
import { publicService } from '../../services/publicService';
import type { Category } from '../../types';

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
        shadow-sm
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
      <div className="flex flex-col lg:flex-row gap-3 mt-4 px-6">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers, products, or categories"
            className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-slate-500 no-section-click"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none no-section-click"
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

          <select
            value={supplierType}
            onChange={(e) => setSupplierType(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none no-section-click"
          >
            <option value="">Supplier Type</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="distributor">Distributor</option>
            <option value="exporter">Exporter</option>
          </select>
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

  // Drag state
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragEndY, setDragEndY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Refs so timeouts / event handlers always read latest values
  const currentSectionRef = useRef(0);
  const isAnimatingRef = useRef(false);

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

  // Always-fresh refs for use inside effects
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

  // ── Desktop: drag handlers ───────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('a, button, input, select, [role="button"], .no-section-click');
    if (!isInteractive && !isMobile) {
      setDragStartY(e.clientY);
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMobile) return;
    setDragEndY(e.clientY);
  };

  const handleMouseUp = () => {
    if (isDragging && dragStartY !== null && dragEndY !== null && !isMobile) {
      const dragDistance = dragEndY - dragStartY;
      // If dragged down significantly (pull to go to previous section)
      if (dragDistance > 50) {
        goPrevRef.current();
      }
      // If dragged up significantly (push to go to next section)
      else if (dragDistance < -50) {
        goNextRef.current();
      }
    }
    // Reset drag state
    setDragStartY(null);
    setDragEndY(null);
    setIsDragging(false);
  };

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

    switch (currentSection) {
      case 0:
        return (
          <div key="hero" className={cls}>
            <HeroSection />
          </div>
        );
      case 1:
        return (
          <div key="deals" className={`bg-white min-h-screen ${cls}`}>
            <StickyInfoBar visible={true} />
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
              <LatestDeals />
            </div>
          </div>
        );
      case 2:
        return (
          <div key="suppliers" className={`bg-white min-h-screen ${cls}`}>
            <StickyInfoBar visible={true} />
            <div className="px-4 sm:px-6 lg:px-8">
              <VerifiedSupplier />
            </div>
          </div>
        );
      case 3:
        return (
          <div key="pricing" className={cls}>
            <PricingSection />
          </div>
        );
      default:
        return null;
    }
  };

  // ── Mobile renderer ───────────────────────────────────────────────────
  const renderAllSections = () => (
    <>
      <div id="hero-section">
        <HeroSection />
      </div>
      <div className="bg-white">
        <StickyInfoBar visible={barVisible} />
        <div id="deals-section" className="sm:px-6 lg:px-8 mt-20">
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

      <div 
        className="w-full overflow-x-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isMobile ? renderAllSections() : renderCurrentSection()}
      </div>
    </>
  );
}