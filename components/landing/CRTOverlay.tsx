export default function CRTOverlay() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=VT323&display=swap');
        h1, h2, h3, .retro-header { font-family: 'VT323', monospace; }
        body, p, button, input, textarea { font-family: 'Space Mono', monospace; }
        
        @keyframes flicker {
          0% { opacity: 0.18; }
          5% { opacity: 0.22; }
          100% { opacity: 0.19; }
        }

        @keyframes retro-hop {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-4px, -8px); }
        }

        .gameboy-card-hover:hover {
          animation: retro-hop 0.1s steps(2) forwards;
        }

        .crt-line {
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 4px, 3px 100%;
          animation: flicker 0.15s infinite;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 crt-line" />
    </>
  );
}