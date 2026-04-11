import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Laptop, 
  Monitor, 
  HardDrive, 
  Zap, 
  Fan, 
  Keyboard, 
  Speaker, 
  Camera, 
  Gamepad2, 
  Cable, 
  Network, 
  MousePointer2, 
  Printer, 
  Gamepad, 
  Headphones, 
  Mic, 
  Layout, 
  Box, 
  Disc, 
  ShieldCheck, 
  ChevronRight,
  MonitorPlay,
  Projector,
  Music,
  Cctv,
  Smartphone,
  Layers,
  MemoryStick,
  X,
  Filter
} from 'lucide-react';

interface SubCategory {
  name: string;
  slug: string;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  subcategories?: SubCategory[];
  standalone?: boolean;
  slug?: string;
}

const CATEGORIES: Category[] = [
  {
    title: 'PC BUILD',
    icon: <Layout size={18} />,
    subcategories: [
      { name: 'BRAND NEW PC BUILD', slug: 'brand-new-pc-build' },
      { name: 'COMBO KIT', slug: 'combo-kit' },
      { name: 'USED PC BUILD', slug: 'used-pc-build' }
    ]
  },
  {
    title: 'LAPTOP',
    icon: <Laptop size={18} />,
    subcategories: [
      { name: 'BRAND NEW LAPTOP', slug: 'brand-new-laptop' },
      { name: 'USED LAPTOP', slug: 'used-laptop' }
    ]
  },
  {
    title: 'PROCESSOR',
    icon: <Cpu size={18} />,
    subcategories: [
      { name: 'BRAND NEW PROCESSOR', slug: 'brand-new-processor' },
      { name: 'USED PROCESSOR', slug: 'used-processor' }
    ]
  },
  {
    title: 'MOTHERBOARD',
    icon: <Layers size={18} />,
    subcategories: [
      { name: 'BRAND NEW MOTHERBOARD', slug: 'brand-new-motherboard' },
      { name: 'USED MOTHERBOARD', slug: 'used-motherboard' }
    ]
  },
  {
    title: 'MEMORY (RAM)',
    icon: <MemoryStick size={18} />,
    subcategories: [
      { name: 'BRAND NEW MEMORY (RAM)', slug: 'brand-new-ram' },
      { name: 'USED MEMORY (RAM)', slug: 'used-ram' }
    ]
  },
  {
    title: 'GRAPHIC CARD (VGA)',
    icon: <Box size={18} />,
    subcategories: [
      { name: 'BRAND NEW GRAPHIC CARD (VGA)', slug: 'brand-new-vga' },
      { name: 'VGA CARD HOLDER', slug: 'vga-card-holder' },
      { name: 'USED GRAPHIC CARD (VGA)', slug: 'used-vga' }
    ]
  },
  {
    title: 'POWER SUPPLY',
    icon: <Zap size={18} />,
    subcategories: [
      { name: 'BRAND NEW POWER SUPPLY', slug: 'brand-new-psu' },
      { name: 'USED POWER SUPPLY', slug: 'used-psu' }
    ]
  },
  {
    title: 'UPS & BATTERIES',
    icon: <ShieldCheck size={18} />,
    subcategories: [
      { name: 'UPS', slug: 'ups' },
      { name: 'UPS BATTERIES', slug: 'ups-batteries' }
    ]
  },
  {
    title: 'STORAGE (HDD, SSD, NVME)',
    icon: <HardDrive size={18} />,
    subcategories: [
      { name: 'BRAND NEW STORAGE', slug: 'brand-new-storage' },
      { name: 'USED STORAGE', slug: 'used-storage' }
    ]
  },
  {
    title: 'COOLING (FAN, AIR, LIQUID)',
    icon: <Fan size={18} />,
    subcategories: [
      { name: 'BRAND NEW COOLER', slug: 'brand-new-cooler' },
      { name: 'USED COOLER', slug: 'used-cooler' }
    ]
  },
  {
    title: 'CASING',
    icon: <Layout size={18} />,
    standalone: true,
    slug: 'casings'
  },
  {
    title: 'MONITORS & ACCESSORIES',
    icon: <Monitor size={18} />,
    subcategories: [
      { name: 'BRAND NEW MONITORS', slug: 'brand-new-monitors' },
      { name: 'USED MONITORS', slug: 'used-monitors' },
      { name: 'MONITORS ACCESSORIES', slug: 'monitors-accessories' }
    ]
  },
  {
    title: 'PROJECTORS',
    icon: <Projector size={18} />,
    standalone: true,
    slug: 'projectors'
  },
  {
    title: 'KEYBOARD & MOUSE',
    icon: <Keyboard size={18} />,
    subcategories: [
      { name: 'KEYBOARD | MOUSE | COMBO | MOUSE PAD', slug: 'keyboard-mouse-combo' }
    ]
  },
  {
    title: 'SPEAKERS & HEADPHONES',
    icon: <Headphones size={18} />,
    subcategories: [
      { name: 'HEADPHONES | SPEAKERS', slug: 'headphones-speakers' }
    ]
  },
  {
    title: 'WEB CAM & MIC',
    icon: <Camera size={18} />,
    subcategories: [
      { name: 'MIC | WEB CAM', slug: 'mic-webcam' }
    ]
  },
  {
    title: 'GAMING CHAIRS & TABLES',
    icon: <Layout size={18} />,
    subcategories: [
      { name: 'CHAIRS | TABLES', slug: 'chairs-tables' }
    ]
  },
  {
    title: 'GAMING CONTROLLERS',
    icon: <Gamepad2 size={18} />,
    subcategories: [
      { name: 'GAMING CONTROLLERS | STEERING WHEEL', slug: 'gaming-controllers' }
    ]
  },
  {
    title: 'CABLES & CONVERTORS',
    icon: <Cable size={18} />,
    subcategories: [
      { name: 'CABLES | CONVERTORS', slug: 'cables-convertors' }
    ]
  },
  {
    title: 'NETWORKING',
    icon: <Network size={18} />,
    subcategories: [
      { name: 'BLUETOOTH ADAPTERS | WIFI ADAPTERS | ROUTERS | DONGLE | NETWORK SWITCHES', slug: 'networking' }
    ]
  },
  {
    title: 'LAPTOP ACCESSORIES',
    icon: <Smartphone size={18} />,
    subcategories: [
      { name: 'CHARGERS | BATTERIES | KEYBOARDS | DISPLAYS | COOLING FANS | COOLING PAD | STAND | CADDY | STICKER', slug: 'laptop-accessories' }
    ]
  },
  {
    title: 'EXTERNAL STORAGE',
    icon: <HardDrive size={18} />,
    subcategories: [
      { name: 'PORTABLE HDD | PORTABLE SSD | PEN DRIVES | MEMORY CARD (SD) | ENCLOSURE', slug: 'external-storage' }
    ]
  },
  {
    title: 'PRINTERS & SCANNERS',
    icon: <Printer size={18} />,
    subcategories: [
      { name: 'PRINTERS | SCANNER | CARTRIDGE | TONER | INK BOTTLE | RIBBON', slug: 'printers-scanners' }
    ]
  },
  {
    title: 'SOFTWARE & GAMES',
    icon: <Disc size={18} />,
    subcategories: [
      { name: 'GAMES | SOFTWARES', slug: 'software-games' }
    ]
  },
  {
    title: 'AUDIO & SUBWOOFERS',
    icon: <Music size={18} />,
    subcategories: [
      { name: 'PARTY BOX | SUBWOOFERS | AUDIO INTERFACE', slug: 'audio-subwoofers' }
    ]
  },
  {
    title: 'CCTV',
    icon: <Cctv size={18} />,
    subcategories: [
      { name: 'CAMERA | CABLES | CONNECTORS | DVR | NVR | POWER ADAPTER | RACK | WIRELESS CAMERA', slug: 'cctv' }
    ]
  }
];

interface CategorySidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function CategorySidebar({ isMobile, onClose }: CategorySidebarProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const location = useLocation();

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const isActive = (slug: string) => {
    return location.pathname.includes(`/category/${slug}`);
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`${
      isMobile 
        ? 'w-full h-full bg-[#0a0a0a] flex flex-col sidebar active category-sidebar' 
        : 'w-72 h-[calc(100vh-96px)] md:h-[calc(100vh-128px)] bg-[#0a0a0a] border-r border-white/5 flex flex-col sticky top-24 md:top-32 z-40'
    }`}>
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black text-neutral-500 uppercase tracking-[0.4em]">Hardware Foundry</h2>
          <p className="text-lg font-black text-white tracking-tighter uppercase mt-1">Categories</p>
        </div>
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-[#00ccff] transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar py-4">
        <nav className="px-3 space-y-1">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="group">
              {cat.standalone ? (
                <Link
                  to={`/category/${cat.slug}`}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(cat.slug!) 
                      ? 'bg-[#00ccff]/10 text-[#00ccff] border border-[#00ccff]/20' 
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <span className={`${isActive(cat.slug!) ? 'text-[#00ccff]' : 'text-neutral-500 group-hover:text-[#00ccff]'} transition-colors`}>
                    {cat.icon}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider flex-grow">{cat.title}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleCategory(cat.title)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      openCategory === cat.title 
                        ? 'bg-white/5 text-white' 
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className={`${openCategory === cat.title ? 'text-[#00ccff]' : 'text-neutral-500 group-hover:text-[#00ccff]'} transition-colors`}>
                      {cat.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider text-left flex-grow">{cat.title}</span>
                    <motion.span
                      animate={{ rotate: openCategory === cat.title ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={14} className="text-neutral-600" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openCategory === cat.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 ml-4 pl-4 border-l border-white/5 space-y-1">
                          {cat.subcategories?.map((sub) => (
                            <Link
                              key={sub.slug}
                              to={`/category/${sub.slug}`}
                              onClick={handleLinkClick}
                              className={`block px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${
                                isActive(sub.slug)
                                  ? 'text-[#00ccff] bg-[#00ccff]/5'
                                  : 'text-neutral-500 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 bg-black/40">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00ccff]/5 border border-[#00ccff]/10">
          <div className="w-2 h-2 rounded-full bg-[#00ccff] animate-pulse"></div>
          <span className="text-[9px] font-black text-[#00ccff] uppercase tracking-[0.2em]">Live Inventory</span>
        </div>
      </div>
    </aside>
  );
}
