import { useState, useMemo, useEffect, useRef } from "react";
import { Project, ProductCategory } from "../types";
import { SIGNATURE_PORTFOLIO_PROJECTS, PRODUCT_CATEGORIES, GAL_IMAGES } from "../data";
import { Search, Compass, Shield, Maximize2, X, Sparkles, MapPin, Layers, RefreshCw, Calendar, ArrowUpRight, ArrowLeft, ArrowRight, ChevronRight, Grid } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import WordReveal from "./WordReveal";

interface PortfolioGalleryProps {
  initialSubCategoryId?: string;
  onSelectProjectForEnquiry: (projectTitle: string, categoryId?: string) => void;
}

export default function PortfolioGallery({ initialSubCategoryId, onSelectProjectForEnquiry }: PortfolioGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMainCat, setSelectedMainCat] = useState<string>("all");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("all");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const portfolioSectionRef = useRef<HTMLDivElement>(null);

  // Reset slider index and lock scroll when project details lightbox switches
  useEffect(() => {
    setActiveImageIndex(0);
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  // Dynamically compile a multi-photo list for the selected project
  const activeProjectPhotos = useMemo(() => {
    if (!activeProject) return [];
    
    // First source is the primary layout image (upgraded to high-definition on-the-fly)
    const highResPrimary = activeProject.image.replace("w=450", "w=1100").replace("q=65", "q=85");
    const photosList = [highResPrimary];
    
    // Supplement with category matching custom configurations
    const subId = activeProject.subcategory;
    const pool = GAL_IMAGES[subId] || GAL_IMAGES["glass-railings"] || [];
    
    pool.forEach((img, i) => {
      const formatted = `${img}?auto=format&fit=crop&q=85&w=1100&sig=${activeProject.id}-alt-${i}`;
      if (photosList.length < 5 && !photosList.some(p => p.startsWith(img))) {
        photosList.push(formatted);
      }
    });

    // Final safeguards to load a minimum of 4 distinct scrollable photos
    if (photosList.length < 4) {
      const backupPool = GAL_IMAGES["glass-railings"] || [];
      backupPool.forEach((img, i) => {
        const formatted = `${img}?auto=format&fit=crop&q=85&w=1100&sig=${activeProject.id}-bkp-${i}`;
        if (photosList.length < 4) {
          photosList.push(formatted);
        }
      });
    }

    return photosList;
  }, [activeProject]);

  // If parent component passes down an initial subcategory filter (e.g. from service description click), apply it immediately
  useEffect(() => {
    if (initialSubCategoryId) {
      // Find the main category that contains this subcategory
      const foundCat = PRODUCT_CATEGORIES.find((cat) =>
        cat.subcategories.some((sub) => sub.id === initialSubCategoryId)
      );
      if (foundCat) {
        setSelectedMainCat(foundCat.id);
        setSelectedSubCat(initialSubCategoryId);
      } else {
        // If it was actually a main category ID passed, just set main
        const foundMain = PRODUCT_CATEGORIES.find((cat) => cat.id === initialSubCategoryId);
        if (foundMain) {
          setSelectedMainCat(foundMain.id);
          setSelectedSubCat("all");
        }
      }
    }
  }, [initialSubCategoryId]);

  // Handle main category change
  const handleMainCatChange = (catId: string) => {
    setSelectedMainCat(catId);
    setSelectedSubCat("all");
    setItemsPerPage(16); // reset pagination counts
  };

  // Extract valid subcategories based on active main category
  const activeSubcategories = useMemo(() => {
    if (selectedMainCat === "all") return [];
    const cat = PRODUCT_CATEGORIES.find((c) => c.id === selectedMainCat);
    return cat ? cat.subcategories : [];
  }, [selectedMainCat]);

  // Completely dynamic search and filter calculation
  const filteredProjects = useMemo(() => {
    return SIGNATURE_PORTFOLIO_PROJECTS.filter((proj) => {
      // Main Category Match
      const matchesMain = selectedMainCat === "all" || proj.category === selectedMainCat;
      
      // Sub Category Match
      const matchesSub = selectedSubCat === "all" || proj.subcategory === selectedSubCat;
      
      // Search Box match (location, title, difficulty, subcategory label)
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        proj.title.toLowerCase().includes(query) ||
        proj.location.toLowerCase().includes(query) ||
        proj.difficulty?.toLowerCase().includes(query) ||
        proj.subcategory.toLowerCase().includes(query);

      return matchesMain && matchesSub && matchesSearch;
    });
  }, [selectedMainCat, selectedSubCat, searchTerm]);

  // Paginated subset of filtered projects to prevent grid lag on heavy lists
  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, itemsPerPage);
  }, [filteredProjects, itemsPerPage]);

  const hasMore = filteredProjects.length > visibleProjects.length;

  const handleLoadMore = () => {
    setItemsPerPage((prev) => prev + 16);
  };

  const resetFilters = () => {
    setSelectedMainCat("all");
    setSelectedSubCat("all");
    setSearchTerm("");
    setItemsPerPage(16);
  };

  const triggerEnquiry = (proj: Project) => {
    onSelectProjectForEnquiry(proj.title, proj.category);
    setActiveProject(null); // Close lightbox
  };

  return (
    <section ref={portfolioSectionRef} id="portfolio" className="relative w-full py-24 md:py-32 bg-transparent border-y border-white/5 overflow-hidden">
      {/* Decorative ambient visual or grids */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3.5xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-3.5xl pointer-events-none" />

      <div className="max-w-full px-6 md:px-16 xl:px-24 relative z-10">
        
        {/* Gallery Intro Block */}
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <a
            href="https://maps.app.goo.gl/6EDexhSqfoHztf4X9"
            target="_blank"
            rel="noopener noreferrer"
            title="Click to view our Experience Center on Google Maps"
            className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-400/20 hover:border-gold-400 hover:bg-gold-500 hover:text-white transition-all rounded-full font-mono text-[9px] tracking-widest text-gold-400 uppercase cursor-pointer hover:scale-105"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>High-Definition Experience Center</span>
          </a>
          <WordReveal 
            as="h2"
            text="High-Resolution Project Gallery"
            className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight block"
          />
          <WordReveal
            as="p"
            text="Browse through our extensive directory of over 150 signature projects completed across Andhra Pradesh. Optimized for smooth lag-free navigation of premium materials."
            className="font-sans text-gray-400 text-sm leading-relaxed block"
            staggerDelay={0.01}
          />
        </ScrollReveal>

        {/* CONTROLS HUB - Filter & Search */}
        <div id="portfolio-filters" className="glass-panel rounded-2xl p-6 border-white/5 space-y-6 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
            {/* Search Bar field */}
            <div className="flex-1 max-w-md relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city (e.g. Visakhapatnam), material, design style..."
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-white/10 focus:border-gold-400 rounded-xl text-xs text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-1 focus:ring-gold-400"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick stats indicator */}
            <div className="flex items-center justify-between lg:justify-end gap-4 text-xs font-mono">
              <span className="text-gray-400">
                Displaying <strong className="text-gold-400 font-bold">{filteredProjects.length}</strong> of <strong className="text-white">{SIGNATURE_PORTFOLIO_PROJECTS.length}</strong> creations
              </span>
              {(selectedMainCat !== "all" || selectedSubCat !== "all" || searchTerm !== "") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-gold-400 hover:text-gold-300"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Main Category Selection Badges */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => handleMainCatChange("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedMainCat === "all"
                  ? "bg-gold-500 text-white shadow-md shadow-gold-500/10"
                  : "bg-white/5 hover:bg-white/10 text-gray-400"
              }`}
            >
              All Ranges
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleMainCatChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  selectedMainCat === cat.id
                    ? "bg-gold-500 text-white shadow-md shadow-gold-500/10"
                    : "bg-white/5 hover:bg-white/10 text-gray-400"
                }`}
              >
                <Layers className="w-3 h-3 text-gold-400" />
                {cat.name.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Subcategory specific pills when a main category is selected */}
          {selectedMainCat !== "all" && activeSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-dashed border-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono flex items-center mr-2">
                Sub-Systems:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubCat("all")}
                className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all ${
                  selectedSubCat === "all"
                    ? "bg-white/10 text-white border border-white/25"
                    : "bg-white/5 text-gray-400 border border-transparent"
                }`}
              >
                All {selectedMainCat} Systems
              </button>
              {activeSubcategories.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubCat(sub.id)}
                  className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all ${
                    selectedSubCat === sub.id
                      ? "bg-gold-500/20 text-gold-300 border border-gold-400/30"
                      : "bg-white/5 text-gray-400 border border-transparent"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PORTFOLIO GRID / EXPLORER - Optimized lazy rendering */}
        <AnimatePresence mode="wait">
          {searchTerm.trim() !== "" ? (
            /* IF THERE'S AN ACTIVE SEARCH QUERY: SHOW SEARCH RESULTS FLAT GRID */
            <motion.div
              key="search-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 font-mono text-xs text-gray-400">
                <span>SEARCH RESULTS FOR: "{searchTerm}"</span>
                <span>{filteredProjects.length} MATCHES</span>
              </div>
              
              {visibleProjects.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/35 rounded-2xl border border-white/5 animate-pulse">
                  <p className="text-gray-400 mb-2">No custom installations found matching this category or term.</p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-2 inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 text-xs font-semibold"
                  >
                    Clear selections and search term
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-sans">
                  {visibleProjects.map((proj) => {
                    return (
                      <div
                        key={proj.id}
                        onClick={() => setActiveProject(proj)}
                        className="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer border border-white/5 shadow-lg bg-slate-900 flex flex-col justify-end transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold-500/30"
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />
                        <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
                          <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <div className="relative z-20 p-5 space-y-1 mt-auto">
                          <div className="flex items-center gap-1 text-[10px] font-mono text-gold-400 uppercase tracking-widest font-semibold">
                            <MapPin className="w-3 h-3" />
                            <span>{proj.location.split(" ")[0]}</span>
                            <span className="text-gray-600">•</span>
                            <span>{proj.year}</span>
                          </div>
                          <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-gold-300 transition-colors line-clamp-1">
                            {proj.title.split("-")[1] ? proj.title.split("-")[1].trim() : proj.title}
                          </h3>
                          <span className="block text-[10px] text-gray-400 font-mono italic">
                            {proj.difficulty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Load More Pagination for search */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 border border-white/10 hover:border-gold-500/40 text-xs tracking-widest font-semibold uppercase text-gold-400 hover:text-white transition-all duration-300 hover:scale-103 shadow-lg"
                  >
                    <span>Load More Results</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400">
                      +{filteredProjects.length - visibleProjects.length}
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          ) : selectedMainCat === "all" ? (
            /* IF WE ARE ROOT: SHOW THE 5 BIG RANGE BOXES WITH ANIMATIONS */
            <motion.div
              key="root-ranges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {PRODUCT_CATEGORIES.map((cat, idx) => {
                const count = SIGNATURE_PORTFOLIO_PROJECTS.filter(p => p.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleMainCatChange(cat.id)}
                    className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer border border-white/5 hover:border-gold-500/35 bg-slate-900 shadow-xl flex flex-col justify-end p-8 font-sans transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01]"
                  >
                    <img
                      src={cat.coverImage}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-95" />
                    
                    {/* Top Header Badge */}
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 font-mono text-[9px] tracking-widest text-gold-400 uppercase">
                      <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" />
                      <span>{count} Signature Works</span>
                    </div>

                    {/* Subsystems Preview floating layout */}
                    <div className="absolute top-6 right-6 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950/60 border border-white/10 group-hover:bg-gold-500 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4 text-gold-400 group-hover:text-white transition-colors" />
                    </div>

                    <div className="relative z-20 space-y-3">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-gold-500 uppercase tracking-widest font-bold">
                          Range 0{idx + 1}
                        </span>
                        <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold-300 transition-colors">
                          {cat.name}
                        </h3>
                      </div>

                      <p className="font-sans text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                        {cat.description}
                      </p>

                      <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                        {cat.subcategories.slice(0, 3).map((sub) => (
                           <span key={sub.id} className="text-[9px] font-mono text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase">
                            {sub.name.split(" ").slice(0, 2).join(" ")}
                          </span>
                        ))}
                        {cat.subcategories.length > 3 && (
                          <span className="text-[9px] font-mono text-gold-500 bg-gold-450/10 px-2 py-0.5 rounded">
                            +{cat.subcategories.length - 3} More
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : selectedSubCat === "all" ? (
            /* IF WE ARE INSIDE A RANGE BUT SUBSYSTEM CONTEXT IS "all": SHOW CHOOSE SUBSYSTEMS AS INDIVIDUAL DETAILED EXPANDABLE CARDS */
            <motion.div
              key="subsystems-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-8 font-sans"
            >
              {/* Back navigation & Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <button
                  type="button"
                  onClick={() => handleMainCatChange("all")}
                  className="inline-flex items-center gap-2 text-xs font-mono text-gold-400 hover:text-white transition-colors uppercase group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back To All Ranges</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
                  <span className="font-mono text-xs text-gray-500 uppercase">
                    ACTIVE RANGE: {PRODUCT_CATEGORIES.find(c => c.id === selectedMainCat)?.name}
                  </span>
                </div>
              </div>

              <div className="max-w-3xl space-y-2">
                <h3 className="font-serif text-2.5xl font-bold text-white tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Choose Architectural Sub-System
                </h3>
                <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                  Explore custom engineering models within the {PRODUCT_CATEGORIES.find(c => c.id === selectedMainCat)?.name} catalog. Each subgrid lists dedicated high-contrast on-site installations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {activeSubcategories.map((sub, sIdx) => {
                  const subProjectsCount = SIGNATURE_PORTFOLIO_PROJECTS.filter(p => p.subcategory === sub.id).length;
                  const imgList = GAL_IMAGES[sub.id] || GAL_IMAGES["glass-railings"] || [];
                  const previewImage = imgList[0] || "https://images.unsplash.com/photo-1600585154526-990dced4db0d";
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubCat(sub.id)}
                      className="group relative rounded-2xl border border-white/5 hover:border-gold-500/35 bg-slate-900/60 p-6 md:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 overflow-hidden shadow-lg h-[240px]"
                    >
                      {/* background preview image */}
                      <div className="absolute top-0 right-0 bottom-0 w-[45%] h-full opacity-60 md:opacity-75 overflow-hidden select-none pointer-events-none rounded-l-2xl">
                        <img 
                          src={previewImage} 
                          alt={sub.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />
                      </div>

                      <div className="relative z-10 max-w-[65%] flex flex-col justify-between h-full">
                        <div className="space-y-2">
                          <span className="font-mono text-[9px] text-gold-500 uppercase tracking-widest block font-bold">
                            Sub-System 0{sIdx + 1}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors tracking-wide leading-tight">
                            {sub.name}
                          </h4>
                          <p className="font-sans text-[11px] text-gray-400 leading-normal font-light line-clamp-3">
                            {sub.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t border-white/5 font-mono text-[9px] tracking-wider text-gold-400 uppercase">
                          <span>{subProjectsCount} Dedicated Projects</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* IF WE ARE SELECTING A SUBSYSTEM: SHOW THE DETAILED SUBGRID OF THOSE SPECIFIC PROJECTS COMPILATION */
            <motion.div
              key="projects-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-8 font-sans"
            >
              {/* Back navigation & Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <button
                  type="button"
                  onClick={() => setSelectedSubCat("all")}
                  className="inline-flex items-center gap-2 text-xs font-mono text-gold-400 hover:text-white transition-colors uppercase group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back To Sub-Systems</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs text-gray-500 uppercase">
                    SYSTEM: {PRODUCT_CATEGORIES.find(c => c.id === selectedMainCat)?.subcategories.find(s => s.id === selectedSubCat)?.name}
                  </span>
                </div>
              </div>

              <div className="max-w-3xl space-y-2">
                <h3 className="font-serif text-2.5xl font-bold text-white tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Completed Custom Installations
                </h3>
                <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                  Showing our verified architectural works across South India. Expand any client card to inspect detailed material callouts and structural dimensions.
                </p>
              </div>

              {visibleProjects.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/35 rounded-2xl border border-white/5">
                  <p className="text-gray-400 mb-2">No projects found for this sub-system directory.</p>
                  <button
                    type="button"
                    onClick={() => setSelectedSubCat("all")}
                    className="mt-2 inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 text-xs font-semibold"
                  >
                    Return to sub-systems overview
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {visibleProjects.map((proj) => {
                    return (
                      <div
                        key={proj.id}
                        onClick={() => setActiveProject(proj)}
                        className="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer border border-white/5 shadow-lg bg-slate-900 flex flex-col justify-end transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold-500/30"
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />
                        
                        <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
                          <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                        </div>

                        <div className="relative z-20 p-5 space-y-1 mt-auto">
                          <div className="flex items-center gap-1 text-[10px] font-mono text-gold-400 uppercase tracking-widest font-semibold">
                            <MapPin className="w-3 h-3" />
                            <span>{proj.location.split(" ")[0]}</span>
                            <span className="text-gray-600">•</span>
                            <span>{proj.year}</span>
                          </div>

                          <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-gold-300 transition-colors line-clamp-1">
                            {proj.title.split("-")[1] ? proj.title.split("-")[1].trim() : proj.title}
                          </h3>
                          
                          <span className="block text-[10px] text-gray-400 font-mono italic">
                            {proj.difficulty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Load More Pagination */}
              {hasMore && (
                <div className="text-center mt-12 md:mt-16">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 border border-white/10 hover:border-gold-500/40 text-xs tracking-widest font-semibold uppercase text-gold-400 hover:text-white transition-all duration-300 hover:scale-103 shadow-lg"
                  >
                    <span>Load More Portfolio Creations</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400">
                      +{filteredProjects.length - visibleProjects.length}
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PORTFOLIO LIGHTBOX / MODAL DETAILS VIEW */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/97 backdrop-blur-sm p-4 overflow-y-auto">
          {/* Box Container */}
          <div className="relative w-full max-w-4xl bg-slate-900/90 rounded-2xl border border-white/10 shadow-3xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
            
            {/* Close modal absolute floating button */}
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-950/80 hover:bg-slate-950 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                
                {/* Left Photo slider display with smooth horizontal animation scroll */}
                <div className="relative flex flex-col justify-between min-h-[350px] md:min-h-[520px] bg-slate-950">
                  
                  {/* Carousel Main Container */}
                  <div className="relative flex-1 w-full overflow-hidden">
                    
                    {/* Active Single High-Definition Photo Display with Smooth Lazy Rendering */}
                    <div className="absolute inset-0 w-full h-full relative">
                      <img
                        key={activeImageIndex}
                        src={activeProjectPhotos[activeImageIndex]}
                        alt={`${activeProject.title} view ${activeImageIndex + 1}`}
                        className="w-full h-full object-cover select-none transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {/* Rich shadow ambient gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Navigation Arrows */}
                    {activeProjectPhotos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : activeProjectPhotos.length - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-white/15 text-white/75 hover:text-white transition-all hover:scale-105 active:scale-95"
                          title="Previous project photo"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex((prev) => (prev < activeProjectPhotos.length - 1 ? prev + 1 : 0))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-white/15 text-white/75 hover:text-white transition-all hover:scale-105 active:scale-95"
                          title="Next project photo"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Photo Progress Dot Indicators */}
                    <div className="absolute top-4 left-4 z-20 flex gap-1.5 p-1.5 rounded-lg bg-slate-950/60 border border-white/5 backdrop-blur-sm">
                      {activeProjectPhotos.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === activeImageIndex ? "bg-gold-400 w-4" : "bg-white/40 hover:bg-white/60"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Quality Assurance watermark */}
                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 border border-white/10 font-mono text-[9px] tracking-wider text-gold-400">
                      <Shield className="w-3.5 h-3.5 text-gold-400" />
                      <span>PHOTO SELECTION {activeImageIndex + 1} OF {activeProjectPhotos.length}</span>
                    </div>

                  </div>

                  {/* Horizontal Thumbnail Scroll Tray (Using ultra-low-resolution thumbnails for instantaneous render) */}
                  <div className="bg-slate-925 border-t border-white/5 p-3 flex gap-2 overflow-x-auto scrollbar-none scroll-smooth">
                    {activeProjectPhotos.map((photoUrl, idx) => {
                      const thumbnailPhotoUrl = photoUrl
                        .replace("w=1100", "w=150")
                        .replace("q=85", "q=50")
                        .replace("q=80", "q=50")
                        .replace("w=700", "w=150");
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border transition-all ${
                            idx === activeImageIndex 
                              ? "border-gold-400 ring-2 ring-gold-400/20 opacity-100 scale-103" 
                              : "border-white/10 opacity-50 hover:opacity-75"
                          }`}
                        >
                          <img 
                            src={thumbnailPhotoUrl} 
                            alt="Thumbnail View" 
                            className="w-full h-full object-cover" 
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      );
                    })}
                    {/* Infinite placeholder to allow clients upload later */}
                    <div className="w-16 h-12 rounded-lg border border-dashed border-white/10 flex flex-col items-center justify-center flex-shrink-0 opacity-40 hover:opacity-100 select-none bg-white/2 cursor-help" title="More photos will be uploaded shortly by project desk">
                      <span className="text-[7px] text-gray-500 font-mono text-center uppercase leading-none block">Add<br/>Photo</span>
                    </div>
                  </div>

                </div>

                {/* Right Specifications Details Panel */}
                <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gold-500 uppercase tracking-widest font-semibold">
                      <span>LOCATION: {activeProject.location}</span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-bold text-white tracking-wide leading-tight">
                      {activeProject.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-xs font-mono border-b border-white/5 pb-4">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Calendar className="w-4 h-4 text-gold-500" />
                        <span>Completed {activeProject.year}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Layers className="w-4 h-4 text-gold-500" />
                        <span>{activeProject.difficulty}</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                      {activeProject.description}
                    </p>

                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Material Profile &amp; Dimensions</span>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="py-2.5 px-3 rounded bg-slate-950 border border-white/5">
                          <span className="block text-gray-400 text-[9px] uppercase tracking-widest leading-none mb-1">PROFILES</span>
                          <span className="text-white font-medium truncate block">{activeProject.materials?.[0] || "Custom"}</span>
                        </div>
                        <div className="py-2.5 px-3 rounded bg-slate-950 border border-white/5">
                          <span className="block text-gray-400 text-[9px] uppercase tracking-widest leading-none mb-1">DIMENSION STATUS</span>
                          <span className="text-white font-medium truncate block">{activeProject.dimensions}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Project Highlights</span>
                      <ul className="text-xs text-gray-300 font-sans space-y-1">
                        {activeProject.highlights?.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Immediate Action - Book specific design */}
                  <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => triggerEnquiry(activeProject)}
                      className="group w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-center"
                    >
                      <span>Enquire About This Exact System</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <span className="block text-[10px] text-center text-gray-500 font-mono uppercase">
                      Reference ID: VISHVA-{activeProject.id.toUpperCase()}
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
