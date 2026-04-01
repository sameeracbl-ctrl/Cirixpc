import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto font-headline tracking-tight">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            {/* Cyber Artistic 'C' Logo */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]">
              <path 
                d="M80 20 C60 5 30 5 15 30 C0 55 5 85 35 95 C55 100 80 90 90 70" 
                fill="none" 
                stroke="url(#neonGradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                className="animate-pulse"
              />
              <path d="M30 40 L50 40 M30 60 L60 60" stroke="#00f2ff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <defs>
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2ff" />
                  <stop offset="100%" stopColor="#0066ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter text-primary neon-glow-cyan uppercase">
            CITRIX COMPUTER
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {['HOME', 'HARDWARE', 'REPAIRS', 'WORKSTATIONS', 'DEALS'].map((item) => (
            <Link 
              key={item}
              to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`} 
              className="text-[10px] font-bold tracking-[0.2em] text-primary/70 hover:text-primary hover:neon-glow-cyan transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="text-primary/70 hover:text-primary transition-all hover:neon-glow-cyan">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="text-primary/70 hover:text-primary transition-all hover:neon-glow-cyan">
            <span className="material-symbols-outlined">person</span>
          </button>
          <button className="text-primary/70 hover:text-primary transition-all hover:neon-glow-cyan relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(0,102,255,0.5)]">0</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
